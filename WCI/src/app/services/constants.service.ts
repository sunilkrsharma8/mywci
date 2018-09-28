import { Injectable } from '@angular/core';

/**
 * This class provides the redefined values as a service to
 * the service classes.
 */
@Injectable()
export class ServicesConstants {
    public static APM_SERVER_ADDRESS: string = "http://10.207.147.27:10896";

    public static EXTERNAL_ALERT_PROVIDER: any = {
        1: "LCM",
        6: "DMS",
        7: "DRCS",
        3: "Central Link"
    };
    public static TEST_RULE_TYPE_DESCRIPTION: any = {
        2: "Turnaround Time",
        1: "On-Time STAT Display"
    };
    public static TEST_PRIORITY_MASK: any = {
        1: "STAT",
        2: "Routine",
        3: "STAT and Routine",

    };

    public static ALERT_RULE_TYPE_DESCRIPTION: any = {
        20: "Instrument Event Alert Rule",
        31: "Consumable Inventory Levels Alert Rule",
        32: "Reagent Inventory Levels Alert Rule",
        33: "Reagent Expiration Alert Rule",
        37: "Calibration Expiration Alert Rule",
        38: "Waste Inventory Levels Alert Rule",
        40: "Communication Alert Escalation Rule",
        50: "User-Defined Alert Rule",
        80: "Ancillary Reagent Inventory Levels Alert Rule",
        102: "System Alert Escalation Rule"
    };
    public static ALERT_SEVERITY: any = {
        0: "No Alert",
        50: "an Information Alert",
        100: "a Warning Alert",
        200: "a Critical Alert"
    }

    public static EMPTY_RULE_DATA_IEAR: any = {
        "__type": "InstrumentEventRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 2,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 20,
        "Version": 0,
        "EventCodes": [],
        "Severity": 0
    };

    public static EMPTY_RULE_DATA_CILAR: any = {
        "__type": "ConsumableInventoryLevelRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 31,
        "Version": 0,
        "CriticalLevel": -1,
        "FullLevel": -1,
        "ItemNames": [],
        "WarningLevel": -1
    };

    public static EMPTY_RULE_DATA_RILAR: any = {
        "__type": "ReagentInventoryLevelRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 32,
        "Version": 0,
        "CriticalLevel": -1,
        "FullLevel": -1,
        "ItemNames": [],
        "WarningLevel": -1
    };

    public static EMPTY_RULE_DATA_REAR: any = {
        "__type": "InventoryExpirationRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 33,
        "Version": 0,
        "EnableCriticalThreshold": false,
        "EnableOBSCriticalThreshold": false,
        "ItemNames": [],
        "OBSWarningThreshold": "PT0S",
        "WarningThreshold": "PTS"
    };

    public static EMPTY_RULE_DATA_CEAR: any = {
        "__type": "InventoryCalibrationExpirationRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 37,
        "Version": 0,
        "EnableCriticalThreshold": false,
        "EnableOBSCriticalThreshold": false,
        "ItemNames": [],
        "OBSWarningThreshold": "PT0S",
        "WarningThreshold": "PT0S"
    };

    public static EMPTY_RULE_DATA_WIAR: any = {
        "__type": "WasteInventoryLevelRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 38,
        "Version": 0,
        "CriticalLevel": -1,
        "FullLevel": -1,
        "ItemNames": [],
        "WarningLevel": -1
    };

    public static EMPTY_RULE_DATA_CAER: any = {
        "__type": "CommunicationRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 4,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 40,
        "Version": 0
    };

    public static EMPTY_RULE_DATA_UDAR: any = {
        "__type": "UserDefinedRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 5,
        "EmailOnEscalationResolution": false,
        "Enabled": false,
        "EscalationEmails": [

        ],
        "Id": 0,
        "Instruments": [

        ],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 50,
        "Version": 0,
        "AlertTime": "",
        "Description": "",
        "Recurrence": {
            "BaseTime": "",
            "DayOfMonth": 0,
            "DaysOfWeekMask": 0,
            "Id": 0,
            "Instance": 0,
            "Interval": 0,
            "MonthOfYear": 0,
            "RecurrenceType": 0,
            "Version": 0
        },
        "Severity": 0
    };

    public static EMPTY_RULE_DATA_ARILAR: any = {
        "__type": "AncillaryReagentInventoryLevelRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 3,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 80,
        "Version": 0,
        "CriticalLevel": -1,
        "FullLevel": -1,
        "ItemNames": [],
        "WarningLevel": -1
    };

    public static EMPTY_RULE_DATA_SAER: any = {
        "__type": "SystemUpdateRuleDto:#Bridge.Contracts.Dto",
        "AckThreshold": "PT0S",
        "Category": 8,
        "EmailOnEscalationResolution": false,
        "Enabled": true,
        "EscalationEmails": [],
        "Id": 0,
        "Instruments": [],
        "Name": "",
        "NotificationEmails": [],
        "ResolveThreshold": "PT0S",
        "Type": 102,
        "Version": 0
    };
    public static EMPTY_RULE_DATA_STTT: any = {
        "__type": "TurnaroundTimeRuleDto:#Bridge.Contracts.Dto",
        "DurationScale": 0,
        "Enabled": false,
        "Id": 0,
        "IsDeletable": true,
        "LocationNames": [],
        "Name": "",
        "NotificationEmails": [],
        "TestNames": [],
        "TestPriorityMask": 3,
        "TestStateMask": 0,
        "Type": 1,
        "Version": 0,
        "ZoneIDs": [],
        "AtRiskDuration": "PT0S",
        "AtRiskEvent": null,
        "EndEvent": null,
        "OverdueDuration": "PT0S",
        "StartEvent": null
    };

    public static EMPTY_RULE_DATA_STOTSD: any = {
        "__type": "TurnaroundTimeRuleDto:#Bridge.Contracts.Dto",
        "DurationScale": 0,
        "Enabled": false,
        "Id": 0,
        "IsDeletable": true,
        "LocationNames": [],
        "Name": "",
        "NotificationEmails": [],
        "TestNames": [],
        "TestPriorityMask": 1,
        "TestStateMask": 0,
        "Type": 1,
        "Version": 0,
        "ZoneIDs": [],
        "AtRiskDuration": null,
        "AtRiskEvent": null,
        "EndEvent": null,
        "OverdueDuration": null,
        "StartEvent": null
    };

    public static EQUIPMENT_MODEL_ICON: any = {
        3: "patient",
        7: "patient",
        9: "patient",
        13: "patient",
        15: "patient",
        21: "patient",
        22: "patient",
        23: "patient",
        24: "patient",
        25: "patient",
        33: "patient",
        34: "patient",
        38: "patient",
        39: "patient",
        40: "patient",
        42: "patient",
        43: "patient",
        48: "patient",
        49: "patient",
        51: "patient",
        52: "patient",
        53: "patient",
        54: "patient",
        55: "patient",
        56: "patient",
        57: "patient",
        58: "patient",
        59: "patient",
        60: "patient",
        61: "patient",
        62: "patient",
        63: "patient",
        64: "patient",
        65: "patient",
        66: "patient",
        68: "patient",
        72: "patient",
        73: "patient",
        74: "patient",
        75: "patient",
        76: "patient",
        77: "patient",
        78: "avatar",
        79: "patient",
        80: "patient",
        87: "patient",
        101: "patient",
        102: "patient",
        103: "patient",
        104: "patient",
        105: "patient",
        106: "patient",
        107: "patient",
        108: "patient",
        109: "patient",
        110: "avatar",
        111: "patient",
        112: "patient",
        113: "patient",
        114: "avatar",
        115: "patient",
        116: "patient",
        117: "avatar",
        118: "patient",
        201: "patient",
        202: "patient",
        203: "patient",
        204: "patient",
        1001: "patient",
        1005: "patient",
        1008: "check",
        1101: "undo",
        10001: "star",
        10005: "delete",
        70000: "show",
        70001: "avatar"
    };


    public static ALERT_STATUS: any = {
        0: "Open",
        1: "Acknowledged",
        2: "Resolved"
    };

    public static DashboardMenuItems: Array<any> = [
        { menuLabel: 'Remove from Dashboard', subMenuLabel: [] },
        {
            menuLabel: 'Resize', subMenuLabel: [
                { menuLabel: 'Small', subMenuLabel: [] },
                { menuLabel: 'Medium', subMenuLabel: [] },
                { menuLabel: 'Wide', subMenuLabel: [] },
                { menuLabel: 'Large', subMenuLabel: [] }]
        },
        { menuLabel: 'Add Tile', subMenuLabel: [] },
        { menuLabel: 'Edit Dashboard Layout', subMenuLabel: [] }];


    public static DashboardAddTileMenus: Array<any> = [
        { menuLabel: '3D View', subMenuLabel: [] },
        { menuLabel: 'Active Alerts', subMenuLabel: [] },
        { menuLabel: 'Priority Samples', subMenuLabel: [] },
        { menuLabel: 'Analog Clock', subMenuLabel: [] },
        { menuLabel: 'Digital Clock', subMenuLabel: [] },
        { menuLabel: 'Integrations', subMenuLabel: [] },
        { menuLabel: 'Remote Control', subMenuLabel: [] }
    ];

    public static DashboardTiles: Array<string> = ['3D View',
        'Active Alerts',
        'Priority Samples',
        'Analog Clock',
        'Digital Clock',
        'Integrations',
        'Remote Control',
        'Custom Tiles'];

    public static ZoneDesignerAddInstrumentMenus: Array<any> = [
        { menuLabel: 'Instruments', subMenuLabel: ["Centaur/1", ] },
        { menuLabel: 'Automation Modules', subMenuLabel: [] },
        { menuLabel: 'Computer Terminals', subMenuLabel: [] },
        { menuLabel: 'Others', subMenuLabel: [] }
    ];

    public static POSITION_SCALE_FACTOR = 75;
    public static ZONE_SCALE_FACTOR = 75;
    public static METER_TO_FOOT = 3.28084;
    public static SCALE_FACTOR = 1.5;
    public static WALL_HEIGHT = 70;
    public static WALL_DEPTH = 7
    public static WALL_ALPHA = 0.65;
    public static SHADOW_CAMERA_LEFT = 1000;
    public static SHADOW_CAMERA_RIGHT = 1000;
    public static SHADOW_CAMERA_TOP = 1000;
    public static SHADOW_CAMERA_BOTTOM = 1000;
    public static SHADOW_CAMERA_FAR = 3000;
    public static SHADOW_DARKNESS = 0.2;
    public static SHADOW_BIAS = 0.0001;
    public static SHADOW_MAP_WIDTH = 2048;
    public static SHADOW_MAP_HEIGHT = 2048

    // public static  THETA = -50 - 180;
    // public static  PHI = 360;
    // public static  RADIUS = 1500;

    public static  THETA = -75;
    public static  PHI = 60;
    public static  RADIUS = 1500;

    public static OCRENDERER_WIDTH_CROP = 150;
    public static OCRENDERER_HEIGHT_CROP = 180;
    public static PCRENDERER_WIDTH_CROP = 150;
    public static PCRENDERER_HEIGHT_CROP = 180;
    public static HORIZONTAL_TILES = 13;
    public static VERTICAL_TILES = 13;


    // NOTE: base file location and base file location can be read from
    //       JSON file on server.
    /** Base file location where all other file related equipments are located.
        e.g. parent directory of the equipment directory containing .mtl, .obj
        etc files
    */
    // TODO: Remove '/' at at the end.
    public static EQUIP_BASE_FILE_LOCATION: string = '../assets/Equipment/';

    // Zone file e.g. Lab file location.
    public static ZONE_JSON_FILE: string = '../assets/zones/Core Lab.pmz';

    // Zone file e.g. Lab file location.
    public static ZONE_JSON_BASE_FILE_EXTENSION: string = '../assets/zones/';

    // Zone file e.g. Lab file location.
    public static ZONE_JSON_FILE_EXTENSION: string = '.pmz';

    // Equipment File name.
    public static EQUIPMENT_INFO_FILE_NAME: string = 'EquipmentInfo.json';

    // Flage image file.
    public static FLAG_FILE_PATH: string = '../assets/Flag/flag.png';

    // Scale for scene.
    public static SCENE_SCALE: number = 1.5;

    // Flag Icon file.
    public static FLAG_ICON_FILE: string = "../../assets/imgs/FlagTextures_enus.png";

    // Flag Icon Count file.
    public static FLAG_ICON_COUNT_FILE: string = "../assets/Flag/2.png";

    // Plane Error Flag file.
    public static PLANE_ERROR_FLAG: string = "../assets/Flag/plane-flag.png";

    // List of zones
    public static LIST_ZONE: Array<string> = [
        "Immunology",
        "Core Lab",
        "Hematology",
        "Chemistry"
    ];
    //Texture repeat value for 3D Texture Object
    public static TEXTURE_REPEAT: any = {
        x: 0.075,
        y: 0.075
    };

    public static NUMBER_IMAGE_OFFSET: any = {
        "Two": { x: 0.151, y: 0.47 },
        "Three": { x: 0.229, y: 0.47 },
        "Four": { x: 0.305, y: 0.47 },
        "Five": { x: 0.383, y: 0.47 },
        "Six": { x: 0.46, y: 0.47 },
        "Seven": { x: 0.535, y: 0.47 },
        "Eight": { x: 0.614, y: 0.47 },
        "Nine": { x: 0.69, y: 0.47 },
        "AboveNine": { x: 0.767, y: 0.47 }
    };

    public static FLAG_OFFSET: any = {
        "Red": { x: 0.0763, y: 0.92 },
        "Yellow": { x: 0.0763, y: 0.84 },
        "Blue": { x: 0.0763, y: 0.77 },

    };
}