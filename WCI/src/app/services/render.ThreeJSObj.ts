import { ElementRef } from '@angular/core'
import { MeshPhongMaterial, Scene, EffectComposer, Raycaster, PerspectiveCamera, ImageLoader, DirectionalLight, MeshFaceMaterial, Colors, WebGLRenderer, Mesh, LineBasicMaterial, Vector2, LoadingManager, DoubleSide, ImageUtils, Ray, MeshBasicMaterial, BoxGeometry, EdgesHelper, AmbientLight, SpotLight } from 'three';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { DataService } from "../services/data.service";
import { ZoneDataService } from "../services/zone.data.service";
import { InstrumentDataService } from "../services/instrument.data.service";
import { ObjectCreationService } from "../services/objcreate.service";
import { ObjectRendererHelper } from "../services/helper.objrenderer.service";
import { AlertDataService } from './../services/alert.data.service';
//import { EquipmentModel, EquipmentInfoMap, LabModel, WallModel } from "../models/IEquipmentModel";
import { ServicesConstants } from "./constants.service";
import { Zone } from "../models/zone";
import { InstrumentItem } from "../models/instrument-item";
import { EquipmentModel, ZoneEquipment, ZoneWall, EquipmentInfoMap } from "../models/equipment-model"

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

export class RenderThreeJSObj {
    private id: number;
    private scene: Scene;
    private camera: PerspectiveCamera;
    private light: DirectionalLight;
    private renderer: WebGLRenderer;
    private floor: Mesh;
    private onMouseDownPosition: Vector2;
    private ray: Ray;
    private manager: LoadingManager;
    private mouseX = 0;
    private mouseY = 0;
    private windowHalfX = window.innerWidth / 2;
    private windowHalfY = window.innerHeight / 2;
    private isMouseDown: boolean = false;
    private authorized = false;
    private container: ElementRef;
    private raycaster: Raycaster;
    private annimationRed: any;
    private annimationYellow: any;
    private annimationBlue: any;
    private clock: any;
    private flagTexture: any;
    private composer: EffectComposer;
    private outlinePass: any;
    private effectFXAA: any;
    private selectedObjects = [];
    private count: number;
    private uniforms: any;
    private frameCounter = 0;
    private visibleEdgeColorHover = new THREE.Color(0x0c960c);
    private hiddenEdgeColorHover = new THREE.Color(0x0c960c);
    private visibleEdgeColorClick = new THREE.Color(0xff0000);
    private hiddenEdgeColorClick = new THREE.Color(0xff0000);
    private textdiv: HTMLDivElement;
    private zone: any;
    //private errorFlag: any;
    private oneFlagPole: Mesh;
    private allFlags: Array<object>;
    //private flag: Mesh;
    //private flagIcon: Mesh;
    private control: any;
    private ambient: AmbientLight;
    private spotLight: SpotLight;
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
        if (this.container && this.container.nativeElement) {
            this.container.nativeElement.removeEventListener('DOMMouseScroll', this.onDocumentMouseWheel, false);
            this.container.nativeElement.removeEventListener('mousewheel', this.onDocumentMouseWheel, false);
            this.container.nativeElement.removeEventListener('mousedown', this.mouseDown, false);
            this.container.nativeElement.removeEventListener('mouseup', this.mouseUp, false);
            this.container.nativeElement.removeEventListener('mousemove', this.onDocumentMouseMove, false);
            this.container.nativeElement.removeEventListener('contextmenu', this.onContextMenu, false);
            while (this.container.nativeElement.lastChild) {
                this.container.nativeElement.removeChild(this.container.nativeElement.lastChild);
            }
            if (this.lstObjects) {
                this.lstObjects.forEach((mesh) => {
                    this.removeMeshFromScene(mesh, this.scene);
                });
                this.lstObjects.splice(0, this.lstObjects.length);
            }
        }

        if (this.selectedObjects && this.selectedObjects.length > 0) {
            this.selectedObjects.forEach((mesh) => {
                this.removeMeshFromScene(mesh, this.scene);
            })
        }
        window.removeEventListener('resize', this.onWindowResize, false);

        if (this.control) {
            this.control.removeEventListener('change', this.render, false);
        }
        if (this.scene) {
            this.scene.remove(this.ambient);
            this.scene.remove(this.spotLight);
        }
        this.scene = null;
        this.camera = null;
        this.light = null;
        this.ray = null;
        this.raycaster = null;
        this.floor = null;
        // this.flag = null;
        this.allFlags = null;
        this.composer = null;
        this.flagTexture = null;
        this.flagColorTexture = null;
        this.oneFlagPole = null;
        //this.flagIcon = null;
        this.frameCounter = null;
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.forceContextLoss();
            this.renderer.context = undefined;
            this.renderer.domElement = undefined;
            this.renderer = null;
        }
    }

    /**
     * Remove mesh object from scene and destroy it.
     * @param mesh object to be remove
     * @param scene from remove mesh.
     */
    private removeMeshFromScene(mesh: Mesh, scene: Scene): void {
        if (scene) {
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
        if (mesh && mesh.geometry) {
            mesh.geometry.dispose();
        }
        if (mesh.material) {
            if (mesh.material.map) {
                mesh.material.map.dispose();
            }
            mesh.material.dispose();
        }
    }

    public render = () => {
        if (this.composer) {
            //   this.uniforms.amplitude.value = 5 * Math.sin(this.frameCounter);
            this.composer.render();
            this.count += 0.1;
            this.frameCounter += 0.1;
            this.updateOrbitControlRotation();
        }
    }

    public updateOrbitControlRotation = () => {
        var centerPosition = this.control.target.clone();
        centerPosition.y = 0;
        var groundPosition = this.camera.position.clone();
        groundPosition.y = 0;
        var d = (centerPosition.distanceTo(groundPosition));

        var origin = new THREE.Vector2(this.control.target.y, 0);
        var remote = new THREE.Vector2(0, d); // replace 0 with raycasted ground altitude
        var angleRadians = Math.atan2(remote.y - origin.y, remote.x - origin.x);
        this.control.maxPolarAngle = angleRadians;
    }

    public animate = () => {
        this.resizeCanvasToDisplaySize(true);
        this.id = requestAnimationFrame(this.animate);
        this.render();
        //this.control.update();
        this.update();
    }

    private resizeCanvasToDisplaySize(force: boolean): void {
        let canvas = this.renderer.domElement.parentElement;
        let renderSize = this.renderer.getSize(); 
        // look up the size the canvas is being displayed
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // adjust displayBuffer size to match
        if (force || renderSize.width !== width || renderSize.height !== height) {
            // you must pass false here or three.js sadly fights the browser
            this.renderer.setSize(width, height, false);
            this.renderer.domElement.style.width = width + "px";
            this.renderer.domElement.style.height = height + "px";
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
    }

    public update = () => {
        var delta = this.clock.getDelta();
        // this.annimationRed.updateFlag(2000 * delta);
        this.annimationRed !== undefined ? this.annimationRed.updateFlag(2000 * delta) : null;
        this.annimationYellow !== undefined ? this.annimationYellow.updateFlag(2000 * delta) : null;
        this.annimationBlue !== undefined ? this.annimationBlue.updateFlag(2000 * delta) : null;
        //  this.annimation.updateFlag();
        this.control.update();
    }
    /**
     * Residual of the unoptimized rendering
     Maintained temperorily for performance comparision
     TO BE REMOVED
     */
    private processZoneData(data: JSON): void {
        this.zone = data[0];
        this.renderZone();
    }

    /**
    * Residual of the unoptimized rendering
    Maintained temperorily for performance comparision
    TO BE REMOVED
    */
    private renderZone() {
        this.renderFloor();
        this.renderInstruments();
    }

    private renderFloor() {
        var floorWidth = this.zone.Width * ServicesConstants.ZONE_SCALE_FACTOR;
        var floorLength = this.zone.Length * ServicesConstants.ZONE_SCALE_FACTOR;
        var floorDepth = 10;

        //Convert to Metre if the size is in foot 
        if (this.zone.IsMetricFloorSize) {
            floorWidth /= ServicesConstants.METER_TO_FOOT;
            floorLength /= ServicesConstants.METER_TO_FOOT;
        }

        var floorMaterial = new THREE.MeshPhongMaterial({ color: 0xC6D4D9, side: DoubleSide });
        var floorGeometry = new THREE.BoxGeometry(floorWidth, floorLength, floorDepth);
        this.floor = new Mesh(floorGeometry, floorMaterial);
        this.floor.position.y = -5;
        this.floor.rotation.x = Math.PI / 2;
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
        var edges = new EdgesHelper(this.floor, 0xC6D4D9);
        edges.material = new LineBasicMaterial({ linewidth: 2, color: 0xC6D4D9 });
        this.floor.add(edges);
    }

    /**
    * Residual of the unoptimized rendering
    Maintained temperorily for performance comparision
    TO BE REMOVED
    */
    private renderInstruments() {
        for (var i = 0; i < this.zone.ZoneEquipment.length; i++) {
            var instrument = this.zone.ZoneEquipment[i];
            this.addInstrument(instrument, i);
        }
    }

    /**
    * Residual of the unoptimized rendering
    Maintained temperorily for performance comparision
    TO BE REMOVED
    */
    private addInstrument(instrument, i) {
        var MTLLoader = require('three-mtl-loader');
        var OBJLoader = require('three-obj-loader');
        var position: any;
        var rotation: any;
        var flagOffset: any;
        instrument.Position += '';
        instrument.Rotation += '';
        position = instrument.Position.split(',');
        rotation = instrument.Rotation.split(',');
        flagOffset = "0,0,0".split(','); //to be set from the instrument json 
        OBJLoader(THREE);
        let component: RenderThreeJSObj = this;
        var mtlLoader2 = new MTLLoader();
        var objLoader2 = new THREE.OBJLoader();
        mtlLoader2.setTexturePath(ServicesConstants.EQUIP_BASE_FILE_LOCATION + instrument.ModelName + '/');
        mtlLoader2.setPath(ServicesConstants.EQUIP_BASE_FILE_LOCATION + instrument.ModelName + '/');

        mtlLoader2.load(instrument.ModelName + ".mtl", function (materials) {
            materials.preload();
            materials.map = null;

            objLoader2.setMaterials(materials);
            objLoader2.setPath(ServicesConstants.EQUIP_BASE_FILE_LOCATION + instrument.ModelName + '/');

            objLoader2.load(instrument.ModelName + ".obj", function (object) {

                object.scale.set(ServicesConstants.SCENE_SCALE,
                    ServicesConstants.SCENE_SCALE,
                    ServicesConstants.SCENE_SCALE);
                object.castShadow = true;
                object.receiveShadow = true;
                object.traverse(function (node) { if (node instanceof THREE.Mesh) { node.castShadow = true; } });
                //alert(instrument.Position);

                object.position.set(position[0] * ServicesConstants.POSITION_SCALE_FACTOR,
                    position[1] * ServicesConstants.POSITION_SCALE_FACTOR,
                    -1 * position[2] * ServicesConstants.POSITION_SCALE_FACTOR);
                object.rotation.set(rotation[0], rotation[1], rotation[2]);
                object.matrix.setRotationFromQuaternion(object.quaternion);
                object.name = instrument.Name;
                component.scene.add(object);

                var flags = component.getAlerts(instrument.Id);
                if (flags.critical.length || flags.warning.length || flags.infomation.length) {
                    component.showFlag(object, position, flagOffset, 1, flags);
                }
            });
        });
        
    }

    /**
     * Getting the flag instance.
     */
    private getFlagInstance(flagCount, flagType): any {
        var group = new THREE.Group();
        var flagInstance = this.oneFlagPole.clone();
        group.add(flagInstance);
        var errorFlag = this.createErrorFlag(flagType); //Creates base flag
        group.add(errorFlag);
        var flagIcon = this.createErrorFlagIcon(flagType); //Creates front icon image
        group.add(flagIcon);
        if (flagCount > 1) {
            var flagCountIcon = this.createErrorFlagCountIcon(flagCount);//Creates count image to be displayed on flag if count > 2
            group.add(flagCountIcon);
        }
        return group;
    }

    /**
     * Setting the Critical error flag
     */
    private getCriticalFlagInstancePosition(position, offset, flagsInfo): any {
        var posX = (position[0] + offset[0]) * ServicesConstants.POSITION_SCALE_FACTOR;
        var posZ = -1 * (position[2] + offset[0]) * ServicesConstants.POSITION_SCALE_FACTOR;
        if (flagsInfo.critical.length && flagsInfo.warning.length) {
            var posY = 60 + (position[1] + offset[1]) * ServicesConstants.POSITION_SCALE_FACTOR + 100;

        } else {
            var posY = (position[1] + offset[1]) * ServicesConstants.POSITION_SCALE_FACTOR + 100;
        }
        return { 'x': posX, 'y': posY, 'z': posZ };
    }

    /**
     * Setting the Warning flag
     */
    private getWarningFlagInstancePosition(position, offset, flagsInfo): any {
        var posX = (position[0] + offset[0]) * ServicesConstants.POSITION_SCALE_FACTOR;
        var posZ = -1 * (position[2] + offset[0]) * ServicesConstants.POSITION_SCALE_FACTOR;
        var posY = (position[1] + offset[1]) * ServicesConstants.POSITION_SCALE_FACTOR + 100;
        return { 'x': posX, 'y': posY, 'z': posZ };
    }

    /**
     * Adding the error flags.
     */

    private showFlag(instrumentMesh, position, offset, poleSize, flagsInfo) {

        if (offset == null)
            offset = [0, 0, 0];

        if (flagsInfo.critical.length) {
            var flagInstance = this.getFlagInstance(flagsInfo.critical.length, 200);
            var cords = this.getCriticalFlagInstancePosition(position, offset, flagsInfo);
            flagInstance.position.set(0, cords.y, 0);
            //    flagInstance.position.set(-100, 50, 0);
            flagInstance.rotation.y = Math.atan2((this.camera.position.x - flagInstance.position.x), (this.camera.position.z - flagInstance.position.z));
            this.allFlags.push(flagInstance);
            instrumentMesh.add(flagInstance);
        }

        if (flagsInfo.warning.length) {
            var flagInstance = this.getFlagInstance(flagsInfo.warning.length, 100);
            var cords = this.getWarningFlagInstancePosition(position, offset, flagsInfo);
            flagInstance.position.set(0, cords.y, 0);
            //  flagInstance.position.set(-100, 50, 0);
            flagInstance.rotation.y = Math.atan2((this.camera.position.x - flagInstance.position.x), (this.camera.position.z - flagInstance.position.z));
            //   flagInstance.children[0].material.uniforms.tSec.value.image.setAttribute('src', '../assets/Flag/test.png');
            //   flagInstance.children[0].children[0].material.map.image.setAttribute('src', '../assets/Flag/test1.png');
            this.allFlags.push(flagInstance);
            instrumentMesh.add(flagInstance);
        }

    }

    private addSelectedObject = (object, event) => {
        this.selectedObjects = [];
        if (event == "Hover") {
            this.outlinePass.visibleEdgeColor = this.visibleEdgeColorHover;
            this.outlinePass.hiddenEdgeColor = this.hiddenEdgeColorHover;
        }
        else {
            this.outlinePass.visibleEdgeColor = this.visibleEdgeColorClick;
            this.outlinePass.hiddenEdgeColor = this.hiddenEdgeColorClick;
        }
        this.selectedObjects.push(object);
    }

    private empty = (elem) => {
        while (elem.lastChild) elem.removeChild(elem.lastChild);
    }

    private setOverlayText = (text, posX, posY) => {

        if (text.trim().length == 0) {
            this.textdiv.hidden = true;
        }
        else {
            this.textdiv.innerHTML = text;
            this.textdiv.style.left = (posX) + "px";
            this.textdiv.style.top = (posY) + "px";
            this.textdiv.hidden = false;
        }
    }

    public init = (container: ElementRef, http: HttpClient) => {
        this.manager = new LoadingManager();
        this.container = container;
        this.textdiv = <HTMLDivElement>document.getElementsByClassName("label-text")[0];
        this.textdiv.hidden = true;

        this.mapCreatedObj = new Map<string, any>();
        this.mapCreationInProgress = new Map<string, Array<ZoneEquipment>>();
        this.lstObjects = new Array<EquipmentModel>();

        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20000);
        this.camera.position.x = ServicesConstants.RADIUS * Math.sin(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);
        this.camera.position.y = ServicesConstants.RADIUS * Math.sin(ServicesConstants.PHI * Math.PI / 360);
        this.camera.position.z = ServicesConstants.RADIUS * Math.cos(ServicesConstants.THETA * Math.PI / 360) * Math.cos(ServicesConstants.PHI * Math.PI / 360);

        this.onMouseDownPosition = new Vector2();
        this.scene = new Scene();
        this.ray = new Ray(this.camera.position, null);

        this.light = new DirectionalLight(0x444444);
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

        //for shadow starts
        this.light.castShadow = true;
        this.light.shadowCameraVisible = true;
        this.light.shadowCameraLeft = (-1) * ServicesConstants.SHADOW_CAMERA_LEFT;
        this.light.shadowCameraRight = ServicesConstants.SHADOW_CAMERA_RIGHT;
        this.light.shadowCameraTop = ServicesConstants.SHADOW_CAMERA_TOP;;
        this.light.shadowCameraBottom = (-1) * ServicesConstants.SHADOW_CAMERA_BOTTOM;;
        this.light.shadowCameraFar = ServicesConstants.SHADOW_CAMERA_FAR;
        this.light.shadowDarkness = ServicesConstants.SHADOW_DARKNESS;
        this.light.shadowBias = ServicesConstants.SHADOW_BIAS;
        this.light.shadowMapWidth = ServicesConstants.SHADOW_MAP_WIDTH;
        this.light.shadowMapHeight = ServicesConstants.SHADOW_MAP_HEIGHT;
        //for shadow ends

        this.scene.add(this.light);
         var helper = new THREE.CameraHelper( this.light.shadow.camera );
         //this.scene.add( helper );

        // Ambient Light.
        this.ambient = new AmbientLight(0x666666);
        this.scene.add(this.ambient);

        // Spot Light
        this.spotLight = new SpotLight(0x666666);
        this.spotLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.scene.add(this.spotLight);

        let component: RenderThreeJSObj = this;

        //Add a flag to scene
        this.allFlags = new Array<object>();
        this.createFlagPole(1);
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth * (3 / 4), window.innerHeight * (3 / 4) - 90);
        //let height = getComputedStyle(document.getElementById("3dcanvas")).height;
        //let width = getComputedStyle(document.getElementById("3dcanvas")).width;
        //this.renderer.setSize(Number(width.substr(0,width.length - 2)), Number(height.substr(0,height.length - 2)));
        this.renderer.domElement.style.position = "relative";
        this.renderer.setClearColor(0x2d2d2d);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMapSoft = true;
        container.nativeElement.appendChild(this.renderer.domElement);

        this.control = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.control.enableZoom = true;
        this.control.enablePan = true;
        this.control.maxPolarAngle = Math.PI / 2;
        this.control.minDistance = 0;
        this.control.maxDistance = 4000;

        //Outline effect
        this.addOutlineEffect();

        container.nativeElement.addEventListener('DOMMouseScroll', this.onDocumentMouseWheel, false);
        container.nativeElement.addEventListener('mousewheel', this.onDocumentMouseWheel, false);
        container.nativeElement.addEventListener('mousedown', this.mouseDown, false);
        container.nativeElement.addEventListener('mouseup', this.mouseUp, false);
        container.nativeElement.addEventListener('mousemove', this.onDocumentMouseMove, false);
        container.nativeElement.addEventListener('contextmenu', this.onContextMenu, false);
        window.addEventListener('resize', this.onWindowResize, false);
        this.control.addEventListener('change', this.render, false);
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
    private renderLabWalls(wallData: Array<ZoneWall>) {
        let objService: ObjectCreationService = new ObjectCreationService();
        let wall: ZoneWall;
        wallData.forEach((wlModel) => {
            wall = wlModel;
            var wallMesh = ObjectRendererHelper.createWalls(wall, THREE);
            this.lstObjects.push(wallMesh);
            this.scene.add(wallMesh);
        });
    }

    /**
     * Start the UI render from the JSON Model.
     * @param eqMapFileData 
     * @param eqData 
     */
    private processUIRendering(eqMapFileData: JSON, eqData: Array<ZoneEquipment>): any {
        let promise = new Promise((resolve) => {
            let objService: ObjectCreationService = new ObjectCreationService();
            let eqRenderingCounter: number = 0
            eqData.forEach((eqModel) => {
                eqRenderingCounter++;
                let modelName = this.getEquipmentModelName(eqModel.EquipmentId);
                // Check if object is already created.
                if (this.mapCreatedObj.has(modelName)) {
                    // If created then retreive it and proceed for rendering. 
                    let objectMesh = this.mapCreatedObj.get(modelName);
                    this.renderInstrument(eqInfo, eqModel, objectMesh);
                } else {
                    // It is a new object. Then go for creation.
                    let lstObjData = this.mapCreationInProgress.get(modelName);
                    if (lstObjData === null || typeof lstObjData === 'undefined') {
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
                    if (lstObjData.length === 1) { // If we added object in the list already
                        // Thus check in length is equal to 1 then it is new object
                        // and for new object creation.
                        // Start object creation.
                        var eqInfo = <EquipmentInfoMap>eqMapFileData[modelName];
                        let arrPath = eqInfo.MeshFile.split('/');
                        let baseFilePath = ServicesConstants.EQUIP_BASE_FILE_LOCATION + arrPath[0];
                        objService.createObjectWithObjFile(baseFilePath,
                            arrPath[1]
                        ).then((object) => {
                            // Start post object creation process.
                            console.log(eqModel);
                            this.postObjectCreation(modelName, object, eqInfo);
                            if (eqData.length == eqRenderingCounter && this.mapCreationInProgress.size == 0) {
                                this.container.nativeElement.style["display"] = "block";
                                resolve();
                            }
                        });
                    }
                }

            });
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
        if (objEquipmentMesh !== null && typeof objEquipmentMesh !== 'undefined') {
            var lstObjData = this.mapCreationInProgress.get(objName);
            if (lstObjData !== null && typeof lstObjData !== 'undefined' && lstObjData.length > 0) {
                lstObjData.forEach((modelData) => {
                    this.renderInstrument(eqInfo, modelData, objEquipmentMesh);
                });
                lstObjData.splice(0, lstObjData.length); // TODO: Check of this required. If keeping reference then remove this.
                // Once in progress data is completed then do not require data in this map.
                // If object is availalble in mapCreatedObj then direct object is created 
                // from map and applied attribute directly from model data.
                // More details refer processUIRendering(). 
                this.mapCreationInProgress.delete(objName);
            }
        }
    }

    /**
     * Getting the alerts info and return it based on Severity.
     * @param equipmentId 
     */

    private getAlerts(equipmentId: any): any {
        var criti = this.unResolvedAlerts.filter(item => {
            return item.Severity === 200 && item.EquipmentId === equipmentId;
        });

        var warn = this.unResolvedAlerts.filter(item => {
            return item.Severity === 100 && item.EquipmentId === equipmentId;
        });

        var info = this.unResolvedAlerts.filter(item => {
            return item.Severity === 50 && item.EquipmentId === equipmentId;
        });

        var noAlrt = this.unResolvedAlerts.filter(item => {
            return item.Severity === 0 && item.EquipmentId === equipmentId;
        });
        return { 'critical': criti, 'warning': warn, 'infomation': info, 'noAlert': noAlrt };
    }

    private renderInstrument(eqpInfo: EquipmentInfoMap,
        objEquipmentData: ZoneEquipment,
        objEquipmentMesh: any): void {
        // NOTE: Need to clone the object. As this the blue print of perticular type of Mesh.
        var clonedMesh = objEquipmentMesh.clone();
        clonedMesh.IsInstrument = eqpInfo.IsInstrument;
        objEquipmentData.EquipmentName = this.equipments.find(eq => eq.Id == objEquipmentData.EquipmentId).Name;
        var decMesh = ObjectRendererHelper.decorateEquipmentObject(THREE, objEquipmentData, clonedMesh);
        this.lstObjects.push(decMesh);
        this.scene.add(decMesh);
        if (eqpInfo.IsInstrument) {
            var flags = this.getAlerts(objEquipmentData.EquipmentId);

            if (flags.critical.length || flags.warning.length || flags.infomation.length) {
                this.showFlag(decMesh,[objEquipmentData.PositionX, objEquipmentData.PositionY, objEquipmentData.PositionZ], eqpInfo.FlagpoleOffset, 1, flags);
            }
        }
    }

    /**
     * Create a vawing flag by manipulating a static image with shadders.
     */
    public createErrorFlag(flagType: any): any {
        var errorFlagTexture = new THREE.TextureLoader();
        this.flagColorTexture = errorFlagTexture.load(ServicesConstants.FLAG_ICON_FILE);

        switch (flagType) {
            case 200:
                this.flagColorTexture.needsUpdate = true; // cloning does not set this
                this.annimationRed = new TextureAnimator(this.flagColorTexture, ServicesConstants.HORIZONTAL_TILES, ServicesConstants.VERTICAL_TILES, 12, 250, 200);
                var redFlagMaterial = new THREE.MeshBasicMaterial({ map: this.flagColorTexture, side: THREE.DoubleSide });
                redFlagMaterial.transparent = true;
                var redFlagGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
                var redFlagMesh = new THREE.Mesh(redFlagGeometry, redFlagMaterial);
                redFlagMesh.scale.set(11, 11, 1); // imageWidth, imageHeight
                redFlagMesh.position.set(25, 24, 0);
                redFlagMesh.name = "Red Flag";
                return redFlagMesh;

            case 100:
                this.flagColorTexture.needsUpdate = true;
                this.annimationYellow = new TextureAnimator(this.flagColorTexture, ServicesConstants.HORIZONTAL_TILES, ServicesConstants.VERTICAL_TILES, 12, 250, 100);
                var yellowFlagMaterial = new THREE.MeshBasicMaterial({ map: this.flagColorTexture, side: THREE.DoubleSide });
                yellowFlagMaterial.transparent = true;
                var yellowFlagGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
                var yellowFlagMesh = new THREE.Mesh(yellowFlagGeometry, yellowFlagMaterial);
                yellowFlagMesh.scale.set(11, 11, 1); // imageWidth, imageHeight
                yellowFlagMesh.position.set(25, 24, 0);
                yellowFlagMesh.name = "Yellow Flag";
                return yellowFlagMesh;

            case 50:
                this.flagColorTexture.needsUpdate = true;
                this.annimationBlue = new TextureAnimator(this.flagColorTexture, ServicesConstants.HORIZONTAL_TILES, ServicesConstants.VERTICAL_TILES, 12, 250, 50);
                var blueFlagMaterial = new THREE.MeshBasicMaterial({ map: this.flagColorTexture, side: THREE.DoubleSide });
                blueFlagMaterial.transparent = true;
                var blueFlagGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
                var blueFlagMesh = new THREE.Mesh(blueFlagGeometry, blueFlagMaterial);
                blueFlagMesh.scale.set(11, 11, 1); // imageWidth, imageHeight
                blueFlagMesh.position.set(25, 24, 0);
                blueFlagMesh.name = "Blue Flag";
                return blueFlagMesh;
        }
    }

    /**
     * Create Flag Pole
     */
    public createFlagPole = (numberOfFlags) => {
        var geometry = new THREE.CylinderGeometry(3, 3, 100 * numberOfFlags, 32, 1, false);
        var material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 });
        var cylinder = new THREE.Mesh(geometry, material);
        this.oneFlagPole = cylinder;
    }

    /**
     * Create an icon to overlay the flag
     */
    public createErrorFlagIcon(flagType: number): any {
        var frontTexture = this.flagColorTexture.clone();
        frontTexture.needsUpdate = true; // cloning does not set this
        frontTexture.offset.x = 0.535;// 0.535 Hammer

        switch (flagType) {// Change offset y according to flagType
            case 200:
                frontTexture.offset.y = 0.63;//White hammer icon
                break;
            case 100:
                frontTexture.offset.y = 0.7;//Black hammer icon
                break;
        }

        frontTexture.repeat.x = ServicesConstants.TEXTURE_REPEAT.x;
        frontTexture.repeat.y = ServicesConstants.TEXTURE_REPEAT.y;
        var flagIconMaterial = new THREE.MeshBasicMaterial({ map: frontTexture, side: THREE.DoubleSide });
        flagIconMaterial.transparent = true;
        var flagIconGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
        var flagIconMesh = new THREE.Mesh(flagIconGeometry, flagIconMaterial);
        flagIconMesh.scale.set(12, 12, 1); //set the Icon size
        flagIconMesh.position.set(22, 31, 1);
        return flagIconMesh;
    }

    /**
    * Create an count icon to overlay the flag
    */
    public createErrorFlagCountIcon(flagCount: number): any {
        var countTexture = this.flagColorTexture.clone();
        countTexture.needsUpdate = true; // cloning does not set this
        switch (flagCount) {//Show count imagefrom sprite image
            case 2:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Two.x; //Number 2
                break;
            case 3:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Three.x;//Number 3
                break;
            case 4:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Four.x;//Number 4
                break;
            case 5:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Five.x;//Number 5
                break;
            case 6:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Six.x;//Number 6
                break;
            case 7:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Seven.x;//Number 7
                break;
            case 8:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Eight.x;//Number 8
                break;
            case 9:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.Nine.x;//Number 9
                break;
            default:
                countTexture.offset.x = ServicesConstants.NUMBER_IMAGE_OFFSET.AboveNine.x;//Number 9+
                break;
        }
        countTexture.offset.y = 0.47;//Offset for number count from image
        countTexture.repeat.x = ServicesConstants.TEXTURE_REPEAT.x;
        countTexture.repeat.y = ServicesConstants.TEXTURE_REPEAT.y;
        var countMaterial = new THREE.MeshBasicMaterial({ map: countTexture, side: THREE.DoubleSide });
        countMaterial.transparent = true;
        var countGeometry = new THREE.PlaneGeometry(5, 5, 1, 1);
        var countMesh = new THREE.Mesh(countGeometry, countMaterial);
        countMesh.scale.set(10, 10, 5);
        countMesh.position.set(28, 28, 10);
        return countMesh;
    }

    /**
     * Add an outline effect to the instruments on Hoverover and clicks
     */
    public addOutlineEffect() {
        this.composer = new THREE.EffectComposer(this.renderer);
        var renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        this.outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth * (3 / 4), window.innerHeight * (3 / 4) - 90), this.scene, this.camera);
        this.outlinePass.visibleEdgeColor = new THREE.Color(0x0c960c);
        this.outlinePass.hiddenEdgeColor = new THREE.Color(0x0c960c);
        this.composer.addPass(this.outlinePass);

        this.effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
        this.effectFXAA.uniforms['resolution'].value.set(1 / (window.innerWidth * (3 / 4) * (window.devicePixelRatio)), 1 / ((window.innerHeight * (3 / 4) - 90) * (window.devicePixelRatio)));
        this.effectFXAA.color = new THREE.Color(0x0c960c);
        this.effectFXAA.renderToScreen = true;
        this.composer.addPass(this.effectFXAA);
    }

    /**
     * Identify the hovered/clicked instrument and highlight it
     * @param clientX 
     * @param clientY 
     * @param event 
     */
    public highlightInstrument(clientX, clientY, event) {
        this.isMouseDown = false;
        var rect = this.renderer.domElement.getBoundingClientRect();
        this.onMouseDownPosition.x = ((clientX - rect.left) / (window.innerWidth * (3 / 4))) * 2 - 1;
        this.onMouseDownPosition.y = - ((clientY - rect.top) / (this.container.nativeElement.clientHeight)) * 2 + 1;
        this.raycaster = new Raycaster();
        this.raycaster.setFromCamera(this.onMouseDownPosition, this.camera);
        var intersectObj = this.raycaster.intersectObjects(this.scene.children, true);
        var color = (Math.random() * 0xffffff);
        var object2Dposition;
        if (intersectObj.length > 0) {
            let mesh = new Mesh;
            let parentMesh = new Mesh;
            mesh = intersectObj[0].object;
            parentMesh = mesh.parent;
            if (parentMesh.type === 'Scene') {
                object2Dposition = ObjectRendererHelper.getScreenPosition(mesh, this.camera, this.renderer, this.container);
                //this.setOverlayText(mesh.name, object2Dposition.x, object2Dposition.y);
            } else if (parentMesh.IsInstrument) {
                object2Dposition = ObjectRendererHelper.getScreenPosition(parentMesh, this.camera, this.renderer, this.container);
                this.setOverlayText(parentMesh.name, object2Dposition.x, object2Dposition.y);
                this.addSelectedObject(parentMesh, event);
                this.outlinePass.selectedObjects = this.selectedObjects;
            }else{
                let selectedFlag = parentMesh.children.find(mesh => mesh.name.indexOf("Flag") != -1);
                if(selectedFlag != undefined){
                    this.addSelectedObject(selectedFlag, event);
                    this.outlinePass.selectedObjects = this.selectedObjects;
                }
            }
        }
    }

    /**
     * Handler for Mouse Down event.
     */
    mouseDown = (event) => {
        event.preventDefault();
        this.isMouseDown = true;
        this.onMouseDownPosition.x = event.clientX;
        this.onMouseDownPosition.y = event.clientY;
    }

    /**
     * Handler for Mouse Up event.
     */
    mouseUp = (event) => {
        event.preventDefault();
        this.highlightInstrument(event.clientX, event.clientY, "Click");
    }

    /**
     * Handler for Click event on Context Menus.
     */
    onContextMenu = (event) => {
        event.preventDefault();
    }

    /**
     * Handler for Window resize event.
     */
    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth * (3 / 4), window.innerHeight * (3 / 4) - 90);
    }

    /**
     * Handler for Mouse Move event on DOM.
     */
    onDocumentMouseMove = (event) => {
        event.preventDefault();
        if (this.isMouseDown) {
            for (var i = 0; i < this.allFlags.length; i++) {
                var obj = (<Mesh>this.allFlags[i]);
                obj.rotation.y = Math.atan2((this.camera.position.x - obj.position.x), (this.camera.position.z - obj.position.z));
            }
        } else {
            this.highlightInstrument(event.clientX, event.clientY, "Hover");
        }
    }

    /**
     * Handler for Mouse Wheel event.
     */
    onDocumentMouseWheel = (event) => {
        event.preventDefault();
        if (event.button != 0) {
            this.camera.fov += event.deltaY * 0.05;
            this.camera.updateProjectionMatrix();
        }
    }
}

export class TextureAnimator {
    private texture: any;
    private tilesHorizontal: number;
    private tilesVertical: number;
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet. 
    private numberOfTiles: number;
    // how long should each image be displayed?
    private tileDisplayDuration: number;
    private type: number;
    private currentDisplayTime: number = 0;
    private currentTile: number = 1;

    constructor(texture1: any, tilesHoriz1: number, tilesVert1: number, numTiles1: number, tileDispDuration1: number, type1: number) {
        this.texture = texture1;
        this.tilesVertical = tilesVert1;
        this.tilesHorizontal = tilesHoriz1;
        this.numberOfTiles = numTiles1;
        this.tileDisplayDuration = tileDispDuration1;
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping;
        this.type = type1;
        this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
    }

    private updateFlag = (milliSec) => {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles) {
                this.currentTile = 1;
                this.texture.offset.x = 0;
            }
            this.texture.offset.x += 0.0763;//Increase offset x in order to achieve animation
            switch (this.type) {//Change offset y according to alert type 
                case 200://Red Flag
                    this.texture.offset.y = ServicesConstants.FLAG_OFFSET.Red.y;
                    break;

                case 100://Yellow Flag
                    this.texture.offset.y = ServicesConstants.FLAG_OFFSET.Yellow.y;
                    break;

                case 50://Blue Flag
                    this.texture.offset.y = ServicesConstants.FLAG_OFFSET.Blue.y;
                    break;
            }
        }
    }

}


