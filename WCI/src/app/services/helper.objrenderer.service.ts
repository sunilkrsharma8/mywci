import { Injectable} from '@angular/core';
import { EquipmentModel, LabModel, EquipmentInfoMap, WallModel } from "../models/IEquipmentModel";
import { Scene, DoubleSide, Mesh, EdgesHelper, LineBasicMaterial, Color, PerspectiveCamera, WebGLRenderer, Vector3, Raycaster } from 'three';
import { ServicesConstants } from "./constants.service";
import { HelperFunctions } from "./helper.functions";
import { Zone } from  "../models/zone"
import { ZoneWall, ZoneEquipment } from "../models/equipment-model";
import { ElementRef } from '@angular/core'

declare var require: any;
var THREE = require('three');
(window as any).THREE = THREE;

@Injectable()
export class ObjectRendererHelper {


     private static  POSITION_SCALE_FACTOR = 75;
     private static  SCALE_FACTOR = 1.5;
     private static  ZONE_SCALE_FACTOR = 23;

    /**
 * Decorator for equipment object.
     * @param scene 
     * @param THREE 
     * @param objEquipmentData 
     * @param object 
     */
    public static decorateEquipmentObject(THREE: any, objEquipmentData: ZoneEquipment, object: any): any {
        object.scale.set(ServicesConstants.SCALE_FACTOR,ServicesConstants.SCALE_FACTOR,ServicesConstants.SCALE_FACTOR);
        object.castShadow = true;
        object.receiveShadow = true;
        object.traverse( ( node ) => { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );
        let rotation = objEquipmentData.RotationX;
        object.position.set(objEquipmentData.PositionX * ServicesConstants.POSITION_SCALE_FACTOR, objEquipmentData.PositionY * ServicesConstants.POSITION_SCALE_FACTOR, -1 * objEquipmentData.PositionZ * ServicesConstants.POSITION_SCALE_FACTOR);
        object.rotation.set(objEquipmentData.RotationX, objEquipmentData.RotationY, objEquipmentData.RotationZ);
        //object.rotation.set(0, Math.PI/2,0);
        object.matrix.setRotationFromQuaternion(object.quaternion);
        object.name = objEquipmentData.EquipmentName;
        object.EquipmentId = objEquipmentData.EquipmentId;
        return object;
    }

    /**
     * Create and return the floor Mesh.
     * @param zone 
     * @param THREE 
     */
    public static createFloor(zone: Zone, THREE: any): Mesh {
        let floorWidth = zone.Width * ServicesConstants.ZONE_SCALE_FACTOR;
        let floorLength = zone.Length * ServicesConstants.ZONE_SCALE_FACTOR;
        let floorDepth = 10;
        //Convert to Metre if the size is in foot 
        //if (zone.IsMetricFloorSize) {
            floorWidth /= 3.28084;
            floorLength /= 3.28084;
        //}

        let floorColor = new THREE.Color(HelperFunctions.transformIntegertoRGBA(zone.Color));
        let floorMaterial = new THREE.MeshPhongMaterial({ color: floorColor , side: DoubleSide});
        let floorGeometry = new THREE.BoxGeometry (floorWidth, floorLength, floorDepth);
        let floor: Mesh = new Mesh(floorGeometry, floorMaterial);
        floor.position.y = -5;
        floor.rotation.x = Math.PI / 2;
        floor.receiveShadow = true;
        floor.name = "floor";
        return floor;
    }

    /**
     * Create and return the wall Mesh.
     * @param wall 
     * @param THREE 
     * @return wall as Mesh
     */
    public static createWalls(wall: ZoneWall, THREE:any):Mesh{
        let startPosition: Array<number> = [wall.PositionStartX, wall.PositionStartZ];
        let endPosition: Array<number> = [wall.PositionEndX, wall.PositionEndZ];
        let wallLength;
        let wallPosition = new THREE.Vector3();
        let wallHeight = 70;
        let wallDepth = 7;

        if(startPosition[0].toFixed(5) == endPosition[0].toFixed(5)){
            if(Math.sign(startPosition[1]) == -1 && Math.sign(endPosition[1]) == -1){
                wallLength = startPosition[1] - endPosition[1];
                wallPosition.z = ((-1)*startPosition[1] + wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
            }else if ((Math.sign(startPosition[1]) == 1 && Math.sign(endPosition[1]) == 1)){
                wallLength = startPosition[1] - endPosition[1];
                wallPosition.z = ((-1)*startPosition[1] + wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
            }else{
                wallLength = Math.abs(startPosition[1]) + Math.abs(endPosition[1]);
                if(startPosition[1] < endPosition[1]){
                    wallPosition.z = ((-1)*startPosition[1] - wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
                }else{
                    wallPosition.z = ((-1)*startPosition[1] + wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
                }
            }
            wallPosition.x = startPosition[0]*ServicesConstants.POSITION_SCALE_FACTOR;
            var rotation = Math.PI / 2;

        }else{
            if(Math.sign(startPosition[0]) == -1 && Math.sign(endPosition[0]) == -1){
                wallLength = startPosition[0] - endPosition[0];
                wallPosition.x = (startPosition[0] - wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
            }else if ((Math.sign(startPosition[0]) == 1 && Math.sign(endPosition[0]) == 1)){
                wallLength = startPosition[0] - endPosition[0];
                wallPosition.x = (startPosition[0] - wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
            }else{
                wallLength = Math.abs(startPosition[0]) + Math.abs(endPosition[0]);
                if(startPosition[0] < endPosition[0]){
                    wallPosition.x = (startPosition[0] + wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
                }else{
                    wallPosition.x = (startPosition[0] - wallLength/2)*ServicesConstants.POSITION_SCALE_FACTOR;
                }
            }
            wallPosition.z = (-1)*startPosition[1]*ServicesConstants.POSITION_SCALE_FACTOR;
            rotation = Math.PI;
        }
        wallPosition.y = 35;

        var wallColor = new THREE.Color(HelperFunctions.transformIntegertoRGBA(wall.Color));
        var wallMaterial = new THREE.MeshPhongMaterial({ color: wallColor, side: DoubleSide, transparent: true, opacity: ServicesConstants.WALL_ALPHA});
        //var wallGeometry = new THREE.BoxGeometry(Math.abs(wallLength)*ServicesConstants.POSITION_SCALE_FACTOR, ServicesConstants.WALL_HEIGHT, ServicesConstants.WALL_DEPTH);
        var wallGeometry = new THREE.BoxGeometry(1, ServicesConstants.WALL_HEIGHT, ServicesConstants.WALL_DEPTH);
        wallGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0.5, 0, 0 ));
        var wallMesh = new Mesh(wallGeometry, wallMaterial);
        wallMesh.scale.x = Math.abs(wallLength)*ServicesConstants.POSITION_SCALE_FACTOR;
        if(rotation == Math.PI){
            wallMesh.position.x = wallPosition.x + Math.abs(wallLength)*ServicesConstants.POSITION_SCALE_FACTOR/2;
        }else{
            wallMesh.position.x = wallPosition.x;
        }
        if(rotation == Math.PI/2){
            wallMesh.position.z = wallPosition.z + Math.abs(wallLength)*ServicesConstants.POSITION_SCALE_FACTOR/2;
        }else{
            wallMesh.position.z = wallPosition.z;
        }
        wallMesh.position.y = wallPosition.y;
        wallMesh.rotation.y = rotation;
        wallMesh.receiveShadow = true;
        wallMesh.name = "wall";
        return wallMesh;
    }

    /**
     * Add Edges to the Mesh and returned the Edged Mesh
     * @param mesh
     * @return Edged Mesh to be returned.
     */
    public static addEdges(mesh: Mesh): Mesh {
        var edges = new EdgesHelper(mesh, 0xB4B4B4);
        edges.material = new LineBasicMaterial({linewidth: 2, color: 0xB4B4B4});
        mesh.add(edges);
    }

    /**
     * Convert the File data present in array format to JSON as
     * {'<Name attr from JSON>' : 'JSON Model in array'}
     * @param fileData 
     */
    public static convertToJson(fileData: any): any {
        var eqInfo = {};
        fileData.forEach(item => {
            var itemDetails = <EquipmentInfoMap> item;
            eqInfo[itemDetails.Name] = itemDetails;
        });
        return eqInfo;
    }

     /**
     * returns 2D position of object
     */
    public static getScreenPosition(obj: any, camera: PerspectiveCamera, renderer: WebGLRenderer, container: ElementRef): any {
        var position = obj.position;
        var pos = position.clone();
        var projScreenMat = new THREE.Matrix4();
        projScreenMat.multiply(camera.projectionMatrix, camera.matrixWorldInverse);
        projScreenMat.multiplyVector3(pos);

        var rect = renderer.domElement.getBoundingClientRect();

        // return {
        //     x: ((pos.x + 1)/2 * (window.innerWidth * (3 / 4))) + rect.left ,
        //     y: -((pos.y - 1)/2 * (container.nativeElement.clientHeight)) + rect.left
        // }
        return {
            x: ((pos.x + 1)/2 * (container.nativeElement.clientWidth)) + rect.left ,
            y: -((pos.y - 1)/2 * (container.nativeElement.clientHeight)) + rect.left
        }
    }

    /**
     * returns 3D position of mouse click position
     */
    public static get3DPosition(clientX: number, clientY: number, container: ElementRef, camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer): Vector3{
        
        let rect = renderer.domElement.getBoundingClientRect();
        // 2D
        let mouseX = clientX - rect.left;
        let mouseY = clientY - rect.top;

        // 3D
        let mouse = new THREE.Vector2();
        mouse.x = (mouseX/container.nativeElement.clientWidth) *2 - 1;
        mouse.y = -(mouseY/container.nativeElement.clientHeight) *2 + 1;

        // Raycaster
        let raycaster = new Raycaster();

        raycaster.setFromCamera( mouse, camera );

        //let intersects = raycaster.intersectObjects(scene.children, false);

        let plane = new THREE.Plane();
        let planeNormal = new THREE.Vector3();
        let point = new THREE.Vector3();

        planeNormal.copy(camera.position).normalize();
        plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, point);

        // if (intersects.length != 0)
        // {
        //     // let x = intersects[0].point.x;
        //     // let y = intersects[0].point.y;
        //     // let z = intersects[0].point.z
        //     return new Vector3(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        // }

        return point;
    };

}