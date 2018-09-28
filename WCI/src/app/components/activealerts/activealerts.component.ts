import { Component, OnInit,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AlertDataService } from '../../services/alert.data.service';
import { InstrumentDataService } from  '../../services/instrument.data.service'
import { Router } from "@angular/router";
import { ServicesConstants } from "../../services/constants.service";
import { HelperFunctions } from "../../services/helper.functions";
import { Alert } from "../../models/alert";
import { Zone } from "../../models/zone";
import { Note } from "../../models/note";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as ResolvedAlertActions from './../../actions/resolvedalerts.actions';
import * as UnResolvedAlertActions from './../../actions/activealerts.actions';
import { DashboardBroadcastService } from './../../services/dashboard.data.broadcast.service';

@Component({
  selector: 'app-activealerts',
  templateUrl: './activealerts.component.html',
  styleUrls: ['./activealerts.component.css']
})
export class ActivealertsComponent implements AfterViewInit {
  @ViewChild("alertCtrl") alertCtrl: ElementRef;
  alertDataService: AlertDataService;
  dashboardBroadcastService:DashboardBroadcastService;
  instrumentDataService: InstrumentDataService;
  instrumentData: any;
  selectedAlert: Alert;
  notes: Note[];
  unresolvedAlertData: Observable<Alert[]>;
  recentlyresolvedAlertData: Observable<Alert[]>;
  noteTemplate: any;
  selectedNote: any;
  isSortAscending: boolean = false;
  selectedZone: Zone;

  constructor(alertDataService: AlertDataService, instrumentDataService: InstrumentDataService, private router: Router, private store1: Store<AppState>, private store2: Store<AppState>, dashboardBroadcastService: DashboardBroadcastService) {
    this.selectedAlert = new Alert();
    this.alertDataService = alertDataService;
    this.dashboardBroadcastService = dashboardBroadcastService;
    this.instrumentDataService =  instrumentDataService;
    this.unresolvedAlertData = store1.select('unresolvedalert');
    this.recentlyresolvedAlertData = store2.select('resolvedalert');

    this.instrumentDataService.getEquipmentsData().then((data)=>{
      this.instrumentData = data;
    })

    this.alertDataService.getNoteTemplate().then((data)=>{
      this.noteTemplate = data;
    });

    this.alertDataService.getUnresolvedAlerts().then((data)=>{
      this.dashboardBroadcastService.ZoneSubject.subscribe(zone =>{
        this.selectedAlert = new Alert();
        this.store1.dispatch(new UnResolvedAlertActions.Empty());
        data.forEach(element => {
          if(zone.Equipment.find(eq => eq.EquipmentId == element.EquipmentId)){
            this.store1.dispatch(new UnResolvedAlertActions.AddAlert(element));
          }
        });
      });
    });
    this.alertDataService.getRecentlyResolvedAlerts().then((data)=>{
      this.dashboardBroadcastService.ZoneSubject.subscribe(zone =>{
        this.store2.dispatch(new ResolvedAlertActions.Empty());
        data.forEach(element => {
          if(zone.Equipment.find(eq => eq.EquipmentId == element.EquipmentId)){
            this.store2.dispatch(new ResolvedAlertActions.AddAlert(element));
          }
        });
      });
    })   
  }

  ngAfterViewInit() {
  }

  public isAlertNew(occuredTime: string): boolean{
    return true;
  }

  public getInstrumentName(id: number): string{
    if(this.instrumentData){
      return this.instrumentData.find(intrument => intrument.Id == id).Name;
    }else{
      return "";
    }
  }

  public defaultSort(event: any): void{
    let thisComponent = this;
    this.unresolvedAlertData.subscribe(alert => {
      alert.sort(function(alert1: Alert, alert2: Alert): number {
        var textA = thisComponent.getInstrumentName(alert1["EquipmentId"]).toUpperCase();
        var textB = thisComponent.getInstrumentName(alert2["EquipmentId"]).toUpperCase();
        
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    });
  }

  public selectNote(note: string): void{
    this.selectedNote = note;
  }

  public getNoteText(note: any): string{
    return note.Text + " (" + note.Code + ")";
  }
  public addNote(event): void{
    this.alertDataService.addNote(this.selectedAlert.Id, this.selectedNote.Text).then((data) =>{
      if(data != {}){
      this.selectedAlert = data["AddAlertNoteResult"];
      this.store1.dispatch(new UnResolvedAlertActions.UpdateAlert(this.selectedAlert));
      }
   });
  }

  public acknowledgeAlert(id: number): void{

  }

  public redirectToAutoFilter(): void{
    var tabs = document.getElementsByTagName("sh-tab-item");
    for(var i = 0; i < tabs.length; i++) {
      tabs[i].removeAttribute("active");
    }
    this.router.navigateByUrl('/(main:settings/(settings:rules/(rules:auto-filter)))');
  }

  public getStatusText(status): string{
    return ServicesConstants.ALERT_STATUS[status];
  }

  public getDateTime(timestamp: string): string{
    let options = {hour: "numeric", minute: "numeric"};
    return HelperFunctions.transformTimestamptoDate(timestamp).toLocaleDateString() +" "+ HelperFunctions.transformTimestamptoDate(timestamp).toLocaleTimeString(navigator.language,options);
  }

  public getElapsedTime(occuredTime: string, resolvedTime?: string): string{
    let currentDateTime: Date;
    let occuredDateTime: Date = HelperFunctions.transformTimestamptoDate(occuredTime);
    if(resolvedTime){
      currentDateTime = HelperFunctions.transformTimestamptoDate(resolvedTime);
    }else{
      currentDateTime = new Date();
    }

    let elapsedinMS = currentDateTime.getTime() - occuredDateTime.getTime();
    let days = Math.floor(elapsedinMS / (1000 * 60 * 60 * 24));
    elapsedinMS -= days* 24 * 60 * 60 * 1000;
    let hours = Math.floor(elapsedinMS / 1000 / 60 / 60);
    elapsedinMS -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(elapsedinMS / 1000 / 60);
    elapsedinMS -= minutes * 1000 * 60;

    let strElapsedTime: string = "";

    if(days != 0){
      strElapsedTime = days + "d : ";
    }

    if(hours != 0){
      strElapsedTime += hours+ "h : ";
    }

    if(minutes != 0){
      strElapsedTime += minutes + "m"; 
    }else{
      strElapsedTime = "< 1 Minute";
    }


    return strElapsedTime;
  }

  public selectAlert(alert: any): void{
    this.selectedAlert = alert;
  }


  public sortAlerts(column: string): void{
    this.isSortAscending = !this.isSortAscending;
    let thisComponent = this;
    switch(column){
      case "new": 
        break;
      case "EquipmentName":
        this.unresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = thisComponent.getInstrumentName(alert1["EquipmentId"]).toUpperCase();
            var textB = thisComponent.getInstrumentName(alert2["EquipmentId"]).toUpperCase();
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
      case "ElapsedTime":
      case "Time":
        this.unresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = alert1["Time"]
            var textB = alert2["Time"]
            
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
      default:
        this.unresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = alert1[column];
            var textB = alert2[column];
            
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
    }
  }

  public sortResolvedAlerts(column: string): void{
    this.isSortAscending = !this.isSortAscending;
    let thisComponent = this;
    switch(column){
      case "EquipmentName":
        this.recentlyresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = thisComponent.getInstrumentName(alert1["EquipmentId"]).toUpperCase();
            var textB = thisComponent.getInstrumentName(alert2["EquipmentId"]).toUpperCase();
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
      case "ElapsedTime":
        this.recentlyresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = HelperFunctions.transformTimestamptoDate(alert1["Time"]).getTime() - HelperFunctions.transformTimestamptoDate(alert1["ResolvedTime"]).getTime();
            var textB = HelperFunctions.transformTimestamptoDate(alert2["Time"]).getTime() - HelperFunctions.transformTimestamptoDate(alert2["ResolvedTime"]).getTime();
            
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
      default:
        this.recentlyresolvedAlertData.subscribe(alert => {
          alert.sort(function(alert1: Alert, alert2: Alert): number {
            var textA = alert1[column];
            var textB = alert2[column];
            
            if(thisComponent.isSortAscending){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            }else{
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        });
        break;
    }
  }
}
