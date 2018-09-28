import { RenderZoneDesigner } from "../../services/render.ZoneDesigner.ThreeJSObj";
import { Renderer, AfterViewInit, OnInit, OnDestroy, Component, ElementRef, ViewChild, Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SpinnerComponent } from '../spinner';
import { HttpClient } from '@angular/common/http';
import { DashboardBroadcastService } from "../../services/dashboard.data.broadcast.service";
import { ZoneDataService } from './../../services/zone.data.service';
import { InstrumentDataService } from './../../services/instrument.data.service';
import { Zone } from "../../models/zone";
import { EquipmentType } from './../../models/equipmentType';
import { EquipmentModel } from '../../models/equipment-model';
import { InstrumentItem } from './../../models/instrument-item';
import { ServicesConstants } from "./../../services/constants.service";

@Component({
    selector: 'app-zonedesigner',
    templateUrl: './zonedesigner.component.html',
    styleUrls: ['./zonedesigner.component.css']
})
export class ZonedesignerComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild("zoneTVContainer") tvContainer: ElementRef;
    @ViewChild("zone3DContainer") threedContainer: ElementRef;
    @ViewChild("zoneTVContainer") labDesignerContainer: ElementRef;

    public isRequesting: boolean = true;
    dashboardService: DashboardBroadcastService;
    zoneList: Array<Zone> = [];
    selectedRowZone: number = 0;
    equipmentMenuList: Array<any> = [];
    equipmentMenuListCopy: Array<any> = [];
    selected: any;
    isDrawWall: boolean = false;
    renderService: RenderZoneDesigner;
    instrumentDataService: InstrumentDataService;
    equipmentModels: Array<EquipmentModel> = [];
    equipments: Array<InstrumentItem> = [];
    arrowIcon: string = 'keyboard_arrow_right';
    pathval: any = 12121;

    constructor(elementRef: ElementRef, renderer: Renderer, private http: HttpClient, instrumentDataService: InstrumentDataService, renderService: RenderZoneDesigner, private zoneDataService: ZoneDataService) {
        this.renderService = renderService;
        this.instrumentDataService = instrumentDataService;

        this.equipmentMenuList.push({ menuLabel: 'Instruments', subMenuLabel: [] });
        this.equipmentMenuList.push({ menuLabel: 'Automations', subMenuLabel: [] });
        this.equipmentMenuList.push({ menuLabel: 'Computer Terminals', subMenuLabel: [] });
        this.equipmentMenuList.push({ menuLabel: 'Others', subMenuLabel: [] });

        this.zoneDataService.getZones().then(zones => {
            if (zones != undefined) {
                this.zoneList = zones;
            }
        });

        renderer.listenGlobal('document', 'click', (event) => {
            if (this.arrowIcon == 'keyboard_arrow_down') {
                this.arrowIcon = 'keyboard_arrow_right';
            }
        });

    }



    /**
     * Called before initialization
     */
    ngOnInit() {
        this.isRequesting = true;
    }

    /**
     * Initialize home components.
     */
    ngAfterViewInit() {
        // this.dashboardService.labSubject.subscribe(
        //      labName => {
        //     this.isRequesting = true;
        //     this.renderService.destroy();
        //     this.labDesignerContainer.nativeElement.style["display"] = "none"; 
        //     this.renderService.init(this.tvContainer,this.threedContainer, this.http);
        //     this.renderService.renderUIFromJson(this.zoneList[0].id).then(()=>{
        //     this.labDesignerContainer.nativeElement.style["display"] = "flex";
        //     this.isRequesting = false;
        //     this.renderService.attachDragandDropControl();
        //     this.renderService.animate();
        // });
        //  });

        this.instrumentDataService.getEquipmentModelsData().then(equipmentModels => {
            this.equipmentModels = equipmentModels;
            this.instrumentDataService.getInstrumentsAllData().then(equipments => {
                this.equipments = equipments;
                this.equipments.forEach(equipment => {
                    var equipmentmodel = this.equipmentModels.find((equipmodel) => {
                        return equipmodel.Id == equipment.EquipmentModelId;
                    });
                    equipment['equipmentmodel'] = equipmentmodel;
                });
                this.setEquipmentMenuList();
                this.zoneDataService.getZones().then(zones => {
                    if (zones != undefined) {
                        this.zoneList = zones;
                        this.loadZone(0);
                    }
                });
            });
        });

    }

    /**
     * ~destructor
     */
    ngOnDestroy() {
        this.renderService.destroy();
    }

    public setEquipmentMenuList(): void {
        this.equipments.forEach(equipment => {
            this.setEquimentListCategory(this.equipmentMenuList, equipment);
        });

        this.equipmentMenuListCopy = JSON.parse(JSON.stringify(this.equipmentMenuList));
    }

    public setEquimentListCategory(equipmentMenuList: Array<any>, equipment: InstrumentItem): void {
        if (equipment['equipmentmodel'] && equipment['equipmentmodel'].Type) {
            equipment['icon'] = ServicesConstants.EQUIPMENT_MODEL_ICON[equipment.EquipmentModelId];
            if (equipment['equipmentmodel'].Type != EquipmentType.Furniture && equipment['equipmentmodel'].Type != EquipmentType.Storage && equipment['equipmentmodel'].Type != EquipmentType.Unknown && equipment['equipmentmodel'].Type != EquipmentType.AutomationModule && equipment['equipmentmodel'].Type != EquipmentType.LPMServer && equipment['equipmentmodel'].Type != EquipmentType.LISTerminal) {
                equipmentMenuList.find(item => { return item.menuLabel == 'Instruments' }).subMenuLabel.push(equipment);
            } else if (equipment['equipmentmodel'].Type == EquipmentType.AutomationModule) {
                equipmentMenuList.find(item => { return item.menuLabel == 'Automations' }).subMenuLabel.push(equipment);
            } else if (equipment['equipmentmodel'].Type == EquipmentType.LISTerminal || equipment['equipmentmodel'].Type == EquipmentType.LPMServer) {
                equipmentMenuList.find(item => { return item.menuLabel == 'Computer Terminals' }).subMenuLabel.push(equipment);
            } else if (equipment['equipmentmodel'].Type == EquipmentType.Furniture) {
                equipmentMenuList.find(item => { return item.menuLabel == 'Others' }).subMenuLabel.push(equipment);
            }
        }
    }
    public loadZone(index) {
        this.selectedRowZone = index;
        this.isRequesting = true;
        this.renderService.destroy();
        this.labDesignerContainer.nativeElement.style["display"] = "none";
        this.renderService.init(this.tvContainer, this.threedContainer, this.http);
        this.renderService.renderUIFromJson(this.zoneList[index].Name).then(() => {
            this.labDesignerContainer.nativeElement.style["display"] = "flex";
            this.isRequesting = false;
            this.renderService.attachDragandDropControl();
            this.renderService.animate();
        });
        this.updateEquipmentMenuList(this.zoneList[index]);
    }
    public updateEquipmentMenuList(zone: Zone): void {
        this.equipmentMenuListCopy = JSON.parse(JSON.stringify(this.equipmentMenuList));
        zone.Equipment.forEach(equip => {
            this.equipmentMenuListCopy.forEach(category => {
                if (category.subMenuLabel.length) {
                    var equipment = category.subMenuLabel.find((equipment) => {
                        return equipment.Id == equip.EquipmentId;
                    });
                    if (equipment) {
                        this.removeEquipmentFromList(category, equipment);
                    }
                }
            });
        });
    }

    public removeEquipmentFromList(category: any, equipment: InstrumentItem) {
        var catIndex = this.equipmentMenuListCopy.findIndex(cat => { return cat.menuLabel == category.menuLabel });
        var equipIndex = this.equipmentMenuListCopy[catIndex].subMenuLabel.findIndex(equip => { return equip.Id == equipment.Id });
        var instrument = this.equipmentMenuListCopy[catIndex].subMenuLabel[equipIndex];
        this.equipmentMenuListCopy[catIndex].subMenuLabel.splice(equipIndex, 1);
        return instrument;
    }

    public addEquipmentToZone(category: any, equipment: InstrumentItem): void {
        var instrument = this.removeEquipmentFromList(category, equipment);
        this.dropInstrument(instrument);
    }
    public select(item) {
        this.selected = (this.selected === item ? null : item);
    }

    public isActive(item) {
        return this.selected === item;
    }

    public drawWall() {
        this.isDrawWall = !this.isDrawWall;
        this.renderService.setDrawWalls(this.isDrawWall);
    }

    public saveZone() {
        //this.renderService.saveZoneConfiguration();
    }

    public deleteInstrument(event) {
        event.currentTarget.parentElement.hidden = true;
        let instrumentId = parseInt(this.renderService.deleteInstrument());

        var instrument = this.equipments.find((equipment) => {
            return equipment.Id == instrumentId;
        });

        this.setEquimentListCategory(this.equipmentMenuListCopy, instrument);
    }

    public dropInstrument(instrument) {
        this.renderService.addNewInstrument(instrument, this.zoneList[this.selectedRowZone]);
    }

    public changeArrowIcon() {
        if (this.arrowIcon == 'keyboard_arrow_right') {
            this.arrowIcon = 'keyboard_arrow_down';
        } else {
            this.arrowIcon = 'keyboard_arrow_right';
        }
    }

    public getcolval(event) {
        console.log(event);
    }

}




