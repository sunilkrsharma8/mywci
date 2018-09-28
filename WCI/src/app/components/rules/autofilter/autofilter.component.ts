import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef } from '@angular/core';
import { RuleDataService } from '../../../services/rule.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServicesConstants } from "../../../services/constants.service";
import { TurnaroundtimeComponent } from "../../rulenaturallanguage/turnaroundtime";

import { Store } from '@ngrx/store';
import { AutoFilterEvent } from './../../../models/autofilterevent';
import { AppState } from './../../../app.state';
import * as AutoFilterActions from './../../../actions/autofilterevents.actions';

@Component({
  selector: 'app-autofilter',
  templateUrl: './autofilter.component.html',
  styleUrls: ['./autofilter.component.css']
})
export class AutofilterComponent implements OnInit {
  ruleDataService: RuleDataService;
  eventsData: any;
  result: any;
  sortBy: string;
  isSortByShowHideAsc: boolean = false;
  isSortByNameAsc: boolean = false;
  isSortByTypeAsc: boolean = false;
  isSortByEventCodeAsc: boolean = false;
  isSortByMessageAsc: boolean = false;
  isSortByActiveAlertsAsc: boolean = false;
  activeAlerts: AutoFilterEvent[] = [];
  isSelectNewDisabled: boolean = true;
  isHideSelectedDisabled: boolean = true;
  isShowSelectedDisabled: boolean = true;
  currentEventsData: any;
  currentEventIndex: number;
  currentEvent: any;
  isShowInformationBoxModal: boolean = false;
  showCross: boolean = false;
  showTick: boolean = false;
  modalType: string;
  eventsAllData: Observable<AutoFilterEvent[]>;
  isNewAlert: boolean = false;
  newAlerts: boolean = false;

  constructor(ruleDataService: RuleDataService, private store: Store<AppState>) {
    this.ruleDataService = ruleDataService;
    this.eventsAllData = store.select('autofilterevents');
  }

  ngOnInit() {
    this.getEventData();
    this.eventsAllData.subscribe(events => {
      events.forEach(element => {
        element["FilterState"] == -1 ? this.activeAlerts.push(element) : null;
      });
    });

    this.activeAlerts.length > 0 ? this.isSelectNewDisabled = false : this.isSelectNewDisabled = true;

    document.getElementById('navSettingsRules').setAttribute('active','true');
    document.getElementById('navSettingsRulesAutoFilter').setAttribute('active','true');
  }


  public getEventData(): any {
    this.ruleDataService.getAutoFilterEventData().then((data1) => {
      this.store.dispatch(new AutoFilterActions.Empty());
      this.currentEvent = {};
      this.ruleDataService.getEquipmentModelsData().then((data2) => {
        this.getDisplayName(data1, data2);
        this.store.dispatch(new AutoFilterActions.SortEventByName(true));
      });
    });

  }

  public eventSelect(event: any, eventdata: any, index: any) {
    this.currentEventIndex = index;
    this.currentEventsData = eventdata;

    if (eventdata != null || eventdata != undefined) {
      this.currentEvent = eventdata.Id;
    }
    if (this.currentEventsData != null || this.currentEventsData != undefined) {
      this.isHideSelectedDisabled = false;
      this.isShowSelectedDisabled = false;
    } else {
      //    this.isTurnAroundTime = true;
    }

  }

  public hideSelected(event: any): void {
    let data = this.currentEventsData;
    this.eventsAllData.subscribe(events => {
      events[this.currentEventIndex].FilterState = 0;
    });
    this.saveEvent(data, this.currentEventIndex, data.FilterState);
  }

  public showSelected(event: any): void {
    let data = this.currentEventsData;
    this.eventsAllData.subscribe(events => {
      events[this.currentEventIndex].FilterState = 1;
    });
    this.saveEvent(data, this.currentEventIndex, data.FilterState);
  }

  public resolveAlerts(event: any): void {
    this.activeAlerts = [];
    this.eventsAllData.subscribe(events => {
      events.forEach(element => {
        element["FilterState"] == -1 ? this.activeAlerts.push(element) : null;
        //this.store.dispatch(new AlertRuleActions.UpdateRuleDescription(element));
      });
    });

    this.activeAlerts.length > 0 ? this.modalType = "resolveActiveAlerts" : this.modalType = "noAlertsToResolve";
    // this.modalType = "resolveActiveAlerts";
    this.isShowInformationBoxModal = true;
  }

  public getDisplayName(eventsData: any, equipmentModelData: any) {
    eventsData.forEach(element => {
      let index: number = 0;
      this.result = equipmentModelData.find(x => x.Id == element.EquipmentModelId).DisplayName;
      if (this.result !== void 0) {
        element["DisplayName"] = this.result;
        this.store.dispatch(new AutoFilterActions.AddEvent(element));
      }
    });
  }

  public defaultSort(event: any): void {
    this.store.dispatch(new AutoFilterActions.SortEventByName(true));
  }

  public sortEvents(column: number): void {
    switch (column) {
      case 0:
        this.isSortByActiveAlertsAsc = !this.isSortByActiveAlertsAsc;
        this.sortBy = "*";
        this.store.dispatch(new AutoFilterActions.SortByActive(this.isSortByActiveAlertsAsc));
        break;
      case 1:
        this.isSortByShowHideAsc = !this.isSortByShowHideAsc;
        this.sortBy = "show";
        this.store.dispatch(new AutoFilterActions.SortByShowHide(this.isSortByShowHideAsc));
        break;
      case 2:
        this.isSortByNameAsc = !this.isSortByNameAsc;
        this.sortBy = "name";
        this.store.dispatch(new AutoFilterActions.SortEventByName(this.isSortByNameAsc));
        break;
      case 3:
        this.isSortByEventCodeAsc = !this.isSortByEventCodeAsc;
        this.sortBy = "EventCode";
        this.store.dispatch(new AutoFilterActions.SortByEventCode(this.isSortByEventCodeAsc));
        break;
      case 4:
        this.isSortByTypeAsc = !this.isSortByTypeAsc;
        this.sortBy = "Type";
        this.store.dispatch(new AutoFilterActions.SortByType(this.isSortByTypeAsc));
        break;
      case 5:
        this.isSortByMessageAsc = !this.isSortByMessageAsc;
        this.sortBy = "Message";
        this.store.dispatch(new AutoFilterActions.SortEventByMessage(this.isSortByMessageAsc));
        break;
    }
  }

  public saveEvent(eventdata: any, index: number, filterState: any): void {
    var updateEvent: any;
    this.currentEventIndex = index;
    updateEvent = Object.assign({}, eventdata);
    delete updateEvent["DisplayName"];
    console.log("FILTER STATE" + updateEvent["FilterState"]);
    updateEvent["FilterState"] = filterState ? 1 : 0;
    //  console.log(updateEvent);

    if (updateEvent != null) {
      updateEvent = { "evt": updateEvent };
      this.ruleDataService.setEventData(updateEvent).then((data, err) => {
        /*   eventdata["Code"] = data.UpdateInstrumentEventResult.Code;
      eventdata["Id"] = data.UpdateInstrumentEventResult.Id;
      eventdata["Version"] = data.UpdateInstrumentEventResult.Version;
      eventdata["EquipmentModelId"] = data.UpdateInstrumentEventResult.EquipmentModelId;
      eventdata["Message"] = data.UpdateInstrumentEventResult.Message;
      eventdata["Severity"] = data.UpdateInstrumentEventResult.Severity;
      eventdata["FilterState"] = data.UpdateInstrumentEventResult.FilterState;*/
        this.store.dispatch(new AutoFilterActions.UpdateEvent(data));
      });
    }
  }

  public selectNew(event: any): void {
    // let activeAlerts: AutoFilterEvent[];
    this.activeAlerts = this.eventsData.filter(element => element.FilterState == -1);
    this.newAlerts = true;
  }

  //Hide Selected
  private crossClicked(evt: any, index: number, data: any) {
    data.FilterState = data.FilterState ? false : true;
    this.saveEvent(data, index, data.FilterState);
  }

  //Show selected
  private tickClicked(evt: any, index: number, data: any) {
    data.FilterState = data.FilterState ? false : true;
    this.saveEvent(data, index, data.FilterState);
  }

  private closeModal() {
    this.isShowInformationBoxModal = false;
  }

  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

}
