import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-reagentexpiration',
  templateUrl: './reagentexpiration.component.html',
  styleUrls: ['./reagentexpiration.component.css']
})
export class ReagentexpirationComponent implements OnInit {
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  reagentText: string;
  instrumentText: string;
  warningThresholdText: string;
  criticalThresholdText: string;
  isShowReagentModal: boolean = false;
  OBSWarningThresholdText: string;
  OBSCriticalThresholdText: string;
  isShowInstrumentModal: boolean = false;
  isShowAlertModal: boolean = false;;
  configurabletext1: string = "if expiration is within";
  configurabletext2: string = "hour(s)";
  configurabletext3: string = "";
  warningThreshold: number;
  criticalThreshold: number;
  OBSWarningThreshold: number;
  OBSCriticalThreshold: number;
  enableCriticalThreshold: boolean;
  alertType: string;
  isShowAlertInputText: boolean = false;
  updatedRuleData: any;
  @Input() ruleData;
  itemsNames: Array<any>;
  instruments: Array<any>;
  ruleDataService: RuleDataService;
  
  constructor(ruleDataService: RuleDataService) { 
    this.ruleDataService = ruleDataService;
    
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.updatedRuleData = Object.assign({}, this.ruleData);
    this.refreshRuleData();
  }

  private refreshRuleData(): void {
    if (this.ruleData) {
      if (!this.isNewRule) {

        if (this.ruleData.hasOwnProperty("ItemNames") && this.ruleData["ItemNames"].length != 0) {
          this.itemsNames = [];
          this.reagentText = "";
          this.ruleData["ItemNames"].forEach(element => {

          });
          this.reagentText = this.reagentText.slice(1);
        } else {
          this.itemsNames = [];
          this.reagentText = "All Current and Future Reagents";
        }
        if (this.ruleData.hasOwnProperty("Instruments") && this.ruleData["Instruments"].length > 0) {
          this.instruments = [];
          this.instrumentText = "";
          this.ruleData["Instruments"].forEach(element => {
            this.ruleDataService.getInstrumentNamebyId(element).then((data) => {
              this.instrumentText += data + ", ";
            });
          });
          this.instrumentText = this.instrumentText.slice(1);
        } else {
          this.instruments = [];
          this.instrumentText = "All Current and Future Instruments";
        }

        if (this.ruleData.hasOwnProperty("WarningThreshold") && this.ruleData.WarningThreshold != 0) {
          this.warningThreshold = HelperFunctions.transformtoSeconds(this.ruleData.WarningThreshold);
          let seconds = this.warningThreshold;

          if (this.warningThreshold / 3600 != 0) {
            this.warningThresholdText = "within " + this.warningThreshold / 3600 + " hours(s)";
          } else {
            this.warningThresholdText = "never; do not generate a warning Alert when this rule is applied.";
          }

        } else {
          this.warningThreshold = HelperFunctions.transformtoSeconds(this.ruleData.WarningThreshold);
          this.warningThresholdText = "never; do not generate a warning Alert when this rule is applied.";
        }

        if (this.ruleData.hasOwnProperty("EnableCriticalThreshold") && this.ruleData.EnableCriticalThreshold == true) {
          this.criticalThreshold = 0;
          this.criticalThresholdText = "always; generate a critical Alert when this rule is applied";
        } else {
          this.criticalThreshold = 0;
          this.criticalThresholdText = "never; do not generate a critical Alert when this rule is applied";
        }

        if (this.ruleData.hasOwnProperty("OBSWarningThreshold") && this.ruleData.OBSWarningThreshold != 0) {

          this.OBSWarningThreshold = HelperFunctions.transformtoSeconds(this.ruleData.OBSWarningThreshold);

          if (this.OBSWarningThreshold / 3600 != 0) {
            this.OBSWarningThresholdText = "within " + this.OBSWarningThreshold / 3600 + " hours(s)";
          } else {
            this.OBSWarningThresholdText = "never; do not generate a warning Alert when this rule is applied.";
          }

        } else {
          this.OBSWarningThresholdText = "never; do not generate a warning Alert when this rule is applied.";
        }

        if (this.ruleData.hasOwnProperty("EnableOBSCriticalThreshold") && this.ruleData.EnableOBSCriticalThreshold == true) {

          this.criticalThresholdText = "always; generate a critical Alert when this rule is applied";
        } else {
          this.criticalThresholdText = "never; do not generate a critical Alert when this rule is applied";
        }
      }
      else {
        this.instruments = [-1];
        this.itemsNames = [-1];
        this.warningThreshold = -2;
        this.criticalThreshold = -2;
        this.OBSWarningThreshold = -2;
        this.OBSCriticalThreshold = -2;
        this.reagentText = "unspecified reagent(s)";
        this.instrumentText = "unspecified instrument(s)";
        this.warningThresholdText = "unspecified expiration";
        this.criticalThresholdText = "unspecified calibration expiration critical alert generation";
        this.OBSWarningThresholdText = "unspecified expiration";
        this.OBSCriticalThresholdText = "unspecified OBS expiration critical alert generation"
      }
    }
  }
  public naturalLanguageTextConfigurator(handle: any){
    if(handle == "reagents"){
      this.isShowReagentModal = true;
    }else if(handle == "instrument"){
      this.isShowInstrumentModal = true;
    }else if(handle == "warningthreshold"){
      this.isShowAlertModal = true;
      this.alertType = "warning";
      this.configurabletext1 = "Generate a warning alert if expiration is within";
      this.configurabletext2 = "hour(s)";
      this.configurabletext3 = "Do not generate a warning alert";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }else if(handle == "criticalthreshold"){
      this.alertType = "critical";
      this.configurabletext1 = "Generate a critical alert if calibration expiration is detected";
      this.configurabletext2 = "";
      this.configurabletext3 = "Do not generate a critical alert";
      this.isShowAlertInputText = false;
      this.isShowAlertModal = true;
    }else if(handle == "OBSWarningThreshold"){
      this.isShowAlertModal = true;
      this.alertType = "OBSwarning";
      this.configurabletext1 = "Generate a warning alert if expiration is within";
      this.configurabletext2 = "hour(s)";
      this.configurabletext3 = "Do not generate a warning alert";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }else if(handle == "OBSCriticalThreshold"){
      this.alertType = "OBScritical";
      this.configurabletext1 = "Generate a critical alert if calibration expiration is detected";
      this.configurabletext2 = "";
      this.configurabletext3 = "Do not generate a critical alert";
      this.isShowAlertInputText = false;
      this.isShowAlertModal = true;
    }
  }

  public _handleActive(){
      alert("Clicked");
  }

  ngAfterViewInit(){
  }

  public updateReagent(assets: any): void{
    this.itemsNames = [];
    this.reagentText = "All Current and Future Reagents";
    this.isShowReagentModal = false;
    this.updatedRuleData["ItemNames"] = [];
  }

  public updateInstrument(assets: any): void{
    this.instruments = [];
    this.instrumentText = "All Current and Future Instruments";
    this.isShowInstrumentModal = false;
    this.updatedRuleData["Instruments"] = [];
  }

  public updateAlerts(alert: any): void{
    if(alert.type == "warning"){
      this.warningThreshold = alert.value*3600;
      if(alert.value != -1 || alert.value != 0){
        this.warningThresholdText =  "within " + alert.value + " hours(s)";
      }else{
        this.warningThresholdText =  "never; do not generate a warning Alert when this rule is applied.";  
      }
    }else if(alert.type == "critical"){
      this.criticalThreshold = alert.value;
      if(this.criticalThreshold != -1){
        this.criticalThresholdText =  "always; generate a critical Alert when this rule is applied";
      }else{
        this.criticalThresholdText =  "never; do not generate a critical Alert when this rule is applied.";  
      }
    }if(alert.type == "OBSwarning"){
      this.OBSWarningThreshold = alert.value*3600;
      if(alert.value != -1 || alert.value != 0){
        this.OBSWarningThresholdText =  "within " + alert.value + " hours(s)";
      }else{
        this.OBSWarningThresholdText =  "never; do not generate a warning Alert when this rule is applied.";  
      }
    }else if(alert.type == "OBScritical"){
      this.OBSCriticalThreshold = alert.value;
      if(this.OBSCriticalThreshold != -1){
        this.OBSCriticalThresholdText =  "always; generate a critical Alert when this rule is applied";
      }else{
        this.OBSCriticalThresholdText =  "never; do not generate a critical Alert when this rule is applied.";  
      }
    }
    this.isShowAlertModal = false;
    this.updatedRuleData["WarningThreshold"] =  HelperFunctions.trasformSeondstoISO8601(this.warningThreshold);
    this.updatedRuleData["EnableCriticalThreshold"] = this.criticalThreshold == 0 ? false: true;
    this.updatedRuleData["OBSwarning"] =  HelperFunctions.trasformSeondstoISO8601(this.warningThreshold);
    this.updatedRuleData["EnableOBSCriticalThreshold"] = this.OBSCriticalThreshold == 0 ? false: true;
  }

  public onSharedRuleParamsChange(escalationDetails: any): void{
    this.updatedRuleData["NotificationEmails"] = escalationDetails.NotificationEmails;
    this.updatedRuleData["EscalationEmails"] = escalationDetails.EscalationEmails;
    this.updatedRuleData["EmailOnEscalationResolution"] = escalationDetails.EmailOnEscalationResolution;
    this.updatedRuleData["AckThreshold"] = HelperFunctions.trasformSeondstoISO8601(escalationDetails.AckThreshold);
    this.updatedRuleData["ResolveThreshold"] = HelperFunctions.trasformSeondstoISO8601(escalationDetails.ResolveThreshold);
    this.updatedRuleData["Name"] = escalationDetails.Name;
    this.updatedRuleData["Enabled"] = escalationDetails.Enabled;
  }

  public cancelRule(ruleData: any): void{
    this.ruleData = ruleData;
    this.refreshRuleData();
    this.srpComponent.cancelRule(ruleData);
  }

  public getUpdatedRuleData(): any{
    return this.updatedRuleData;
  }
}
