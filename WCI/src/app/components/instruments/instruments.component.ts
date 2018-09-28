import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef, Injectable, EventEmitter } from '@angular/core';
import { CanActivate, CanDeactivate, Route, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, RouterState } from '@angular/router';
import { Observable } from 'rxjs';
import { InstrumentDataService } from './../../services/instrument.data.service';
import { ZoneDataService } from './../../services/zone.data.service';
import { ExpansionOverviewComponent } from './../expansion-overview/expansion-overview.component';
import { InstrumentItem } from './../../models/instrument-item';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as InstrumentsActions from './../../actions/instruments.actions';
import { Zone } from '../../models/zone';
import * as ZonesActions from './../../actions/zones.actions';
import { EquipmentModel } from '../../models/equipment-model';
import * as EquipmentModelsActions from './../../actions/equipment-model.actions';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})
export class InstrumentsComponent implements OnInit {
  @ViewChild("expansionOverviewComp") expansionOverviewComp: ExpansionOverviewComponent;

  instrumentDataService: InstrumentDataService;
  zoneDataService: ZoneDataService;
  allInstruments: Observable<InstrumentItem[]>;
  allInstrumentsSubscribedResult: Array<any>;
  allZones: Observable<Zone[]>;
  allZonesSubscribedResult: Array<any>;
  allEquipmentModels: Observable<EquipmentModel[]>;
  allEquipmentModelsSubscribedResult: Array<any>;
  appModuleName: string = 'instruments';
  sortBy: string;
  isSortByNameAsc: boolean = false;
  displayedColumns = [{ headerCol: 'Name', value: 'Name' }, { headerCol: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Supports  RC', value: 'RemoteControl' }, { headerCol: 'Supports  Inventory', value: 'SupportsInventory' }, { headerCol: 'Disabled', value: 'Disabled' }, { headerCol: 'Zones', value: 'Zones' }];

  constructor(private router: Router, instrumentDataService: InstrumentDataService, zoneDataService: ZoneDataService, private store: Store<AppState>) {
    this.instrumentDataService = instrumentDataService;
    this.zoneDataService = zoneDataService;
    this.allInstruments = store.select('instrumentItem');
    this.allZones = store.select('zone');
    this.allEquipmentModels = store.select('equipmentModel');
    let equipmentmodel;
    this.instrumentDataService.getInstrumentsAllData().then(data => {
      this.store.dispatch(new InstrumentsActions.Empty());

      data.forEach(element => {
        this.store.dispatch(new InstrumentsActions.AddInstrument(element));
      });

      this.allInstruments.subscribe(allInstruments => {
        this.allInstrumentsSubscribedResult = allInstruments;
      });

      this.zoneDataService.getZones().then(zones => {
        this.store.dispatch(new ZonesActions.Empty());
        zones.forEach(element => {
          this.store.dispatch(new ZonesActions.AddZone(element));
        });
        this.allZones.subscribe(allZones => {
          this.allZonesSubscribedResult = allZones;
        });

        this.allInstrumentsSubscribedResult.forEach(instrument => {
          var zones = [];
          this.allZonesSubscribedResult.forEach(zone => {
            var isExistsZone = zone.Equipment.find(equip => {
              return equip.EquipmentId === instrument.Id;
            });
            if (isExistsZone) {
              zones.push(zone);
            }
          });
          instrument['zones'] = zones;
        });

        this.instrumentDataService.getEquipmentModelsData().then(equipmentModels => {
          this.store.dispatch(new EquipmentModelsActions.Empty());
          equipmentModels.forEach(element => {
            this.store.dispatch(new EquipmentModelsActions.AddEquipmentModel(element));
          });
          this.allEquipmentModels.subscribe(allEquipmentModels => {
            this.allEquipmentModelsSubscribedResult = allEquipmentModels;
          });


          this.allInstrumentsSubscribedResult.forEach(equipment => {
            equipmentmodel = this.allEquipmentModelsSubscribedResult.find((equipmodel) => {
              return equipmodel.Id == equipment.EquipmentModelId;
            });
            equipment['equipmentmodel'] = equipmentmodel;
            if (!equipment.RemoteControl) {
              equipment['RemoteControl'] = {};
            }
          });

        });
      });

    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementById(`nav${'SettingsInstruments'}`).setAttribute('active', 'true');
  }

  canDeactivate() {
    var isDeactivate = this.expansionOverviewComp.compareRecordAndSetTargetUrl();
    return isDeactivate;
  }

  public defaultSort(event: any): void {
    this.sortByName(true);
  }

  public addNewInstrument(event: any): void {
    this.expansionOverviewComp.addNewItem(new InstrumentItem());
  }

  private sortByName(isAscending: boolean) {
    this.sortBy = "name";
    this.expansionOverviewComp.sortedData = this.allInstrumentsSubscribedResult.sort(function (record1: any, record2: any): number {
      var textNameA = record1.Name.toUpperCase();
      var textNameB = record2.Name.toUpperCase();
      if (isAscending) {
        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });

    this.store.dispatch(new InstrumentsActions.dataSort(this.expansionOverviewComp.sortedData));
  }

  public isNewDisabled(): boolean {
    var newLyAddedItem;
    if (this.expansionOverviewComp && this.expansionOverviewComp.sortedData) {
      newLyAddedItem = this.expansionOverviewComp.sortedData.find(newItem => {
        return newItem.Id === 0;
      });
    }

    return newLyAddedItem ? true : false;

  }

  public sortFilter(sort: any, data: any): any {
    this.expansionOverviewComp.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Name': return this.expansionOverviewComp.compare(a.Name, b.Name, isAsc);
        case 'RemoteControl': return this.expansionOverviewComp.compare(a.RemoteControl, b.RemoteControl, isAsc);
        case 'SupportsInventory': return this.expansionOverviewComp.compare(a.SupportsInventory, b.SupportsInventory, isAsc);
        case 'Disabled': return this.expansionOverviewComp.compare(a.Disabled, b.Disabled, isAsc);
        case 'Zones': return this.expansionOverviewComp.compare(a.Zones, b.Zones, isAsc);
        default: return 0;
      }
    });

    this.store.dispatch(new InstrumentsActions.dataSort(this.expansionOverviewComp.sortedData));
  }

  public saveInstrumentItem(InstrumentData: any): void {

    if (InstrumentData.Id == 0) {
      this.instrumentDataService.addEquipments(InstrumentData).then(data => {
        InstrumentData.isFieldDisabled = false;
        InstrumentData.isExpanded = false;
        this.allInstruments.subscribe(allInstruments => {
          this.allInstrumentsSubscribedResult = allInstruments;
          this.expansionOverviewComp.matExpansionPanelItemClear();
        });

      });
    } else {
      this.instrumentDataService.updateEquipments(InstrumentData).then(data => {
        InstrumentData.isFieldDisabled = false;
        InstrumentData.isExpanded = false;
        this.allInstruments.subscribe(allInstruments => {
          this.allInstrumentsSubscribedResult = allInstruments;
          this.expansionOverviewComp.matExpansionPanelItemClear();
        });
      });
    }
  }

  public deleteInstumentItem(InstrumentData: any): void {
    let _this3 = this;
    this.instrumentDataService.deleteEquipment(InstrumentData.Id).then(data => {
      let idx = _this3.expansionOverviewComp.findIndexOfArrayByAttr(_this3.expansionOverviewComp.sortedData, 'Id', InstrumentData.Id);
      _this3.expansionOverviewComp.sortedData.splice(idx, 1);
      this.allInstruments.subscribe(allInstruments => {
        this.allInstrumentsSubscribedResult = allInstruments;
        this.expansionOverviewComp.matExpansionPanelItemClear();
      });
    });
  }

}

