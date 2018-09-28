import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { ServicesConstants } from "../../../services/constants.service";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-turnaroundtime',
  templateUrl: './turnaroundtime.component.html',
  styleUrls: ['./turnaroundtime.component.css']
})
export class TurnaroundtimeComponent implements OnInit {
  @Output() onRuleChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() isNewRule: boolean;
  titleText: string = "unspecified title";
  enabledText: string = "Enabled";
  testText: string;
  locationText: string;
  zonesText: string;
  atRiskDurationText: string; 
  overDueDurationText: string;
  priorityMaskText: string;
  isShowTitleModal: boolean = false;
  isShowEnableModal: boolean = false;
  isShowTestModal: boolean = false;
  isShowLocationModal: boolean = false;
  isShowZoneModal: boolean = false;
  isShowDurationModal: boolean = false;
  updatedRuleData: any;
  tests: Array<any> = [];
  locations: Array<any> = [];
  zones:  Array<any> = [];
  atRiskDuration: number;
  overdueDuration: number;
  priorityMask: number;
  ruleEnabled: boolean;
  allInstruments: any;
  allTests: Array<any>;
  allLocations: Array<any>;
  allZones: Array<any>;
  @Input() ruleData;
  ruleDataService: RuleDataService;
  isRuleChanged: boolean = false;
  isShowAlertBox: boolean = false;
  durationConfiguratorTitle: string;
  
  constructor(ruleDataService: RuleDataService) { 
    this.ruleDataService = ruleDataService;
  }

  ngOnInit() {
    this.ruleDataService.getSampleTests().then((data)=>{
      this.allTests = data;
      this.allTests.sort(this.sortByNameAscending);
    });

    this.ruleDataService.getZones().then((data)=>{
      this.allZones = data;
      //this.allZones.sort(this.sortByNameAscending);
    });

    this.ruleDataService.getPatientLocations().then((data)=>{
      this.allLocations = data;
      this.allLocations.forEach(element => {
        element.Name = element.Details +" (" + element.Name +")";
      });
      this.allLocations.sort(this.sortByNameAscending);
    });
  }

  ngOnChanges(){
    this.updatedRuleData = Object.assign({}, this.ruleData);
    this.refreshRuleData();
  }
  
  private refreshRuleData(): void{
    if(this.ruleData){
      if(!this.isNewRule){

        if(this.ruleData.hasOwnProperty("Name") && !this.isNewRule){
          this.titleText = this.ruleData.Name;
        }else{
          this.titleText = "unspecified title";
        }

        if(this.ruleData.hasOwnProperty("Enabled")){
          this.ruleEnabled = this.ruleData.Enabled;
          this.enabledText =  this.ruleEnabled ? "Enabled" : "Disabled";
        }

        if(this.ruleData.hasOwnProperty("TestNames")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(this.ruleData["TestNames"].length > 0){
            this.testText = "";
            this.ruleData["TestNames"].forEach(element =>{
                this.testText += ", " + element; 
            });
            this.testText = this.testText.slice(1);
          }else{
            this.testText = "All Current and Future Tests";
          }
        }
        if(this.ruleData.hasOwnProperty("LocationNames")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(this.ruleData["LocationNames"].length > 0){
            this.locationText = "";
            this.ruleData["LocationNames"].forEach(element =>{
              if(element != ""){
                this.locationText += ", " + this.allLocations.find(location => location.Name.indexOf(element) != -1).Name ; 
              }else
              {
                this.locationText += ", (None)"; 
              }
            });
            this.locationText = this.locationText.slice(1);
          }else{
            this.locationText = "All Current and Future Patient Locations";
          }
        }
        if(this.ruleData.hasOwnProperty("ZoneIDs")){
          //this.emailsList = this.ruleData.NotificationEmails;
          if(this.ruleData["ZoneIDs"].length > 0){
            this.zonesText = "";
            <Array<string>>this.ruleData["ZoneIDs"].forEach(element =>{
              this.zonesText += ", " + this.allZones.find(zone => zone.Id ==element).Name; 
            });
            this.zonesText = this.zonesText.slice(1);
          }else{
            this.zonesText = "All Current and Future Zones";
          }
        }
        if(this.ruleData.hasOwnProperty("AtRiskDuration")){
          if(this.ruleData["AtRiskDuration"] != null){
            this.atRiskDuration = HelperFunctions.transformtoSeconds(this.ruleData["AtRiskDuration"]);
            this.atRiskDurationText = this.constructDurationText(this.atRiskDuration);
          }
        }
        if(this.ruleData.hasOwnProperty("OverdueDuration")){
          if(this.ruleData["OverdueDuration"] != null){
            this.overdueDuration = HelperFunctions.transformtoSeconds(this.ruleData["OverdueDuration"]);
            this.overDueDurationText = this.constructDurationText(this.overdueDuration);
          }
        }
        if(this.ruleData.hasOwnProperty("TestPriorityMask")){
          this.priorityMask = this.ruleData["TestPriorityMask"];
          this.priorityMaskText = ServicesConstants.TEST_PRIORITY_MASK[this.ruleData["TestPriorityMask"]];
        }
      }else{
        this.tests = [-1];
        this.locations = [-1];
        this.zones = [-1];
        this.atRiskDuration = -1;
        this.overdueDuration = -1;
        this.testText = "All Current and Future Tests";
        this.locationText = "All Current and Future Patient Locations";
        this.zonesText = "All Current and Future Zones."
        this.overDueDurationText = "unspecified turnaround time";
        this.atRiskDurationText = "unspecified period of time";
        this.titleText = "unspecified title";
        this.priorityMaskText = "STAT and Routine";
      }
    }
  }


  private sortByNameAscending(obj1: any, obj2: any):number {
    var textNameA = obj1.Name.toLowerCase();
    var textNameB = obj2.Name.toLowerCase();

    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
  }

  public naturalLanguageTextConfigurator(handle: any){
    if(handle == "title"){
      this.isShowTitleModal = true;
    }else if(handle == "enabled"){
      this.isShowEnableModal = true;
    }else if(handle == "tests"){
      this.isShowTestModal = true;
    }else if(handle == "location"){
      this.isShowLocationModal = true;
    }else if(handle == "zone"){
      this.isShowZoneModal = true;
    }else if(handle == "overdueduration"){
      this.isShowDurationModal = true;
      this.durationConfiguratorTitle = "Overdue Duration";
    }else if(handle == "atriskduration"){
      this.isShowDurationModal = true;
      this.durationConfiguratorTitle = "At Risk Duration";
    }
    
  }

  public setDuration(duration): void{
    if(this.durationConfiguratorTitle == "Overdue Duration"){
      this.overDueDurationText = this.constructDurationText(duration);
      this.overdueDuration = duration;
      this.updatedRuleData["OverdueDuration"] = HelperFunctions.trasformSeondstoISO8601(duration);
    }else if(this.durationConfiguratorTitle == "At Risk Duration"){
      this.atRiskDurationText = this.constructDurationText(duration);
      this.atRiskDuration = duration;
      this.updatedRuleData["AtRiskDuration"] = HelperFunctions.trasformSeondstoISO8601(duration);
    }
    this.durationConfiguratorTitle = "";
    this.isShowDurationModal = false;
  }

  public updateTitle(title: any): void{
    this.titleText =  title.name;
    if(this.titleText == ""){
      this.titleText = "unspecified title";
    }
    this.updatedRuleData["Name"] = this.titleText;
    this.isShowTitleModal = false;
  }

  public updateRuleEnable(enabled: any): void{
    this.ruleEnabled = enabled.enabled;
    this.enabledText = this.ruleEnabled? "Enabled": "Disabled";
    this.updatedRuleData["Enabled"] = this.ruleEnabled;
    this.isShowEnableModal =  false;
  }

  public updateTests(selectedtests: any){
    this.tests = [];
    if(selectedtests.length > 0){
      this.testText = "";
      selectedtests.forEach(element =>{
        this.testText += ", " + element.Name; 
        this.tests.push(element.Code);
      });
      this.testText = this.testText.slice(1);
    }else{
      this.testText = "All Current and Future Tests";
    }
    this.isShowTestModal = false;
    this.updatedRuleData["TestNames"] = this.tests;
    this.isRuleChanged = true;
  }

  public updateLocations(selectedlocations: any){
    this.locations = [];
    if(selectedlocations.length > 0){
      this.locationText = "";
      selectedlocations.forEach(element =>{
        this.locationText += ", " + element.Name; 
        this.locations.push(element.Id);
      });
      this.locationText = this.locationText.slice(1);
    }else{
      this.locationText = "All Current and Future Patient Locations";
    }
    this.isShowLocationModal = false;
    this.updatedRuleData["LocationNames"] = this.locations;
    this.isRuleChanged = true;
  }

  public updateZones(selectedevents: any){
    this.zones = [];
    if(selectedevents.length > 0){
      this.zonesText = "";
      selectedevents.forEach(element =>{
        this.zonesText += ", " + element.Name; 
        this.zones.push(element.Id);
      });
      this.zonesText = this.zonesText.slice(1);
    }else{
      this.zonesText = "All Current and Future Zones";
    }
    this.isShowZoneModal = false;
    this.updatedRuleData["ZoneIDs"] =  this.zones;
    this.isRuleChanged = true;
  }

  // public updateInstruments(selectedinstruments: any){
  //   this.tests = [];
  //   if(selectedinstruments.length > 0){
  //     this.testText = "";
  //     selectedinstruments.forEach(element =>{
  //       this.testText += ", " + element.Name; 
  //       this.tests.push(element.Id);
  //     });
  //     this.testText = this.testText.slice(1);
  //   }else{
  //     this.testText = "All Current and Future Instruments";
  //   }
  //   this.isShowAssetModal = false;
  //   this.updatedRuleData["Instruments"] = this.tests;
  //   this.isRuleChanged = true;
  // }


  // public updateEvents(selectedevents: any){
  //   this.deviceEvents = [];
  //   if(selectedevents.length > 0){
  //     this.deviceEventText = "";
  //     selectedevents.forEach(element =>{
  //       this.deviceEventText += ", " + "Device event [" +element +"}"; 
  //       this.deviceEvents.push(element);
  //     });
  //     this.deviceEventText = this.deviceEventText.slice(1);
  //   }else{
  //     this.deviceEventText = "unspecified event(s)";
  //   }
  //   this.isShowEventModal = false;
  //   this.updatedRuleData["EventCodes"] = this.deviceEvents;
  //   this.isRuleChanged = true;
  //   this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  // }

  // public updateSeverity(severity: any){
  //   this.updatedRuleData["EventCodes"] = severity;
  //   this.alertSeverityText =  ServicesConstants.ALERT_SEVERITY[severity];
  //   this.isShowSeverityModal = false;
  //   this.isRuleChanged = true;
  //   this.onRuleChange.emit({isModified: true, Name:"Instrument Event Alert Rule"});
  // }

  public cancelRule(ruleData: any): void{
    this.ruleData = ruleData;
    this.refreshRuleData();
    this.isRuleChanged = false;
  }

  public getUpdatedRuleData(): any{
    this.isRuleChanged = false;
    return this.updatedRuleData;
  }

  public discardChanges(event: any): void{
    this.cancelRule(this.ruleData);
    this.isShowAlertBox = false;
  }

  public cancelEvent(event: any): void{
    this.isShowAlertBox = false;
  }


  private constructDurationText(seconds: number): string{
    var durationtext = "";
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;

    if(days > 0){
      durationtext = days + " day(s) ";
    }

    if(hrs > 0){
      durationtext += hrs +" Hour(s) ";
    }

    if(mnts > 0){
      durationtext += mnts+" Minute(s) "
    }
    if(days == 0 && hrs == 0 && mnts == 0){
      return 0 +" Minute(s) ";
    }
    return durationtext;
  }
}
