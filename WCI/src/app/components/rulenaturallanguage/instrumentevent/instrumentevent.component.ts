import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { ServicesConstants } from "../../../services/constants.service";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-instrumentevent',
  templateUrl: './instrumentevent.component.html',
  styleUrls: ['./instrumentevent.component.css']
})
export class InstrumenteventComponent implements OnInit {
  @Output() onRuleChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  instrumentText: string = "All Current and Future Instruments";//"unspecified instrument(s)"; //
  deviceEventText: string;//"unspecified event(s)";
  alertSeverityText: string;
  isShowAssetModal: boolean = false;
  isShowSeverityModal: boolean = false;
  isShowEventModal: boolean = false;
  updatedRuleData: any;
  instruments: Array<any> = [];
  deviceEvents: Array<any> = [];
  alertSeverity: number;
  allInstruments: any;
  allDeviceEvents: any = [{Id: "E001", Name: "E001"},{Id: "E002", Name: "E002"}, {Id: "E003", Name: "E003"},{Id: "E004", Name: "E004"}];
  severityList: any;
  @Input() ruleData;
  ruleDataService: RuleDataService;
  isRuleChanged: boolean = false;
  isShowAlertBox: boolean = false;
  
  constructor(ruleDataService: RuleDataService) { 
    this.ruleDataService = ruleDataService;
    this.severityList =  ServicesConstants.ALERT_SEVERITY;
    
  }

  ngOnInit() {
    this.getInstruments().then((data)=>{
      this.allInstruments = data;
    });
  }

  ngOnChanges(){
    this.updatedRuleData = Object.assign({}, this.ruleData);
    this.refreshRuleData();
  }

  private getInstruments(){
        let equipments, equipmentModels;
        let instruments = [];
        var promise = new Promise((resolve) =>{
          this.ruleDataService.getEquipmentsData().then((data)=>{
            equipments = data;
            this.ruleDataService.getEquipmentModelsData().then((data1)=>{
              equipmentModels = data1;
              equipments.forEach(equipment => {
                equipmentModels.forEach(equipmentmodel => {
                  if(equipment.EquipmentModelId == equipmentmodel.Id && (equipmentmodel.Type == 1)){
                    instruments.push(equipment);
                  }
                });
              });
              resolve(instruments);
            });
          });
        })
        return promise;
    }

  private refreshRuleData(): void{
    if(this.ruleData){
      if(!this.isNewRule){
        if(this.ruleData.hasOwnProperty("Instruments")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(this.ruleData["Instruments"].length > 0){
            this.instrumentText = "";
            this.ruleData["Instruments"].forEach(element =>{
              this.getInstrumentName(element).then((data)=>{
                this.instrumentText += data + ", "; 
              });
            });
            this.instrumentText = this.instrumentText.slice(1);
          }else{
            this.instrumentText = "All Current and Future Instruments";
          }
        }
        if(this.ruleData.hasOwnProperty("EventCodes")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(this.ruleData["EventCodes"].length > 0){
            this.deviceEventText = "";
            <Array<string>>this.ruleData["EventCodes"].forEach(element =>{
              this.deviceEventText += ", " + "Device event ["+ element + "]"; 
            });
            this.deviceEventText = this.deviceEventText.slice(1);
          }
        }
        if(this.ruleData.hasOwnProperty("Severity")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(ServicesConstants.ALERT_SEVERITY.hasOwnProperty(this.ruleData["Severity"])){
            this.alertSeverityText = ServicesConstants.ALERT_SEVERITY[this.ruleData["Severity"]];
          }
        }
      }else{
        this.instruments = [-1];
        this.deviceEvents = [-1];
        this.instrumentText = "unspecified instrument(s)";
        this.deviceEventText = "unspecified event(s)";
      }
    }
  }

  private getInstrumentName(instrumentId: number){
    var promise = new Promise((resolve) =>{
      this.ruleDataService.getEquipmentsData().then((data)=>{
        data.forEach(element => {
          if(element.Id == instrumentId){
            resolve(element.Name);
          }
        });
      });
    });
    return promise;
  }

  public naturalLanguageTextConfigurator(handle: any){
    if(handle == "instrument"){
      this.isShowAssetModal = true;
    }else if(handle == "deviceevent"){
      this.isShowEventModal = true;
    }else if(handle == "alertseverity"){
      this.isShowSeverityModal =  true;
    }
    
  }

  public onSharedRuleParamsChange(escalationDetails: any): void{
    this.updatedRuleData["NotificationEmails"] = escalationDetails.NotificationEmails;
    this.updatedRuleData["EscalationEmails"] = escalationDetails.EscalationEmails;
    this.updatedRuleData["EmailOnEscalationResolution"] = escalationDetails.EmailOnEscalationResolution;
    this.updatedRuleData["AckThreshold"] = HelperFunctions.trasformSeondstoISO8601(escalationDetails.AckThreshold);
    this.updatedRuleData["ResolveThreshold"] = HelperFunctions.trasformSeondstoISO8601(escalationDetails.ResolveThreshold);
    this.updatedRuleData["Name"] = escalationDetails.Name;
    this.updatedRuleData["Enabled"] = escalationDetails.Enabled;
    this.isRuleChanged = true;
    this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  }

  public updateInstruments(selectedinstruments: any){
    this.instruments = [];
    if(selectedinstruments.length > 0){
      this.instrumentText = "";
      selectedinstruments.forEach(element =>{
        this.instrumentText += ", " + element.Name; 
        this.instruments.push(element.Id);
      });
      this.instrumentText = this.instrumentText.slice(1);
    }else{
      this.instrumentText = "All Current and Future Instruments";
    }
    this.isShowAssetModal = false;
    this.updatedRuleData["Instruments"] = this.instruments;
    this.isRuleChanged = true;
    this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  }

  public updateEvents(selectedevents: any){
    this.deviceEvents = [];
    if(selectedevents.length > 0){
      this.deviceEventText = "";
      selectedevents.forEach(element =>{
        this.deviceEventText += ", " + "Device event [" +element.Name +"}"; 
        this.deviceEvents.push(element.Id);
      });
      this.deviceEventText = this.deviceEventText.slice(1);
    }else{
      this.deviceEventText = "unspecified event(s)";
    }
    this.isShowEventModal = false;
    this.updatedRuleData["EventCodes"] = this.deviceEvents;
    this.isRuleChanged = true;
    this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  }

  public updateSeverity(severity: any){
    this.updatedRuleData["EventCodes"] = severity;
    this.alertSeverityText =  ServicesConstants.ALERT_SEVERITY[severity];
    this.isShowSeverityModal = false;
    this.isRuleChanged = true;
    this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  }

  public cancelRule(ruleData: any): void{
    this.ruleData = ruleData;
    this.refreshRuleData();
    this.isRuleChanged = false;
    this.onRuleChange.emit({isModified: false, Name:"Instrument Event Alert Rule"});
    this.srpComponent.cancelRule(ruleData);
  }

  public getUpdatedRuleData(): any{
    this.isRuleChanged = false;
    this.onRuleChange.emit({isModified: false, Name:"Instrument Event Alert Rule"});
    return this.updatedRuleData;
  }

  public discardChanges(event: any): void{
    this.cancelRule(this.ruleData);
    this.isShowAlertBox = false;
  }

  public cancelEvent(event: any): void{
    this.isShowAlertBox = false;
  }

  public handleFocusOut(event){
    if(this.isRuleChanged){
      this.isShowAlertBox = true;
    }
  }
}
