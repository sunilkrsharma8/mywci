

import { Injectable } from '@angular/core';
import {RcMethod, RcThumbnailUpdate_Mode} from './ModelEnums';
    
    export interface EquipmentModel {
        Name: string;
        ModelName: string;
        SerialNumber: string;
        Active: boolean;
        RcMethod: RcMethod;
        RcThumbnailUpdateMode: RcThumbnailUpdate_Mode;
        RcAddress: string;
        RcPort: number;
        RcPassword: string;
        Position: Array<number>;
        Rotation: Array<number>;
    }

    export interface IPlane {
        PositionStart: Array<number>;
        PositionEnd: Array<number>;
        Color: Array<number>;
    }

    export interface LabModel {
        Name: string;
        Length: number;
        Width: number;
        Rotation: number;
        Pitch: number;
        IsMetricFloorSize: boolean;
        Color: Array<number>;
        Walls: Array<IPlane>;
        ZoneEquipment: Array<EquipmentModel>;
    }

    export interface WallModel{
        PositionStart: Array<number>;
        PositionEnd: Array<number>;
        Color: Array<number>;
    }

    export interface ModelTypes {
        ZoneEquipment: "ZoneEquipment";
        Walls: "Walls";
    }

    export interface EquipmentInfoMap {
        Name: string;
        MeshFile: string;
        IconFile: string;
        FlagpoleOffset: Array<number>;
        IsInstrument: boolean;
    }

    export interface EquipmentInfo {
        Name: EquipmentInfoMap;
    }