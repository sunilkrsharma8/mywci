import { ZoneEquipment, ZoneWall } from "./equipment-model";

export class Zone {
    Id: number;
    Version: any = 0;
    Name: any = '';
    Length: number;
    Width: number;
    IsMetricFloorSize: boolean;
    Pitch: number;
    Rotation: number;
    Color: number;
    PositionX: number;
    PositionZ: number;
    Walls: Array<ZoneWall>;
    Equipment: Array<ZoneEquipment>;    
}
