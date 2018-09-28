import { ElementRef } from '@angular/core'
import { MeshPhongMaterial, Scene, EffectComposer, Raycaster, PerspectiveCamera, ImageLoader, DirectionalLight, MeshFaceMaterial, Colors, WebGLRenderer, Mesh, LineBasicMaterial, Vector2, LoadingManager, DoubleSide, ImageUtils, Ray, MeshBasicMaterial, BoxGeometry, EdgesHelper, AmbientLight, SpotLight, Group, Vector3 } from 'three';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { ObjectCreationService } from "./objcreate.service"
import { ObjectRendererHelper } from "./helper.objrenderer.service";
import { EquipmentModel, ZoneEquipment, ZoneWall, EquipmentInfoMap } from "../models/equipment-model"
import { InstrumentItem } from "../models/instrument-item";
import { Zone } from "../models/zone";
import { ServicesConstants } from "./constants.service";
import { HttpClient } from '@angular/common/http';
import { DataService } from "../services/data.service";
import { ZoneDataService } from "../services/zone.data.service";
import { InstrumentDataService } from "../services/instrument.data.service";
import { AlertDataService } from './../services/alert.data.service';

declare var require: any;
var THREE = require('three');
(window as any).THREE = THREE;
require('three/examples/js/postprocessing/EffectComposer');
require('three/examples/js/postprocessing/ShaderPass');
require('three/examples/js/postprocessing/OutlinePass');
require('three/examples/js/postprocessing/RenderPass');
require('three/examples/js/shaders/CopyShader');
require('three/examples/js/shaders/FXAAShader');
require('three/examples/js/controls/OrbitControls');
// require('three/examples/js/controls/DragControls');
require('../../assets/js/DragControls');

export class RenderZoneDesigner {
    private id: number;
    private scene: Scene;
    private oCamera: PerspectiveCamera;
    private pCamera: PerspectiveCamera;
    private light: DirectionalLight;
    private ocRenderer: WebGLRenderer;
    private pcRenderer: WebGLRenderer;
    private floor: Mesh;
    private onMouseDownPosition: Vector2;
    private ray: Ray;
    private manager: LoadingManager;
    private mouseX = 0;
    private mouseY = 0;
    private windowHalfX = window.innerWidth/4;
    private windowHalfY = window.innerHeight / 2;
    private isMouseDown: boolean = false;
    private authorized = false;
    private tvContainer: ElementRef;
    private threeDVContaioner: ElementRef;
    private raycaster: Raycaster;
    private annimation:any;
    private clock:any;
    private flagTexture:any;
    private composer: EffectComposer;
    private outlinePass:any;
    private effectFXAA:any;
    private selectedObjects = [];
    private count:number;
    private uniforms:any;
    private frameCounter = 0;
    private visibleEdgeColorHover = new THREE.Color(0x0c960c);
    private hiddenEdgeColorHover = new THREE.Color(0x0c960c);
    private visibleEdgeColorClick = new THREE.Color(0xff0000);
    private hiddenEdgeColorClick = new THREE.Color(0xff0000); 
    private textdiv:HTMLDivElement;
    private zone:any;
    private errorFlag:any;
    private oneFlagPole: any;
    private allFlags: Array<object>;
    private flag: Mesh;
    private flagIcon: Mesh;
    private pcControl: any;
    private ocControl: any;
    private ambient: AmbientLight;
    private spotLight: SpotLight;
    private plane: Mesh;
    private selection: Mesh;
    private offset = new THREE.Vector3();
    // private wallResizerSphere_right: Mesh;
    // private wallResizerSphere_left: Mesh;
    private isLeftResizerSelected: boolean = false;
    private isRightResizerSelected: boolean = false;
    private grpRotator : Group;
    private dragControls: any;
    private prevClientX: number = 0;
    private prevClientY: number = 0;
    private isRotateClockwise: boolean =  false;
    private previousMousePosition = {
        x: 0,
        y: 0
    };
    private isRotatorHighlighted: boolean =false;
    private isDrawWalls: boolean = false;
    private isWallDrawn: boolean = false;
    private isWallDrawing: boolean = false;
    private wallMesh: Mesh;
    private isWallSelected: boolean = false;
    private http: HttpClient;
    private wallInitialPoint: Vector3;
    private prevWallLength: number = 0;
    private equipments: Array<InstrumentItem>;
    private equipmentModels: Array<EquipmentModel>;
    private unResolvedAlerts: Array<any>;
    private flagColorTexture: any;
    // For loading items from JSON.
    private mapCreatedObj: Map<string, any>;

    // For Object completed creation.
    private mapCreationInProgress: Map<string, Array<ZoneEquipment>>;

    // Collection of mehses rendered.
    private lstObjects: Array<Mesh>;

    private dataService: DataService;
    private zoneDataService: ZoneDataService;
    private instrumentDataService: InstrumentDataService;
    private alertDataService: AlertDataService

    /**
     * Constructor.
     */
    constructor(zoneDataService: ZoneDataService, instrumentDataService: InstrumentDataService, alertDataService: AlertDataService) {
        this.zoneDataService = zoneDataService;
        this.instrumentDataService = instrumentDataService;
        this.alertDataService = alertDataService;
        this.clock = new THREE.Clock();
        this.instrumentDataService.getInstrumentsAllData().then((data) => {
            this.equipments = data;
        });

        this.instrumentDataService.getEquipmentModelsData().then((data) => {
            this.equipmentModels = data;
        });

        this.alertDataService.getUnresolvedAlerts().then(unResolvedAlerts => {
            this.unResolvedAlerts = unResolvedAlerts;
        });
    }

    /**
     * ~destructor.
     */
    public destroy(): void {
        if(this.tvContainer && this.tvContainer.nativeElement) {
            this.tvContainer.nativeElement.removeEventListener('DOMMouseScroll', this.onDocumentMouseWheel, false);
            this.tvContainer.nativeElement.removeEventListener('mousewheel', this.onDocumentMouseWheel, false);
            this.tvContainer.nativeElement.removeEventListener('mousedown', this.mouseDown, false);
            this.tvContainer.nativeElement.removeEventListener('mouseup', this.mouseUp, false);
            this.tvContainer.nativeElement.removeEventListener('mousemove', this.onDocumentMouseMove, false);
            this.tvContainer.nativeElement.removeEventListener('contextmenu', this.onContextMenu, false);
            while (this.tvContainer.nativeElement.lastChild) {
                this.tvContainer.nativeElement.removeChild(this.tvContainer.nativeElement.lastChild);
            }
            if(this.lstObjects) {
                this.lstObjects.forEach((mesh) => {
                    this.removeMeshFromScene(mesh, this.scene);
                });
                this.lstObjects.splice(0, this.lstObjects.length);
            }
        }

        if(this.threeDVContaioner && this.threeDVContaioner.nativeElement) {
            while (this.threeDVContaioner.nativeElement.lastChild) {
                this.threeDVContaioner.nativeElement.removeChild(this.threeDVContaioner.nativeElement.lastChild);
            }
        }
        
        if( this.selectedObjects && this.selectedObjects.length > 0) {
            this.selectedObjects.forEach((mesh) => {
                this.removeMeshFromScene(mesh, this.scene);
            })
        }
        window.removeEventListener('resize', this.onWindowResize, false);
        
        if(this.pcControl) {
            this.pcControl.removeEventListener( 'change',this.pcRenderer,false);
        }

        if(this.ocControl) {
            this.ocControl.removeEventListener( 'change',this.ocRenderer,false);
        }

        if(this.scene) {
            this.scene.remove(this.ambient);
            this.scene.remove(this.spotLight);
        }
        this.scene = null;
        this.oCamera = null;
        this.pCamera = null;
        this.light = null;
        this.ray = null; 
        this.raycaster = null;
        this.floor = null;
        this.flag = null;
        this.allFlags = null;
        this.composer = null;
        this.flagTexture = null;
        this.oneFlagPole = null;
        this.flagIcon = null;
        this.frameCounter = null;
        if(this.ocRenderer) {
            this.ocRenderer.dispose();
            this.ocRenderer.forceContextLoss();
            this.ocRenderer.context = undefined;
            this.ocRenderer.domElement = undefined;
            this.ocRenderer = null;
        }
        if(this.pcRenderer) {
            this.pcRenderer.dispose();
            this.pcRenderer.forceContextLoss();
            this.pcRenderer.context = undefined;
            this.pcRenderer.domElement = undefined;
            this.pcRenderer = null;
        }
    }

    /**
     * Remove mesh object from scene and destroy it.
     * @param mesh object to be remove
     * @param scene from remove mesh.
     */
    private removeMeshFromScene(mesh: Mesh, scene: Scene): void {
        if(scene) {
            this.scene.remove(mesh);
            this.destroyMesh(mesh);
        }
        mesh = null;
    }

    /**
     * Destroy provided mesh object.
     * @param mesh object to destroy.
     */
    private destroyMesh(mesh: Mesh): void {
        if ( mesh && mesh.geometry ) {
            mesh.geometry.dispose();
        }
         if ( mesh && mesh.material ) {
            if (mesh.material.map) { 
                 mesh.material.map.dispose();
            }
            mesh.material.dispose();
        }
    }

    private removeRotateHandle(){
        if(this.grpRotator && this.selection){
            this.selection.remove(this.grpRotator);
            this.destroyMesh(this.grpRotator);
        }
    }

    private removeWallHighlighter(mesh: Mesh){
        if(mesh != undefined){
        this.wallMesh.children.forEach(element => {
            mesh.remove(element);
        });

        this.wallMesh.children.forEach(element => {
            mesh.remove(element);
        });

        let component: RenderZoneDesigner = this;
        mesh.traverse( function ( child ) {

            if ( child.geometry !== undefined && child.name != 'wall') {

                child.geometry.dispose();
                child.material.dispose();
                component.wallMesh.remove(child);
                component.scene.remove(child);

            }
        } );
        }
    }

    public render = () => {
        if(this.composer) {
            //this.uniforms.amplitude.value = 5*Math.sin(this.frameCounter); 
            this.composer.render();
            // this.count += 0.1;
            // this.frameCounter += 0.1;
            // this.updateOrbitControlRotation();
        }
    }

    public updateOrbitControlRotation = () =>{
        var centerPosition = this.pcControl.target.clone();
        centerPosition.y = 0;
        var groundPosition = this.oCamera.position.clone();
        groundPosition.y = 0;
        var d = (centerPosition.distanceTo(groundPosition));

        var origin = new THREE.Vector2(this.pcControl.target.y,0);
        var remote = new THREE.Vector2(0,d); // replace 0 with raycasted ground altitude
        var angleRadians = Math.atan2(remote.y - origin.y, remote.x - origin.x);
        this.pcControl.maxPolarAngle = angleRadians;
    }

    public animate = () => {
        this.resizeCanvasToDisplaySize(true);
        this.id = requestAnimationFrame(this.animate);
        this.pcControl.update();
        this.render();
        if(this.ocRenderer){

            this.ocRenderer.render(this.scene,this.oCamera);
        }
        if(this.pcRenderer){
            this.pcRenderer.render(this.scene,this.pCamera);
        }
    }
    
    private resizeCanvasToDisplaySize(force: boolean): void {
        let canvas = this.ocRenderer.domElement.parentElement;
        let renderSize = this.ocRenderer.getSize(); 
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // adjust displayBuffer size to match
        if (force || renderSize.width !== width || renderSize.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.ocRenderer.setSize(width, height, false);
            this.ocRenderer.domElement.style.width = width + "px";
            this.ocRenderer.domElement.style.height = height + "px";
            this.oCamera.aspect = width / height;
            this.oCamera.updateProjectionMatrix();

            // update any render target sizes here
        }
    }

    private renderBar(selectedObject: Mesh){
        var barMaterial = new THREE.MeshPhongMaterial({ color: 0x4f4848 , side: DoubleSide});
        var barGeometry = new THREE.BoxGeometry (2, 70, 2);
        var sphereGeometry = new THREE.SphereGeometry(4,10,10);
        var sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00});
        var bar = new Mesh(barGeometry, barMaterial);
        var sphere = new Mesh(sphereGeometry, sphereMaterial);

        sphere.position.z = sphere.position.z + 35;

        bar.rotation.x = Math.PI/2;

        this.grpRotator = new THREE.Group();
        this.grpRotator.add( bar );
        this.grpRotator.add( sphere );
        this.grpRotator.name = "rotator";
        
        this.grpRotator.position.y = 100;
        this.grpRotator.position.z = this.grpRotator.position.z + 35;
        selectedObject.add(this.grpRotator);
    }

     private renderWallHighlighter(selectedObject: Mesh){
        let sphereGeometry_right = new THREE.SphereGeometry(4,10,10);
        let sphereMaterial_right = new THREE.MeshPhongMaterial({ color: 0xffff00});
        let wallResizerSphere_right = new Mesh(sphereGeometry_right, sphereMaterial_right);

        wallResizerSphere_right.position.y = wallResizerSphere_right.position.y + selectedObject.geometry.parameters.height/2;
        wallResizerSphere_right.position.x = wallResizerSphere_right.position.x;// + selectedObject.geometry.parameters.width/2;
        wallResizerSphere_right.position.z = wallResizerSphere_right.position.z + selectedObject.geometry.parameters.depth/2;
        wallResizerSphere_right.name = "resizer-right";

        let sphereGeometry_left = new THREE.SphereGeometry(4,10,10);
        let sphereMaterial_left = new THREE.MeshPhongMaterial({ color: 0xffff00});
        let wallResizerSphere_left = new Mesh(sphereGeometry_left, sphereMaterial_left);
        wallResizerSphere_left.position.y = wallResizerSphere_left.position.y + selectedObject.geometry.parameters.height/2;
        wallResizerSphere_left.position.x = wallResizerSphere_left.position.x + (selectedObject.geometry.parameters.width*selectedObject.scale.x);
        wallResizerSphere_left.position.z = wallResizerSphere_left.position.z + selectedObject.geometry.parameters.depth/2;
        wallResizerSphere_left.name = "resizer-left";

        // this.wallResizerSphere_left.position.y = this.wallResizerSphere_left.position.y + selectedObject.geometry.parameters.height/2;
        // this.wallResizerSphere_left.position.x = this.wallResizerSphere_left.position.x;// + selectedObject.geometry.parameters.width/2;
        // this.wallResizerSphere_left.position.z = this.wallResizerSphere_left.position.z + selectedObject.geometry.parameters.depth/2;
        // this.wallResizerSphere_left.name = "resizer-left";

        var resizerContainerLeft = new THREE.Group();
        var resizerContainerRight = new THREE.Group();
        resizerContainerLeft.add(wallResizerSphere_left);
        resizerContainerRight.add(wallResizerSphere_right);

        resizerContainerLeft.scale.x = 1/selectedObject.scale.x;
        if(this.scene.getObjectByName( "resizer-left") == undefined){
            selectedObject.add(resizerContainerLeft);
        }

        resizerContainerRight.scale.x = 1/selectedObject.scale.x;
        if(this.scene.getObjectByName( "resizer-right") == undefined){
            selectedObject.add(resizerContainerRight);
        }

        // var selectedObject2Dpos = ObjectRendererHelper.getScreenPosition(selectedObject, this.oCamera, this.ocRenderer);

        // var wallHighlighter_left = <HTMLDivElement>document.getElementsByName("left-circle")[0];
        // wallHighlighter_left.style.left = (selectedObject2Dpos.x) + "px";
        // wallHighlighter_left.style.top = (selectedObject2Dpos.y) + "px";
        // wallHighlighter_left.hidden = false;

        // var wallHighlighter_right = <HTMLDivElement>document.getElementsByName("right-circle")[0];
        // wallHighlighter_right.style.left = (selectedObject2Dpos.x) + "px";
        // wallHighlighter_right.style.top = (selectedObject2Dpos.y) + "px";
        // wallHighlighter_right.hidden = false;

    }

    private addSelectedObject = (object, event) => {
        this.selectedObjects = [];
        if (event == "Hover")
        {
            this.outlinePass.visibleEdgeColor = this.visibleEdgeColorHover;
            this.outlinePass.hiddenEdgeColor = this.hiddenEdgeColorHover;
        }
        else
        {
            this.outlinePass.visibleEdgeColor = this.visibleEdgeColorClick;
            this.outlinePass.hiddenEdgeColor = this.hiddenEdgeColorClick;
        }
        this.selectedObjects.push(object);
    }

    private empty = (elem) => {
        while (elem.lastChild) elem.removeChild(elem.lastChild);
    }

    
    private setOverlayText = (text, posX, posY) => {
        
        if (text.trim().length == 0)
        {
            this.textdiv.hidden = true;
        }
        else{
            this.textdiv.innerHTML = text;
            this.textdiv.style.left = (posX) + "px";
            this.textdiv.style.top = (posY) + "px";
            this.textdiv.hidden = false;
        }
    }

    public attachDragandDropControl(){
        this.dragControls = new THREE.DragControls( this.scene.children, this.oCamera, this.ocRenderer.domElement );
		this.dragControls.addEventListener( 'dragstart', this.onDragStart, false);
		this.dragControls.addEventListener( 'dragend', this.onDragEnd, false);
    }

    public init = (tvContainer: ElementRef, threedContainer: ElementRef, http: HttpClient) => {
        this.http = http;
        this.manager = new LoadingManager();
        this.tvContainer = tvContainer;
        this.threeDVContaioner =  threedContainer;
        this.textdiv = <HTMLDivElement>document.getElementsByClassName("label-text")[0];  
        this.textdiv.hidden = true;

        this.mapCreatedObj = new Map<string, any>();
        this.mapCreationInProgress = new Map<string, Array<ZoneEquipment>>();
        this.lstObjects = new Array<EquipmentModel>();

        this.scene = new Scene();

        // var frustumSize = 1000;
        // var aspect = (window.innerWidth - 180)*0.75 / (window.innerHeight - 180);

         this.pCamera = new PerspectiveCamera(45, 1, 0.1, 20000);
         this.pCamera.position.x = ServicesConstants.RADIUS * Math.sin(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);
         this.pCamera.position.y = ServicesConstants.RADIUS * Math.sin(ServicesConstants.PHI * Math.PI / 360);
         this.pCamera.position.z = ServicesConstants.RADIUS * Math.cos(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);

        // var cameraPerspectiveHelper = new THREE.CameraHelper( this.pCamera );
		// this.scene.add(cameraPerspectiveHelper);
        // this.pCamera.position.x = 0;
        // this.pCamera.position.y = 500;
        // this.pCamera.position.z = 0;
        // this.pCamera.lookAt(new THREE.Vector3(0,0,0));

        //this.oCamera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 2000 );
        this.oCamera = new THREE.OrthographicCamera(((window.innerWidth - ServicesConstants.OCRENDERER_WIDTH_CROP)*0.8) / - 1, ((window.innerWidth - ServicesConstants.OCRENDERER_WIDTH_CROP)*0.8), (window.innerHeight - ServicesConstants.OCRENDERER_HEIGHT_CROP), (window.innerHeight - ServicesConstants.OCRENDERER_HEIGHT_CROP) / - 1, 1, 2000 );
    	this.oCamera.position.y = 400;
        this.oCamera.lookAt(new THREE.Vector3(0,0,0));
        
        // this.oCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
        // this.oCamera.position.x = ServicesConstants.RADIUS * Math.sin(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);
        // this.oCamera.position.y = ServicesConstants.RADIUS * Math.sin(ServicesConstants.PHI * Math.PI / 360);
        // this.oCamera.position.z = ServicesConstants.RADIUS * Math.cos(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);
        // this.oCamera.lookAt(new THREE.Vector3(0,0,0));

        
        
        this.onMouseDownPosition = new Vector2();
        
        this.ray = new Ray(this.oCamera.position, null);

        this.light = new DirectionalLight(0x444444);
        this.light.position.set(this.oCamera.position.x, this.oCamera.position.y, this.oCamera.position.z);

        //for shadow starts
        this.light.castShadow = true;
        this.light.shadowCameraVisible = true;
        this.light.shadowCameraLeft = (-1)*ServicesConstants.SHADOW_CAMERA_LEFT;
        this.light.shadowCameraRight = ServicesConstants.SHADOW_CAMERA_RIGHT;
        this.light.shadowCameraTop = ServicesConstants.SHADOW_CAMERA_TOP;;
        this.light.shadowCameraBottom = (-1)*ServicesConstants.SHADOW_CAMERA_BOTTOM;;
        this.light.shadowCameraFar = ServicesConstants.SHADOW_CAMERA_FAR;
        this.light.shadowDarkness = ServicesConstants.SHADOW_DARKNESS;
        this.light.shadowBias = ServicesConstants.SHADOW_BIAS;
        this.light.shadowMapWidth = ServicesConstants.SHADOW_MAP_WIDTH;
        this.light.shadowMapHeight = ServicesConstants.SHADOW_MAP_HEIGHT;
        //for shadow ends

        this.scene.add(this.light);
        //var helper = new THREE.CameraHelper( this.light.shadow.camera );
        //this.scene.add( helper );
        
        // Ambient Light.
        this.ambient = new AmbientLight(0x666666);
        this.scene.add(this.ambient);


        let component: RenderZoneDesigner = this;

        this.ocRenderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.ocRenderer.setPixelRatio(window.devicePixelRatio);
        // //this.ocRenderer.setSize((window.innerWidth - ServicesConstants.OCRENDERER_WIDTH_CROP)*(0.8), window.innerHeight - ServicesConstants.OCRENDERER_HEIGHT_CROP);
        // this.ocRenderer.setSize(window.innerWidth * 0.5, window.innerHeight * (0.7) - 90);
        this.ocRenderer.setSize(tvContainer.nativeElement.clientWidth, tvContainer.nativeElement.clientHeight);
        this.ocRenderer.domElement.style.position = "relative";
        this.ocRenderer.setClearColor(0x2d2d2d);
        tvContainer.nativeElement.appendChild(this.ocRenderer.domElement);

        this.pcRenderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.pcRenderer.setPixelRatio(window.devicePixelRatio);
        //this.pcRenderer.setSize((window.innerWidth - ServicesConstants.PCRENDERER_WIDTH_CROP)*(0.2), (window.innerHeight - ServicesConstants.PCRENDERER_HEIGHT_CROP)*0.5);
        this.pcRenderer.setSize((window.innerWidth - ServicesConstants.PCRENDERER_WIDTH_CROP)*(0.15), window.innerHeight*0.15);
        this.pcRenderer.domElement.style.position = "relative";
        this.pcRenderer.setClearColor(0x3c3c3c); 
        threedContainer.nativeElement.appendChild(this.pcRenderer.domElement);

        // this.EventsControls = new THREE.EventsControls( this.oCamera, this.ocRenderer.domElement);

        // this.EventsControls.attachEvent( 'dragAndDrop', this.onDragAndDrop);

        this.pcControl = new THREE.OrbitControls( this.pCamera, this.pcRenderer.domElement);
        this.pcControl.enableZoom = true;
        this.pcControl.enablePan = false;
        this.pcControl.maxPolarAngle = Math.PI/2;
        this.pcControl.minDistance = 0;
        this.pcControl.maxDistance = 4000;
        this.pcControl.enableRotate = true;
        this.pcControl.enableZoom = true;
        //this.pcControl.dIn(1.5);

        this.ocControl = new THREE.OrbitControls( this.oCamera, this.ocRenderer.domElement);
        this.ocControl.enableZoom = true;
        this.ocControl.enablePan = false;
        this.ocControl.maxPolarAngle = Math.PI/2;
        this.ocControl.minDistance = 1;
        this.ocControl.maxDistance = 10000;
        this.ocControl.enableRotate = false;
        this.ocControl.enableZoom = true;

        //this.pcControl.target = new THREE.Vector3(0, 0, 0);

        //Outline effect
        this.addOutlineEffect();

        // container.nativeElement.addEventListener('DOMMouseScroll', this.onDocumentMouseWheel, false);
        // container.nativeElement.addEventListener('mousewheel', this.onDocumentMouseWheel, false);
        tvContainer.nativeElement.addEventListener('mousedown', this.mouseDown, false);
        tvContainer.nativeElement.addEventListener('mouseup', this.mouseUp, false);
        tvContainer.nativeElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
        tvContainer.nativeElement.addEventListener('contextmenu', this.onContextMenu, false);
        window.addEventListener('resize', this.onWindowResize, false);
        this.pcControl.addEventListener( 'change',this.render,false);

        this.raycaster = new Raycaster();
    }

    /**
     * Render UI from JSON file data from Server.
     * @param jsonLoader instance of JSONLoaderService to load JSON file.
     */
    public renderUIFromJson(zoneName: String): any {
        let promise = new Promise((resolve) => {
            this.zoneDataService.loadJsonWithPromise(ServicesConstants.EQUIP_BASE_FILE_LOCATION
                + ServicesConstants.EQUIPMENT_INFO_FILE_NAME).then((data) => {
                    var jsonEqpInfo = ObjectRendererHelper.convertToJson(data);
                    this.zoneDataService.getZones().then((data) => {
                        this.zone = data.find(zone => zone.Name == zoneName);
                        var jsonZoneData = this.getEquipmentData(this.zone);
                        var floorMesh = ObjectRendererHelper.createFloor(this.zone, THREE);
                        this.scene.add(floorMesh);
                        // this.camera.position.x = ServicesConstants.RADIUS * Math.sin((this.zone.Rotation) * Math.PI / 360) * Math.cos(this.zone.Pitch * Math.PI / 360);
                        // this.camera.position.y = ServicesConstants.RADIUS * Math.sin(this.zone.Pitch * Math.PI / 360);
                        // this.camera.position.z = ServicesConstants.RADIUS * Math.cos((this.zone.Rotation) * Math.PI / 360) * Math.cos(this.zone.Pitch * Math.PI / 360);
                        this.renderLabWalls(this.zone.Walls);
                        this.processUIRendering(jsonEqpInfo, jsonZoneData).then(() => {
                            resolve();
                        });

                    });
                });
        });
        return promise;
    }

    /**
     * Getter for the equipment data from JSON provided
     * @param jsonData JSON data
     * @return Array of EqupmentModel JSON.
     */
    private getEquipmentData(jsonData: Zone): Array<ZoneEquipment> {
        var eqData = jsonData.Equipment;
        return eqData;
    }

    /**
     * Getter for the equipment Model name from equipment Id
     * @param eqId equipment Id
     * @return equipment Model name.
     */
    private getEquipmentModelName(eqId: number): string {
        if (this.equipments != undefined) {
            let eqModelId = this.equipments.find(eq => eq.Id == eqId).EquipmentModelId;

            if (eqModelId != undefined) {
                return this.equipmentModels.find(eqModel => eqModel.Id == eqModelId).Name;
            }
            return "";
        }
        return "";

    }

    /**
     * Renders all the walls of lab
     * @param wallData wall data
     */
    private renderLabWalls(wallData: Array<ZoneWall>){
        let objService: ObjectCreationService = new ObjectCreationService();
        let wall: ZoneWall;
        wallData.forEach((wlModel) => {
            wall = wlModel; 
            var wallMesh = ObjectRendererHelper.createWalls(wall,THREE);
            this.lstObjects.push(wallMesh);
            this.scene.add(wallMesh);
        });
    }

    /**
     * adds wall in the lab
     * @param clientX x coordinate of mouse click
     * @param clientY y coordinate of mouse click
     */
    private addWall(clientX, clientY){
        if(this.isDrawWalls){
            
            let mouseIntersect: Vector3 = ObjectRendererHelper.get3DPosition(clientX, clientY, this.tvContainer, this.oCamera, this.scene, this.ocRenderer);

            if(mouseIntersect != undefined){
                this.wallInitialPoint = mouseIntersect;
                let intersectedPoint = new THREE.Vector3()
                let rect = this.ocRenderer.domElement.getBoundingClientRect();
                this.onMouseDownPosition.x = ( (clientX - rect.left) / rect.width ) * 2 - 1;
                this.onMouseDownPosition.y = - ( (clientY - rect.top) / rect.height ) * 2 + 1;
                this.raycaster = new Raycaster();
                this.raycaster.setFromCamera(this.onMouseDownPosition, this.oCamera);
                var intersectObj = this.raycaster.intersectObjects( this.scene.children,true );

                if ( intersectObj.length > 0) {
                    intersectedPoint = intersectObj[0].point;
                }

                let wallMaterial = new THREE.MeshPhongMaterial({ color: 0x4f4848 , side: DoubleSide});
                let wallGeometry = new THREE.BoxGeometry (1, ServicesConstants.WALL_HEIGHT, ServicesConstants.WALL_DEPTH);
                wallGeometry.applyMatrix(new THREE.Matrix4().makeTranslation( 0.5, 0, 0 ));
                this.wallMesh = new Mesh(wallGeometry, wallMaterial);

                this.wallMesh.position.y = ServicesConstants.WALL_HEIGHT/2;
                this.wallMesh.position.x = intersectedPoint.x;
                this.wallMesh.position.z = intersectedPoint.z;
                this.wallMesh.name = "wall";
                this.wallMesh.rotation.y = Math.PI;
                this.scene.add(this.wallMesh);

                // this.isDrawWalls = false;
                this.isWallDrawing =  true;
                this.isWallDrawn = true;
                this.prevWallLength = 50;
            }
        }
    }

    /**
     * change length and angle of wall in the lab while it is drawn
     * @param previousClientX x coordinate of previous mouse click
     * @param previousClientY y coordinate of previous mouse click
     * @param clientX x coordinate of mouse click
     * @param clientY y coordinate of mouse click
     */
    private editWall(clientX, clientY){
            this.dragControls.deactivate();

            let mouseIntersect = ObjectRendererHelper.get3DPosition(clientX, clientY, this.tvContainer, this.oCamera, this.scene, this.ocRenderer);

            if(mouseIntersect != undefined){
                let deltaX = mouseIntersect.x - this.wallInitialPoint.x;
                let deltaZ = mouseIntersect.z - this.wallInitialPoint.z;
                let rad = Math.atan2(deltaZ, deltaX);
                let wallLength = Math.sqrt(deltaX*deltaX + deltaZ*deltaZ);
                this.wallMesh.scale.x = wallLength;
                this.wallMesh.rotation.y = -rad;
            }
    }

    /**
     * change length and angle of pre drawn wall in the lab
     * @param previousClientX x coordinate of previous mouse click
     * @param previousClientY y coordinate of previous mouse click
     * @param clientX x coordinate of mouse click
     * @param clientY y coordinate of mouse click
     */
    private editPreDrawnWall(clientX, clientY){
        this.dragControls.deactivate();

        let mouseIntersect = ObjectRendererHelper.get3DPosition(clientX, clientY, this.tvContainer, this.oCamera, this.scene, this.ocRenderer);

        if(mouseIntersect != undefined){
            let deltaX = mouseIntersect.x - this.wallInitialPoint.x;
            let deltaZ = mouseIntersect.z - this.wallInitialPoint.z;
            let rad = Math.atan2(deltaZ, deltaX);
            this.wallMesh.rotation.y = -rad;
            

            let wallLength = Math.sqrt(deltaX*deltaX + deltaZ*deltaZ);
            if(this.prevWallLength != 0){
                this.wallMesh.scale.x = wallLength;
                if(this.wallMesh.children.length != 0){
                    this.wallMesh.children[0].scale.x = 1 / wallLength;
                    this.wallMesh.children[1].scale.x = 1 / wallLength;
                }
            }
        }
    }
    
    /**
     * Start the UI render from the JSON Model.
     * @param eqMapFileData 
     * @param eqData 
     */
    private processUIRendering(eqMapFileData: JSON, eqData: Array<ZoneEquipment>): any {
        var promise = new Promise((resolve) => {
            let objService: ObjectCreationService = new ObjectCreationService();
            let eqRenderingCounter: number = 0
            if(eqData.length == 0){
                resolve();
            }else{
                eqData.forEach((eqModel) => {
                    eqRenderingCounter++;
                    var modelName = this.getEquipmentModelName(eqModel.EquipmentId);
                    // Check if object is already created.
                    if(this.mapCreatedObj.has(modelName)){
                        // If created then retreive it and proceed for rendering. 
                        var objectMesh = this.mapCreatedObj.get(modelName);
                        var eqInfo = <EquipmentInfoMap>eqMapFileData[modelName];
                        this.renderInstrument(eqInfo, eqModel, objectMesh);
                    } else {
                        // It is a new object. Then go for creation.
                        var lstObjData = this.mapCreationInProgress.get(modelName);
                        if( lstObjData === null || typeof lstObjData === 'undefined' ){
                            // For loading items from JSON.
                            lstObjData = new Array<ZoneEquipment>();
                        }

                        // Add model to list. Makes list length to 1
                        lstObjData.push(eqModel);

                        // Add list to map.
                        // TODO: Check if keep the reference of list in Map then move this section
                        //       in immediate above if condtion i.e. after creation of new list.
                        this.mapCreationInProgress.set(modelName, lstObjData);
                        // Check if new object for creation.
                        // NOTE: 1. Object creation is started while list length equal to 1
                        //       2. There is no need to do anything if list length is more than 1
                        //          As model is already added to list and can be taken care while calling
                        //          calling postObjectCreation().
                        //       
                        if(lstObjData.length === 1) { // If we added object in the list already
                                                        // Thus check in length is equal to 1 then it is new object
                                                        // and for new object creation.
                            // Start object creation.
                            var eqInfo = <EquipmentInfoMap>eqMapFileData[modelName];
                            var arrPath = eqInfo.MeshFile.split('/');
                            var baseFilePath = ServicesConstants.EQUIP_BASE_FILE_LOCATION  + arrPath[0];
                            objService.createObjectWithObjFile(baseFilePath, 
                                                            arrPath[1]
                                                            ).then((object) => {
                            
                                // Start post object creation process.
                                this.postObjectCreation(modelName, object, eqInfo);
                                //this.EventsControls.attach(object);
                                //////////////////////////////////////////////
                                    let component: RenderZoneDesigner = this;
                                    
                                    object.traverse( function( node ) {  
                                        //if ( node instanceof THREE.Mesh ) {
                                            //component.scene.add(node) 
                                            component.lstObjects.push(node);
                                        //}
                                    } );
                                
                                
                                /////////////////////////////////////////////
                                if(eqData.length == eqRenderingCounter && this.mapCreationInProgress.size == 0){
                                    this.tvContainer.nativeElement.style["display"] = "block";    
                                    resolve();
                                }
                            });
                        }
                    }

                });
            }
        });
        return promise;
    }

    /**
     * Post object creation process.
     * @param objName 
     * @param object 
     */
    private postObjectCreation(objName: string, object: any, eqInfo: EquipmentInfoMap): void {
        // Add newly created object to Map.
        this.mapCreatedObj.set(objName, object);
        // Trigger rendering of newly created object.
        this.triggerRenderingObject(objName, eqInfo);
    }

    /**
     * Start the rendering of the objects stored in the map with key
     * passed. Retreive the object from the Map. Retreive the model 
     * from the list stored during object creation.
     * Start applying the attributes to the object from the model.
     * @param objName 
     */
    private triggerRenderingObject(objName: string, eqInfo: EquipmentInfoMap): void {
        var objEquipmentMesh = this.mapCreatedObj.get(objName);
        if(objEquipmentMesh !== null && typeof objEquipmentMesh !== 'undefined') {
            var lstObjData = this.mapCreationInProgress.get(objName);
            if(lstObjData !== null && typeof lstObjData !== 'undefined' && lstObjData.length > 0) {
                lstObjData.forEach((modelData) => {
                    this.renderInstrument(eqInfo, modelData, objEquipmentMesh);
                });
                lstObjData.splice(0, lstObjData.length);; // TODO: Check of this required. If keeping reference then remove this.
                // Once in progress data is completed then do not require data in this map.
                // If object is availalble in mapCreatedObj then direct object is created 
                // from map and applied attribute directly from model data.
                // More details refer processUIRendering(). 
                this.mapCreationInProgress.delete(objName);
            }
        }
    }

    private renderInstrument(eqpInfo: EquipmentInfoMap, 
                             objEquipmentData: ZoneEquipment, 
                             objEquipmentMesh: any): void {
        // NOTE: Need to clone the object. As this the blue print of perticular type of Mesh.
        var clonedMesh = objEquipmentMesh.clone();
        clonedMesh.IsInstrument = eqpInfo.IsInstrument;
        objEquipmentData.EquipmentName = this.equipments.find(eq => eq.Id == objEquipmentData.EquipmentId).Name;
        var decMesh = ObjectRendererHelper.decorateEquipmentObject( THREE, objEquipmentData, clonedMesh );
        this.lstObjects.push(decMesh);
        this.scene.add(decMesh);
        // if(eqpInfo.IsInstrument){
        //     this.showFlag(objEquipmentData.Position, eqpInfo.FlagpoleOffset, 1);
        // }
    }

    /**
     * Add an outline effect to the instruments on Hoverover and clicks
     */
    public addOutlineEffect()
    {
        this.composer = new THREE.EffectComposer( this.ocRenderer );
        var renderPass = new THREE.RenderPass( this.scene, this.oCamera );
        this.composer.addPass( renderPass );
        this.outlinePass = new THREE.OutlinePass( new THREE.Vector2((window.innerWidth), window.innerHeight), this.scene, this.oCamera);
        this.outlinePass.visibleEdgeColor = new THREE.Color(0x0c960c);
        this.outlinePass.hiddenEdgeColor = new THREE.Color(0x0c960c);
        this.composer.addPass( this.outlinePass );
      
        this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this.effectFXAA.uniforms['resolution'].value.set(1 / ((window.innerWidth)*(window.devicePixelRatio)), 1 / ((window.innerHeight)*(window.devicePixelRatio)));
        this.effectFXAA.color = new THREE.Color(0x0c960c);
        this.effectFXAA.renderToScreen = true;
        this.composer.addPass( this.effectFXAA );
    }

    public renderRotateHandle(clientX, clientY){
        var rect = this.ocRenderer.domElement.getBoundingClientRect();
        // this.onMouseDownPosition.x = ( clientX  / window.innerWidth ) * 2 - 1;
        // this.onMouseDownPosition.y = - ( ( clientY - rect.top ) / ( this.tvContainer.nativeElement.clientHeight) ) * 2 + 1;
        this.onMouseDownPosition.x = ( (clientX - rect.left) / rect.width ) * 2 - 1;
		this.onMouseDownPosition.y = - ( (clientY - rect.top) / rect.height ) * 2 + 1;
        this.raycaster = new Raycaster();
        this.raycaster.setFromCamera(this.onMouseDownPosition, this.oCamera);
        var intersectObj = this.raycaster.intersectObjects( this.scene.children,true );

        if ( intersectObj.length > 0) {
            let mesh = new Mesh;
            let parentMesh = new Mesh;
            mesh = intersectObj[ 0 ].object;
            parentMesh = mesh.parent;
            // if(parentMesh.type === 'Scene') {
            // }else 
            if(parentMesh.type === 'Scene' && mesh.name != "floor" && mesh.name != "wall") {
                //this.renderBar(mesh);
                this.selection = mesh;
            }
            else if(mesh.name != "floor" && mesh.name != "wall" && mesh.name != "resizer-left" && mesh.name != "resizer-right" ) {
                this.renderBar(parentMesh);
                this.selection = parentMesh;
            }
        }
    }

    
    /**
     * Identify the hovered/clicked instrument and highlight it
     * @param clientX 
     * @param clientY 
     * @param event 
     */
    public highlightInstrument(clientX, clientY,event)
    {
        let rect = this.ocRenderer.domElement.getBoundingClientRect();
        this.onMouseDownPosition.x = ( (clientX - rect.left) / rect.width ) * 2 - 1;
		this.onMouseDownPosition.y = - ( (clientY - rect.top) / rect.height ) * 2 + 1;
        this.raycaster = new Raycaster();
        this.raycaster.setFromCamera(this.onMouseDownPosition, this.oCamera);
        let intersectObj = this.raycaster.intersectObjects( this.scene.children,true );
        let selectedObjPosition;

        if ( intersectObj.length > 0) {
            let mesh = new Mesh;
            let parentMesh = new Mesh;
            mesh = intersectObj[ 0 ].object;
            parentMesh = mesh.parent;
            if(mesh.name == "wall" && event == "Click") {
                this.isWallSelected = true;
                this.selection = mesh;
                this.removeWallHighlighter(this.wallMesh);
                if(!this.isWallDrawing){
                    this.renderWallHighlighter(mesh);
                }
                this.wallMesh = mesh;
            }else if (parentMesh.type != 'Scene' && parentMesh.IsInstrument) {
                selectedObjPosition = ObjectRendererHelper.getScreenPosition(parentMesh, this.oCamera, this.ocRenderer, this.tvContainer);
                this.setOverlayText(parentMesh.name,selectedObjPosition.x,selectedObjPosition.y);
                this.addSelectedObject(parentMesh,event);
                this.outlinePass.selectedObjects = this.selectedObjects;
                this.selection = parentMesh;
                //this.ocRenderer.domElement.style.cursor = "move";
            }else if(mesh.name == "resizer-left" && event == "Click"){
                selectedObjPosition = ObjectRendererHelper.getScreenPosition(mesh.parent.parent, this.oCamera, this.ocRenderer, this.tvContainer);
                this.isLeftResizerSelected = true;
                let resizerRight = this.scene.getObjectByName( "resizer-right" );
                this.wallInitialPoint = this.getWallInitialPoints(resizerRight);
                this.prevWallLength =  mesh.parent.parent.geometry.parameters.width * mesh.parent.parent.scale.x;
                //this.ocRenderer.domElement.style.cursor = 'grabbing';
            }else if(mesh.name == "resizer-right" && event == "Click"){
                selectedObjPosition = ObjectRendererHelper.getScreenPosition(mesh.parent.parent, this.oCamera, this.ocRenderer, this.tvContainer);
                this.isRightResizerSelected = true;
                let resizerLeft = this.scene.getObjectByName( "resizer-left" );
                this.wallInitialPoint = this.getWallInitialPoints(resizerLeft);
                this.prevWallLength =  mesh.parent.parent.geometry.parameters.width * mesh.parent.parent.scale.x;
                let translationFactor = this.wallMesh.geometry.width * this.wallMesh.scale.x;
                this.wallMesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0 ));
                this.wallMesh.rotation.y = this.wallMesh.rotation.y + Math.PI;

             }else if(event == "Click"){
                this.removeWallHighlighter(this.wallMesh);
            }
        }
    }
    
    /**
     * returns the x and y  of initial position of selected wall
     * @param selectedObj 
     */
    private getWallInitialPoints(targetObj: Mesh): Vector3{
        let wallInitialWorldPosition: any;

        targetObj.parent.parent.updateMatrixWorld();
        targetObj.parent.updateMatrixWorld();
        let vector = new THREE.Vector3();
        vector.getPositionFromMatrix( targetObj.matrixWorld );

        let object: any = {};
        object.position = vector;

        return vector;
    }

    /**
     * Identify the rotator and highlight it
     * @param clientX 
     * @param clientY 
     * @param event 
     */
    public highlightRotator(clientX, clientY,event)
    {
        let rect = this.ocRenderer.domElement.getBoundingClientRect();
        this.onMouseDownPosition.x = ( (clientX - rect.left) / rect.width ) * 2 - 1;
		this.onMouseDownPosition.y = - ( (clientY - rect.top) / rect.height ) * 2 + 1;
        this.raycaster = new Raycaster();
        this.raycaster.setFromCamera(this.onMouseDownPosition, this.oCamera);
        let intersectObj = this.raycaster.intersectObjects( this.scene.children,true );

        if ( intersectObj.length > 0) {
            let mesh = new Mesh;
            let parentMesh = new Mesh;
            mesh = intersectObj[ 0 ].object;
            parentMesh = mesh.parent;
            if(parentMesh.name === 'rotator') {
                this.ocRenderer.domElement.style.cursor = 'grab';//"../assets/rotate.png";
                this.dragControls.deactivate();
                this.isRotatorHighlighted = true;
            } else {
                this.ocRenderer.domElement.style.cursor = 'auto';
                this.isRotatorHighlighted = false;
            }
        }
    }

    /**
     * Handler for Mouse Down event.
     */
    mouseDown = (event) => {
        event.preventDefault();
        // this.container.nativeElement.style.cursor = 'pointer';
        this.isMouseDown = true;
        this.isWallDrawn = false;
        this.highlightInstrument(event.clientX, event.clientY,"Click");
        if(this.isDrawWalls || this.isRightResizerSelected || this.isLeftResizerSelected){
            this.dragControls.deactivate();
        }else{
            this.dragControls.activate();
        }
    }

    /**
     * Handler for Mouse Up event.
     */
    mouseUp = (event) => {
        event.preventDefault();
        this.isMouseDown = false;
        this.isWallSelected = false;
        //this.highlightInstrument(event.clientX, event.clientY,"Click");
        this.removeRotateHandle();
        //this.removeSphere(this.wallMesh);
        this.selection = null;
        this.prevClientX = 0;
        this.prevClientY = 0;
        this.renderRotateHandle(event.clientX, event.clientY);
        this.isWallDrawing = false;
        if(this.isRightResizerSelected || this.isLeftResizerSelected){
            this.renderWallHighlighter(this.wallMesh);
            this.isRightResizerSelected = false;
            this.isLeftResizerSelected = false;
        }
        this.hideContextMenu();
    }

    private hideContextMenu(): void{
        let contextMenu = <HTMLDivElement>document.getElementsByClassName("context-menu")[0];
        if(contextMenu != undefined){
            contextMenu.hidden = true;
        }
    }
    /**
     * Handler for Click event on Context Menus.
     */
    // public onContextMenu(event: MouseEvent): void {
    onContextMenu = (event) => {
         event.preventDefault();
         this.highlightInstrument(event.clientX, event.clientY,"Click");
         let selectedObjectPositions = ObjectRendererHelper.getScreenPosition(this.selection, this.oCamera, this.ocRenderer, this.tvContainer);
         let contextMenu = <HTMLDivElement>document.getElementsByClassName("context-menu")[0];
         let intrumentNameLabel = <HTMLDivElement>document.getElementsByClassName("instrument-name")[0];
         intrumentNameLabel.innerHTML = this.selection.name;
         contextMenu.style.left = (selectedObjectPositions.x) + "px";
         contextMenu.style.top = (selectedObjectPositions.y) + "px";
         contextMenu.hidden = false;
    }

    /**
     * Handler for Window resize event.
     */
    onWindowResize = () => {
        this.windowHalfX = window.innerWidth/4;
        this.windowHalfY = window.innerHeight / 2;
        this.oCamera.aspect = (window.innerWidth/2) / window.innerHeight;
        this.oCamera.updateProjectionMatrix();
        this.ocRenderer.setSize(window.innerWidth/2 - 16, window.innerHeight);
    }

    /**
     * Handler for Mouse Move event on DOM.
     */
    onDocumentMouseMove = (event) => {
        event.preventDefault();
        if (this.isMouseDown && this.isRotatorHighlighted) {
            var selectedObjectPositions = ObjectRendererHelper.getScreenPosition(this.selection, this.oCamera, this.ocRenderer, this.tvContainer);
            var deltaX = event.clientX - selectedObjectPositions.x;
            var deltaY = event.clientY - selectedObjectPositions.y;
            var rad = Math.atan2(deltaY, deltaX);
            this.selection.rotation.y = (-rad);
            this.ocRenderer.domElement.style.cursor = 'grabbing';
        }
        else if( this.isMouseDown && this.isDrawWalls && !this.isWallDrawn){
            this.addWall(event.clientX,event.clientY);
        }else if(this.isDrawWalls && this.isWallDrawing){
            this.editWall(event.clientX, event.clientY);
        }
        else if(this.isDrawWalls){
            this.ocRenderer.domElement.style.cursor = 'crosshair';
        }
        else if((this.isMouseDown && this.isLeftResizerSelected)|| (this.isMouseDown && this.isRightResizerSelected)){
            this.removeWallHighlighter(this.wallMesh);
            this.editPreDrawnWall(event.clientX, event.clientY);
        }
         else if(!this.isDrawWalls){
            this.highlightInstrument(event.clientX, event.clientY,"Hover");
            this.highlightRotator(event.clientX, event.clientY,"Hover");
        }

        this.prevClientX = event.clientX;
        this.prevClientY = event.clientY
    }

    private toRadians(angle) {
        return angle * (Math.PI/180);
    }

    /**
     * Handler for Mouse Wheel event.
     */
    onDocumentMouseWheel = (event) => {
        event.preventDefault();
    }

    onDragStart = (event) => {
    }

    onDragEnd = (event) => {
    } 

    public setDrawWalls(isdrawdalls){
        this.isDrawWalls = isdrawdalls;
    }

    public deleteInstrument(): string{
        this.scene.remove(this.selection);
        return this.selection.EquipmentId;
    }

    public addNewInstrument(instrument, zone){
        var zoneEquipment = new ZoneEquipment();
        zoneEquipment.EquipmentId = instrument.Id;
        zoneEquipment.EquipmentName = instrument.Name;
        zoneEquipment.PositionX  = 0.0;
        zoneEquipment.PositionY  = 0.0;
        zoneEquipment.PositionZ  = 0.0;
        zoneEquipment.RotationX  = 0.0;
        zoneEquipment.RotationY  = 0.0;
        zoneEquipment.RotationZ  = 0.0;
        zoneEquipment.ZoneId  = zone.Id;

        var promise = new Promise((resolve) => {
                this.zoneDataService.loadJsonWithPromise(ServicesConstants.EQUIP_BASE_FILE_LOCATION 
                + ServicesConstants.EQUIPMENT_INFO_FILE_NAME).then((data) => {
                var jsonEqpInfo = ObjectRendererHelper.convertToJson(data);
                
                var jsonZoneData: Array<ZoneEquipment> = [];
                jsonZoneData.push(zoneEquipment);
                this.processUIRendering(jsonEqpInfo, jsonZoneData).then(() => {
                    resolve();
                });
                    
                });
            });   
    }

    // public saveZoneConfiguration(){
    //     let wall: ZoneWall;
    //     let equipment : EquipmentModel;
    //     let walls: Array<ZoneWall> = new Array<ZoneWall>();
    //     let zoneEquipment: Array<EquipmentModel> = new Array<EquipmentModel>();
    //     let lab: Zone = {
    //         Name: "Immunology",
    //         Length: 30.0,
    //         Width: 35.0,
    //         Rotation: -28.7128,
    //         Pitch: 324.0,
    //         IsMetricFloorSize: false,
    //         Color: [
    //             0.77647058823529413,
    //             0.83137254901960789,
    //             0.85098039215686272,
    //             1.0
    //             ],
    //         Walls: walls,
    //         Equipment: zoneEquipment
    //     }
        
    //     this.scene.children.forEach(element => {
    //         wall = {
    //             PositionStart:[],
    //             PositionEnd:[],
    //             Color:[]
    //         };
    //         if (element.name == "wall" && element.type == "Mesh") {
    //             if (element.rotation.y == Math.PI / 2) {
    //                 let z1 = parseFloat((((-1) * (element.position.z - (element.geometry.parameters.width*element.scale.x)/2))/ServicesConstants.POSITION_SCALE_FACTOR).toFixed(5));
    //                 let z2 = parseFloat((((-1) * (element.position.z + element.geometry.parameters.width*element.scale.x/2))/ServicesConstants.POSITION_SCALE_FACTOR).toFixed(5));
    //                 if (z1 < z2) {
    //                     wall.PositionStart = [element.position.x / ServicesConstants.POSITION_SCALE_FACTOR, z1];
    //                     wall.PositionEnd = [element.position.x / ServicesConstants.POSITION_SCALE_FACTOR, z2];
    //                 } else {
    //                     wall.PositionStart = [element.position.x / ServicesConstants.POSITION_SCALE_FACTOR, z2];
    //                     wall.PositionEnd = [element.position.x / ServicesConstants.POSITION_SCALE_FACTOR, z1];
    //                 }
    //             } 
    //             else if (element.rotation.y == Math.PI) {
    //                 let x1 = parseFloat((((element.position.x - element.geometry.parameters.width*element.scale.x/2))/ServicesConstants.POSITION_SCALE_FACTOR).toFixed(5));
    //                 let x2 = parseFloat((((element.position.x + element.geometry.parameters.width*element.scale.x/2))/ServicesConstants.POSITION_SCALE_FACTOR).toFixed(5));
    //                 if (x1 < x2) {
    //                     wall.PositionStart = [x1, (-1)*element.position.z / ServicesConstants.POSITION_SCALE_FACTOR];
    //                     wall.PositionEnd = [x2, (-1)*element.position.z / ServicesConstants.POSITION_SCALE_FACTOR];
    //                 } else {
    //                     wall.PositionStart = [x2, (-1)*element.position.z / ServicesConstants.POSITION_SCALE_FACTOR];
    //                     wall.PositionEnd = [x1, (-1)*element.position.z / ServicesConstants.POSITION_SCALE_FACTOR];
    //                 }
    //             }
    //             wall.Color = [element.material.color.r, element.material.color.g, element.material.color.b, 1];
    //             walls.push(wall);
    //         }else if(element.type == "Group"){

    //         }
            
    //     });

    //     console.log("Immunology::"+ JSON.stringify(lab));
    // }

}



