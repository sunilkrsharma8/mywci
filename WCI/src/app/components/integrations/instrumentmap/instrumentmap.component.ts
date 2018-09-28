import { Component, OnInit } from '@angular/core';
import { IntgrationDataService } from './../../../services/integration.data.service';
import { InstrumentDataService } from './../../../services/instrument.data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as IntegrationEquipmentMapsActions from './../../../actions/integration-equipment-maps.actions';
import * as InstrumentsActions from './../../../actions/instruments.actions';
import { IntegrationEquipmentMap } from './../../../models/integration-equipment-map';
import { InstrumentItem } from './../../../models/instrument-item';

@Component({
    selector: 'app-instrumentmap',
    templateUrl: './instrumentmap.component.html',
    styleUrls: ['./instrumentmap.component.css']
})
export class InstrumentmapComponent implements OnInit {
    menuList: any;
    selected: any;
    selectedInstrument: any;
    integrationDataService: IntgrationDataService;
    instrumentDataService: InstrumentDataService;
    integrationEquipmentMaps: Observable<IntegrationEquipmentMap[]>;
    integrationEquipmentMapsData: Array<any>;
    integrationEquipmentMaps_copy: Array<any>;
    instruments: Observable<InstrumentItem[]>;
    groupedInstruments: Array<any>;

    constructor(integrationDataService: IntgrationDataService, instrumentDataService: InstrumentDataService, private store: Store<AppState>) {
        this.integrationDataService = integrationDataService;
        this.instrumentDataService = instrumentDataService;
        this.integrationEquipmentMaps = store.select('integrationEquipmentMaps');
        this.instruments = store.select('instrumentItem');

        this.integrationDataService.getIntegrationEquipmentMapsData().then((data) => {
            this.store.dispatch(new IntegrationEquipmentMapsActions.Empty());
            data.forEach(element => {
                this.store.dispatch(new IntegrationEquipmentMapsActions.AddIntegrationEquipmentMap(element));
            });
            this.updateIntegrationEquipmentMapsData()
            this.integrationEquipmentMaps_copy = JSON.parse(JSON.stringify(this.integrationEquipmentMapsData));
        });

        this.instrumentDataService.getInstrumentsData().then((data) => {
            this.store.dispatch(new InstrumentsActions.Empty());
            data.forEach(element => {
                this.store.dispatch(new InstrumentsActions.AddInstrument(element));
            });

            this.instruments.subscribe(instruments => {
                this.groupedInstruments = this.getInstrumentsByGroup(instruments);
            });

        });

        this.menuList = [

            {
                "name": "Advia Centaur XPT",
                "subMenu": [{ "Name": "3rd Party Analyzer", "Id": 10109, "Icon": "Generic Floor Instrument.png", "ModelName": "Generic Floor Instrument" }, { "Name": "ADVIA 2400A", "Id": 86, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA 2400B", "Id": 10110, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA Chemistry XPT1", "Id": 10114, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }, { "Name": "ADVIA Chemistry XPT2", "Id": 10108, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }]
            }, {
                "name": "Advia Chemistry XPT",
                "subMenu": [{ "Name": "3rd Party Analyzer", "Id": 10109, "Icon": "Generic Floor Instrument.png", "ModelName": "Generic Floor Instrument" }, { "Name": "ADVIA 2400A", "Id": 86, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA 2400B", "Id": 10110, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA Chemistry XPT1", "Id": 10114, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }, { "Name": "ADVIA Chemistry XPT2", "Id": 10108, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }]
            }, {
                "name": "Immulite",
                "subMenu": [{ "Name": "3rd Party Analyzer", "Id": 10109, "Icon": "Generic Floor Instrument.png", "ModelName": "Generic Floor Instrument" }, { "Name": "ADVIA 2400A", "Id": 86, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA 2400B", "Id": 10110, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA Chemistry XPT1", "Id": 10114, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }, { "Name": "ADVIA Chemistry XPT2", "Id": 10108, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }]
            }, {
                "name": "IOM",
                "subMenu": [{ "Name": "3rd Party Analyzer", "Id": 10109, "Icon": "Generic Floor Instrument.png", "ModelName": "Generic Floor Instrument" }, { "Name": "ADVIA 2400A", "Id": 86, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA 2400B", "Id": 10110, "Icon": "ADVIA 2400.png", "ModelName": "ADVIA 2400" }, { "Name": "ADVIA Chemistry XPT1", "Id": 10114, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }, { "Name": "ADVIA Chemistry XPT2", "Id": 10108, "Icon": "ADVIA Chemistry XPT.png", "ModelName": "ADVIA Chemistry XPT" }]
            }]

        this.selectedInstrument = { Name: "", Id: "" };
    }

    ngOnInit() {
    }

    private getInstrumentsByGroup(instruments: any): any {
        let groupedInstruments: Array<any> = [];
        let groupName, instrumentGroup;
        let otherGroup = { Name: "Other", GroupItems: [] };
        this.sortInstrumentsByName(true);
        instruments.forEach(element => {
            if (element.Name.indexOf("/") != -1) {
                groupName = element.Name.split("/")[0];
            } else {
                groupName = element.Name.split(" ")[0];
            }

            if (groupedInstruments.find(instrument => instrument.Name == groupName) != undefined || groupedInstruments.find(instrument => instrument.Name.toUpperCase().indexOf(groupName.toUpperCase().substring(0, 4)) != -1)) {
                instrumentGroup = groupedInstruments.find(instrument => instrument.Name.toUpperCase().indexOf(groupName.toUpperCase().substring(0, 4)) != -1);
                instrumentGroup.GroupItems.push(element);
            } else {
                groupedInstruments.push({ Name: groupName, GroupItems: [element] });
            }
        });
        groupedInstruments.forEach((element, index) => {
            if (element.GroupItems.length == 1) {
                otherGroup.GroupItems.push(element.GroupItems[0]);
                groupedInstruments.splice(index, 1);
            }
        })
        groupedInstruments.push(otherGroup);
        return groupedInstruments;
    }

    private sortInstrumentsByName(isAscending: boolean) {
        this.instruments.subscribe(instruments => {
            instruments.sort(function (instrument1: any, instrument2: any): number {
                var textNameA = instrument1.Name.toUpperCase();
                var textNameB = instrument2.Name.toUpperCase();
                if (isAscending) {
                    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                } else {
                    return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
        });
    }

    public select(item) {
        this.selected = (this.selected === item ? null : item);
    }

    public isActive(item) {
        return this.selected === item;
    }

    public selectInstrument(instrument, index) {
        if (instrument == "reset") {
            this.integrationEquipmentMapsData[index]["EquipmentId"] = null;
        } else {
            this.integrationEquipmentMapsData[index]["EquipmentId"] = instrument.Id;
        }

    }

    public saveIntegrationEquipmentMaps(event: any): void {
        this.integrationDataService.updateIntegrationEquipmentMapsData({ "equipmentIntegrationMap": this.integrationEquipmentMapsData }).then((data) => {
            console.log(data);
        });
    }

    public cancelIntegrationEquipmentMaps(event: any): void {
        this.integrationEquipmentMaps = JSON.parse(JSON.stringify(this.integrationEquipmentMaps_copy));
    }

    public getEquipmentName(Id: number): string {
        let equipmentByName;
        this.instruments.subscribe(instruments => {
            if (instruments && instruments.find(instrument => instrument.Id == Id) != undefined) {
                equipmentByName = instruments.find(instrument => instrument.Id == Id).Name;
            }
        });
        return equipmentByName;
    }

    updateIntegrationEquipmentMapsData(): void {
        this.integrationEquipmentMaps.subscribe(integrationEquipmentMaps => {
            this.integrationEquipmentMapsData = integrationEquipmentMaps;
        });
    }


}
