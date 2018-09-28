import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { ServicesConstants } from "../../../services/constants.service";
import { RuleDataService } from '../../../services/rule.data.service';

const dayInstance = {
      1 : "First",
      2: "Second",
      3: "Third",
      4: "Fourth",
      5: "Last"
    };

const daysofWeekMask = {
      2: "Monday",
      4: "Tuesday",
      8: "Wednesday",
      16: "Thursday",
      32: "Friday",
      64: "Saturday",
      1: "Sunday"
    };

const monthofYear = {
      1:"January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
};

@Component({
  selector: 'app-userdefined',
  templateUrl: './userdefined.component.html',
  styleUrls: ['./userdefined.component.css']
})
export class UserdefinedComponent implements OnInit {
 @Output() onRuleChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  instrumentText: string = "All Current and Future Instruments";
  alertSeverityText: string;
  alertTimeText: string;
  messageText: string;
  recurrencePatternText: string;
  isShowAssetModal: boolean = false;
  isShowSeverityModal: boolean = false;
  isShowEventModal: boolean = false;
  isShowDatePickerModal: boolean = false;
  isShowTextMessageModal: boolean = false;
  isShowRecurrencePatternModal: boolean = false;
  updatedRuleData: any;
  instruments: Array<any> = [];
  deviceEvents: Array<any> = [];
  alertSeverity: number;
  alertTime: Date;
  alertTimeinMS: number;
  message: string;
  allInstruments: any;
  allDeviceEvents: any = ["E001","E002","E003","E004"];
  severityList: any;
  @Input() ruleData;
  ruleDataService: RuleDataService;
  isRuleChanged: boolean = false;
  isShowAlertBox: boolean = false;
  recurrencePattern: any;
  
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
    this.updatedRuleData = JSON.parse(JSON.stringify(this.ruleData));
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
        if(this.ruleData.hasOwnProperty("Recurrence")){
          if(this.ruleData["Recurrence"].hasOwnProperty("BaseTime")){
            this.constructAlertTimeText(this.ruleData["Recurrence"]["BaseTime"]);
          }
        }
        if(this.ruleData.hasOwnProperty("Description")){
          this.messageText = this.ruleData["Description"];
        }
        if(this.ruleData.hasOwnProperty("Severity")){
          if(ServicesConstants.ALERT_SEVERITY.hasOwnProperty(this.ruleData["Severity"])){
            this.alertSeverityText = ServicesConstants.ALERT_SEVERITY[this.ruleData["Severity"]];
          }
        }
        if(this.ruleData.hasOwnProperty("Recurrence")){
          this.recurrencePattern = this.ruleData["Recurrence"];
          this.recurrencePatternText = "Something";
          this.constructReoccurencetext();
        }
      }else{
        this.instruments = [-1];
        this.alertTimeinMS  = -1;
        this.message = "";
        this.instrumentText = "unspecified instrument(s)";
        this.alertTimeText = "unspecified date/time";
        this.messageText = "unspecified message.";
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
    }else if(handle == "alertseverity"){
      this.isShowSeverityModal =  true;
    }else if(handle == "alerttime"){
      this.isShowDatePickerModal = true;
    }else if(handle == "message"){
      this.isShowTextMessageModal = true;
    }else if(handle == "recurrencepattern"){
      this.isShowRecurrencePatternModal = true;
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
  
  public updateSeverity(severity): void{
    this.alertSeverityText = ServicesConstants.ALERT_SEVERITY[severity];
    this.updatedRuleData["Severity"] = severity;
    this.isShowSeverityModal = false;
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

  public setAlertDateTime(alertdatetime: any):void{
    var padDigits = function padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join("0") + number;
    }
    var time = alertdatetime.time.split(":");
    var alertdate  = new Date(alertdatetime.date.year, alertdatetime.date.month - 1, alertdatetime.date.day, parseInt(time[0]),parseInt(time[1]), 0, 0);
    var alertdateinMS = alertdate.getTime();
    var offset = alertdate.getTimezoneOffset() * 60 * 1000;
    
    alertdateinMS = alertdateinMS + offset;
    this.alertTimeinMS = alertdateinMS;
    var offsetHours = alertdate.getTimezoneOffset()/60;
    var offsetMinutes = alertdate.getTimezoneOffset()%60;
    var strOffset;
    if (offsetHours < 0)
      strOffset = "+" + padDigits(offsetHours.toString().replace("-",""),2) + padDigits(offsetMinutes, 2);
    else if (offsetHours > 0) 
      strOffset = "-" + padDigits(offsetHours, 2) + padDigits(offsetMinutes, 2);

    this.updatedRuleData["AlertTime"] = "/Date(" + alertdateinMS + "-0700)/";
    this.updatedRuleData["Recurrence"]["BaseTime"] = "/Date(" + alertdateinMS + "-0700)/";
    this.constructAlertTimeText(this.updatedRuleData["AlertTime"]);
    this.isShowDatePickerModal = false;
  }

  public setTextMessage(message: string): void{
    this.messageText = message;
    this.message = message;
    this.updatedRuleData["Description"] = message;
    this.isShowTextMessageModal = false;
  }

  public setRecurrencePattern(recurrencePattern: any): void{
    this.recurrencePattern = recurrencePattern;
    this.updatedRuleData["Recurrence"] = recurrencePattern;
    this.isShowRecurrencePatternModal = false;
    this.constructReoccurencetext();
  }

  private constructReoccurencetext(): void{
    switch(this.recurrencePattern["RecurrenceType"]){
      case 0:
        this.recurrencePatternText = "Once";
        break;
      case 1:
        this.recurrencePatternText = "Hourly: Every " + this.recurrencePattern["Interval"] + " hour(s)";
       break;
      case 2: 
        this.recurrencePatternText = "Daily: Every " + this.recurrencePattern["Interval"] + " day(s)";
        break;
      case 3:
        var days = [];
        var daysConcatenatedString = "";
        var dowm = this.recurrencePattern["DaysOfWeekMask"];
        while(dowm != 0){
          if(dowm >= 64){
            days.push("Sa");
            dowm = dowm - 64;
          }else if(dowm >= 32){
            days.push("Fr");
            dowm - dowm - 32;
          }else if(dowm >= 16){
            days.push("Th");
            dowm = dowm - 16;
          }else if(dowm >= 8){
            days.push("We");
            dowm = dowm - 8;
          }else if(dowm >= 4){
            days.push("Tu");
            dowm = dowm - 4;
          }else if(dowm >= 2){
            days.push("Mo");
            dowm = dowm - 2;
          }else if(dowm >= 1){
            days.push("Su");
            dowm = dowm - 1;
          }
        }
        days.reverse();
        days.forEach(element => {
          daysConcatenatedString = daysConcatenatedString + " " + element +","
        });
        daysConcatenatedString = daysConcatenatedString.slice(0, -1);
        this.recurrencePatternText = "Weekly: Every " + this.recurrencePattern["DayOfMonth"] + " week(s), On day(s): "+ daysConcatenatedString +"."
        break;
      case 4:
        this.recurrencePatternText = "Monthly: Every " + this.recurrencePattern["Interval"] + " month(s), On day " + this.recurrencePattern["DayOfMonth"] +" of the month."
        break;
      case 5:
        this.recurrencePatternText = "Yearly: Every "+ monthofYear[this.recurrencePattern["MonthOfYear"]] +" "+ this.recurrencePattern["DayOfMonth"];
        break;
      case 6:
        break;
      case 7:
        this.recurrencePatternText = "Monthly: On the " + dayInstance[this.recurrencePattern["Instance"]] + " " + daysofWeekMask[this.recurrencePattern["DaysOfWeekMask"]] + " of every " + this.recurrencePattern["Interval"] +" month."
        break;
      case 8:
        this.recurrencePatternText = "Yearly: On the " + dayInstance[this.recurrencePattern["Instance"]] + " " + daysofWeekMask[this.recurrencePattern["DaysOfWeekMask"]] + " of " + monthofYear[this.recurrencePattern["MonthOfYear"]];
        break;
    }
  }

  private constructAlertTimeText(alertTime: any): void{
    var strAlertTime = alertTime;
    if(strAlertTime.indexOf("-") != -1){
      var alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("-") - strAlertTime.indexOf("(") - 1); 
      var offset = strAlertTime.substr(strAlertTime.indexOf("-") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("-") - 1); 
      alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0,2))*60*60*1000 + parseInt(offset.substr(2,2))*60*1000;
    }else if(strAlertTime.indexOf("+") != -1){
      var alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("+") - strAlertTime.indexOf("(") - 1);
      var offset = strAlertTime.substr(strAlertTime.indexOf("+") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("+") - 1);
      alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0,2))*60*60*1000 + parseInt(offset.substr(2,2))*60*1000;
    }
    this.alertTime = new Date(parseInt(alertimeinMilliSec));
    this.alertTimeText = this.alertTime.toLocaleString();
  }
}
