import { ElementRef, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {LabModel} from "../models/IEquipmentModel";

declare var require: any;

var THREE = require('three');
(window as any).THREE = THREE;

@Injectable()
export class ObjectCreationService {
    private MTLLoader = require('three-mtl-loader'); 
    private OBJLoader = require('three-obj-loader');

    /**
     * Constructor
     */
    constructor() {
        this.OBJLoader(THREE);
    }
    
    /**
     * Create Mesh object from Files.
     * @param basePath 
     * @param objFileName 
     */
    public createObjectWithObjFile(basePath: string, objFileName: string): any {
        var promise = new Promise((resolve, reject) => {
            var mtlFileName = objFileName.split('.')[0] + '.mtl';
            basePath += '/';
            this.mtlLoader(basePath, mtlFileName).then((material) => {
                this.objLoader(basePath, objFileName, material).then((object) => {
                    resolve(object);
                });
            });
        });
        return promise;
    }

    /**
     * Material file loader.
     * @param basePath 
     * @param mtlFileName 
     */
    private mtlLoader(basePath: string, mtlFileName: string): any {
        var mtlLoaderObj = new this.MTLLoader();
        mtlLoaderObj.setTexturePath( basePath );
        mtlLoaderObj.setPath( basePath );
        var promise = new Promise((resolve, reject) => {
            mtlLoaderObj.load(mtlFileName, (material) => {
                resolve(material);
            });
        });
        return promise;
    }

    /**
     * Object file loader.
     * @param basePath 
     * @param objFileName 
     * @param material 
     */
    private objLoader(basePath: string, objFileName: string, material: any): any {
        material.preload();
        material.map = null;
        var objLoaderObj = new THREE.OBJLoader();
        objLoaderObj.setPath( basePath );
        objLoaderObj.setMaterials(material);
        var promise = new Promise((resolve, reject) => {
            objLoaderObj.load(objFileName, (object) => {
                resolve(object);
            });
        });
        return promise;
    }
}