import { Zone } from "./zone"
import { RemoteControl } from "./equipment-model"

export class InstrumentItem {
    Active: boolean = false;
    EquipmentModelId: number = 0;
    Id: number = 0;
    IsMapped: boolean = false;
    MaxHourlyThroughput: any = 0;
    Name: any = '';
    RemoteControl: RemoteControl = new RemoteControl();
    SerialNumber: any;
    SoftwareVersion: any;
    StatusText: any;
    SupportsInventory: boolean = false;
    Version: any = 0;
    equipmentmodel: any = {};
    isFieldDisabled: boolean = false;
    isExpanded: boolean = true;
    zones: Zone;
}

