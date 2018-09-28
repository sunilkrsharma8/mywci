import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef, Injectable, EventEmitter } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

import { IntgrationDataService } from '../../../services/integration.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServicesConstants } from "../../../services/constants.service";
import { TurnaroundtimeComponent } from "../../rulenaturallanguage/turnaroundtime";
import { ExpansionOverviewComponent } from './../../expansion-overview/expansion-overview.component';
import { ManageIntegrationItem } from './../../../models/manage-integration-item';
import { Store } from '@ngrx/store';
import { AppState } from './../../../app.state';
import * as IntegrationActions from './../../../actions/integrations.actions';

@Component({
  selector: 'app-manageintegration',
  templateUrl: './manageintegration.component.html',
  styleUrls: ['./manageintegration.component.css']
})
export class ManageintegrationComponent implements OnInit {
  @ViewChild("ruleTableBody") ruleTableBody: ElementRef;
  @ViewChild("tatComponent") tatComponent: TurnaroundtimeComponent;
  @ViewChild("expansionOverviewComp") expansionOverviewComp: ExpansionOverviewComponent;
  @Output() onAddManageIntegration = new EventEmitter<any>();
  @Output() onDeleteManageIntegration = new EventEmitter<any>();
  @Input() extSystems: Array<any>;
  @Input() parrentComponent: any;
  integrationDataService: IntgrationDataService;
  servicesConstants: ServicesConstants;
  globalSettings: Array<any>;
  isCollapsed: boolean = true;
  isShowDRSettings: boolean = false;
  sortBy: string;
  isSortByNameAsc: boolean = false;
  isSortByTypeAsc: boolean = false;
  isAddRecord:  boolean = true;
  appModuleName: string = 'manageIntegration';

  displayedColumns = [{ headerCol: 'Integration Name', value: 'Name' }, { headerCol: 'Integration Type', value: 'TypeDescription' }];

  constructor(integrationDataService: IntgrationDataService, private store: Store<AppState>) {
    this.integrationDataService = integrationDataService;
  }

  ngAfterViewInit() {
    if(this.expansionOverviewComp && this.expansionOverviewComp.sortedData && this.expansionOverviewComp.sortedData.length === 3){
      this.isAddRecord = true;
    }else{
      this.isAddRecord = false;
    }
  }
  /**
   * Called before initialization
   */
  ngOnInit() {

    this.updateTypeDescription();
    this.sortExtSysByDescriptionName(true);
    this.integrationDataService.getGlobalSettingsData("Integrations").then((data) => {
      this.globalSettings = data;
    });
  }

  public updateTypeDescription() {
    this.extSystems.forEach(element => {
      element["TypeDescription"] = ServicesConstants.EXTERNAL_ALERT_PROVIDER[element.Type];
    });
  }

  public defaultSort(event: any): void {
    this.sortExtSysByName(true);
  }

  public addNewExtSystem(event: any): void {
    this.isAddRecord = true;
    this.expansionOverviewComp.addNewItem(new ManageIntegrationItem());
  }

  public setGlobalDataRouterSettings(event: any): void {
    this.isShowDRSettings = true;
  }

  public onSetGlobalDataRouterSettings(settings: any): void {
    if (settings != "") {
      var setting = settings.find(setting => setting.Name == "DataRouterConfig_IP");
      this.integrationDataService.setGlobalDataRouterSettingsData(setting).then((data, err) => {
      });
      var setting = settings.find(setting => setting.Name == "DataRouterConfig_Port");
      this.integrationDataService.setGlobalDataRouterSettingsData(setting).then((data, err) => {
      });
    }
    this.isShowDRSettings = false;
  }

  public sortExtSystems(column: number): void {
    switch (column) {
      case 0:
        break;
      case 1:
        this.isSortByNameAsc = !this.isSortByNameAsc;
        this.sortExtSysByName(this.isSortByNameAsc);
        break;
      case 2:
        this.isSortByTypeAsc = !this.isSortByTypeAsc;
        this.sortExtSysByDescriptionName(this.isSortByTypeAsc);
        break;
    }
  }

  private sortExtSysByDescriptionName(isAscending: boolean) {
    this.sortBy = "type";
    this.extSystems.sort(function (extsys1: any, extsys2: any): number {
      var textDescriptionA = extsys1.TypeDescription.toUpperCase();
      var textDescriptionB = extsys2.TypeDescription.toUpperCase();
      var textNameA = extsys1.Name.toUpperCase();
      var textNameB = extsys2.Name.toUpperCase();
      if (isAscending) {
        return (textDescriptionA < textDescriptionB) ? -1 : (textDescriptionA > textDescriptionB) ? 1 : 0 || (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textDescriptionA > textDescriptionB) ? -1 : (textDescriptionA < textDescriptionB) ? 1 : 0 || (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });
  }

  private sortExtSysByNameDescription(isAscending: boolean) {
    this.extSystems.sort(function (extsys1: any, extsys2: any): number {
      var textDescriptionA = extsys1.TypeDescription.toUpperCase();
      var textDescriptionB = extsys2.TypeDescription.toUpperCase();
      var textNameA = extsys1.Name.toUpperCase();
      var textNameB = extsys2.Name.toUpperCase();
      if (isAscending) {
        return (textDescriptionA < textDescriptionB) ? -1 : (textDescriptionA > textDescriptionB) ? 1 : 0 || (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textDescriptionA > textDescriptionB) ? -1 : (textDescriptionA < textDescriptionB) ? 1 : 0 || (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });
  }

  private sortExtSysByName(isAscending: boolean) {
    this.sortBy = "name";
    this.expansionOverviewComp.sortedData = this.extSystems.sort(function (extsys1: any, extsys2: any): number {
      var textNameA = extsys1.Name.toUpperCase();
      var textNameB = extsys2.Name.toUpperCase();
      if (isAscending) {
        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });
    this.store.dispatch(new IntegrationActions.ExtSysSort(this.expansionOverviewComp.sortedData));
  }

  addManageIntegrationItem() {
    this.onAddManageIntegration.emit();
  }

  updateManageIntegrationItemArray(): void {
    this.onDeleteManageIntegration.emit();
  }

  saveManageIntegrationItem(extSysData: any): void {
    let extSys = {
      externalSystem: {
        Id: extSysData.Id,
        Version: 0,
        Type: 3,
        Name: extSysData.Name,
        Channel: "\/ws\/centralink\/OUL",
        System: this.expansionOverviewComp.sortedData[0].System,
        Status: 0,
        IsServer: this.expansionOverviewComp.sortedData[0].IsServer,
        Port: this.expansionOverviewComp.sortedData[0].port,
        Address: this.expansionOverviewComp.sortedData[0].Address,
        Connected: this.expansionOverviewComp.sortedData[0].Connected,
        CharacterEncoding: null,
        NavigationUrl: null
      }
    }

    this.integrationDataService.addExtSystems(extSys).then((data) => {
      extSysData.isExpanded = false;
      this.isAddRecord = true;
      data.AddExternalSystemResult["TypeDescription"] = ServicesConstants.EXTERNAL_ALERT_PROVIDER[data.AddExternalSystemResult.Type];
      this.updateTypeDescription();
      this.store.dispatch(new IntegrationActions.AddManageIntegrationItem(data.AddExternalSystemResult));
      let idx = this.expansionOverviewComp.findIndexOfArrayByAttr(this.expansionOverviewComp.sortedData, 'Id', 0);
      this.extSystems.splice(idx, 1);
      this.addManageIntegrationItem();
      this.expansionOverviewComp.matExpansionPanelItemClear();
    });
  }


  deleteManageIntegrationItem(extSysId: any): void {
    this.integrationDataService.deleteExtSystem(extSysId).then((data) => {
      this.isAddRecord = false;
      this.store.dispatch(new IntegrationActions.RemoveManageIntegrationItem(extSysId));
      this.updateManageIntegrationItemArray();
      this.expansionOverviewComp.matExpansionPanelItemClear();
    });
  }

  sortFilter(sort: any, data: any): any {
    this.expansionOverviewComp.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Name': return this.expansionOverviewComp.compare(a.Name, b.Name, isAsc);
        case 'TypeDescription': return this.expansionOverviewComp.compare(+a.TypeDescription, +b.TypeDescription, isAsc);
        default: return 0;
      }
    });
    this.store.dispatch(new IntegrationActions.ExtSysSort(this.expansionOverviewComp.sortedData));
  }

}
