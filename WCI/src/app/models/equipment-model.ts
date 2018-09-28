import { RcMethod } from "./ModelEnums"

export class EquipmentModel {
    Id: number;
    Version: any = 0;
    Name: any = '';
    Type: any;
    DisableRemoteControl: boolean;
    DisplayName: string;
    MaxHourlyThroughput: number = 0;   
}

export class ZoneEquipment{
    Id: number;
    Version: any = 0;
    EquipmentId: number;
    EquipmentName: string;
    PositionX: number;
    PositionY: number;
    PositionZ: number;
    RotationX: number;
    RotationY: number;
    RotationZ: number;
    ZoneId: number;
}

export class RemoteControl{
    Address: string;
    ConnectionString:string;
    Method: RcMethod;
    Password: string;
    Port: number;
    ThumbnailUpdateMode: number;
    Username: string;
}

export class ZoneWall{
    Id: number;
    Version: any = 0;
    Color: number;
    PositionEndX: number;
    PositionEndZ: number;
    PositionStartX: number;
    PositionStartZ: number;
}

export class EquipmentInfoMap {
    Name: string;
    MeshFile: string;
    IconFile: string;
    FlagpoleOffset: Array<number>;
    IsInstrument: boolean;
}

export class EquipmentInfo {
    Name: EquipmentInfoMap;
}
