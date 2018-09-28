import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-reagentinventorylevel',
  templateUrl: './reagentinventorylevel.component.html',
  styleUrls: ['./reagentinventorylevel.component.css']
})
export class ReagentinventorylevelComponent implements OnInit {
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  consumableText: string;
  instrumentText: string = "All Current and Future Instruments";
  warningILText: string = "unspecified consumable inventory level for warning alert";
  criticalILText: string = "unspecified consumable inventory level for critical alert";
  fullinventorylevelText: string = "unspecified full reagent inventory level";
  isShowInventoryModal: boolean = false;
  isShowInstrumentModal: boolean = false;
  isShowAlertModal: boolean = false;
  configurabletext1: string;
  configurabletext2: string;
  configurabletext3: string;
  warningLevel: number;
  criticalLevel: number;
  fullInventoryLevel: number;
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
          this.consumableText = "";
          this.ruleData["ItemNames"].forEach(element => {

          });
          this.consumableText = this.consumableText.slice(1);
        } else {
          this.itemsNames = [];
          this.consumableText = "All Current and Future Reagents";
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

        if (this.ruleData.hasOwnProperty("WarningLevel") && this.ruleData.WarningLevel != -1 && this.ruleData.Type == 32) {
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText = "is less than " + this.ruleData.WarningLevel + " tests";
        } else if (this.ruleData.hasOwnProperty("WarningLevel") && this.ruleData.WarningLevel != -1 && this.ruleData.Type == 80) {
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText = "is less than " + this.ruleData.WarningLevel + " mL";
        } else {
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText = "never; this inventory alert is currently disabled";
        }

        if (this.ruleData.hasOwnProperty("CriticalLevel") && this.ruleData.CriticalLevel != -1 && this.ruleData.Type == 32) {
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText = "is less than " + this.ruleData.CriticalLevel + " tests";
        } else if (this.ruleData.hasOwnProperty("CriticalLevel") && this.ruleData.CriticalLevel != -1 && this.ruleData.Type == 80) {
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText = "is less than " + this.ruleData.CriticalLevel + " mL";
        }
        else {
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText = "never; this inventory alert is currently disabled";
        }

        if (this.ruleData.hasOwnProperty("FullLevel") && this.ruleData.Type == 32) {
          this.fullinventorylevelText = "if " + this.ruleData.FullLevel + " tests (or more) are available.";
        } else if (this.ruleData.hasOwnProperty("FullLevel") && this.ruleData.Type == 80) {
          this.fullinventorylevelText = "if " + this.ruleData.FullLevel + " mL (or more) are available.";
        } else {
          this.fullinventorylevelText = "n/a; do not define a full inventory level in this rule";
        }
      } else {
        this.instruments = [-1];
        this.itemsNames = [-1];
        this.warningLevel = -2;
        this.criticalLevel = -2;
        this.fullInventoryLevel = -2;
        this.fullinventorylevelText = "unspecified full reagent inventory level ";
        this.consumableText = "unspecified consumable(s)";
        this.instrumentText = "unspecified instrument(s)";
        this.warningILText = "unspecified consumable inventory level for warning alert";
        this.criticalILText = "unspecified consumable inventory level for critical alert";
      }
    }
  }

  public naturalLanguageTextConfigurator(handle: any) {
    if (handle == "consumable") {
      this.isShowInventoryModal = true;
      //this.reagentsText = "All Current and Future Reagents";
    } else if (handle == "instrument") {
      this.isShowInstrumentModal = true;
    } else if (handle == "warninginventorylevel") {
      this.alertType = "warning";
      this.configurabletext1 = "Generate a critical alert if inventory level falls below";
      if (this.ruleData.Type == 32) {
        this.configurabletext2 = "test(s)";
      } else if (this.ruleData.Type == 80) {
        this.configurabletext2 = "mL";
      }
      this.configurabletext3 = "Disable the generation of a Critical nventory level alert";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    } else if (handle == "criticalinventorylevel") {
      this.alertType = "critical";
      this.configurabletext1 = "Generate a critical alert if inventory level falls below";
      if (this.ruleData.Type == 32) {
        this.configurabletext2 = "test(s)";
      } else if (this.ruleData.Type == 80) {
        this.configurabletext2 = "mL";
      }
      this.configurabletext3 = "Disable the generation of a Critical nventory level alert";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    } else if (handle == "fullinventorylevel") {
      this.alertType = "fullinventory";
      this.configurabletext1 = "Define the reagent inventory as Full if";
      if (this.ruleData.Type == 32) {
        this.configurabletext2 = "tests (or more) are available. ";
      } else if (this.ruleData.Type == 80) {
        this.configurabletext2 = "ml (or more) are available. ";
      }

      this.configurabletext3 = "Do not define the Full inventory level";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }
  }
  public updateInventory(assets: any): void{
    this.itemsNames = [];
    this.consumableText = "All Current and Future Consumable Inventory Items";
    this.isShowInventoryModal = false;
    this.updatedRuleData["ItemNames"] = [];
  }

  public updateInstrument(assets: any): void{
    this.instruments = [];
    this.instrumentText = "All Current and Future Instruments";
    this.isShowInstrumentModal = false;
    this.updatedRuleData["Instruments"] = [];
  }

  public updateAlerts(alert: any): void{
    //alert("Assets::"+ assets);
    if(alert.type == "warning"){
      this.warningLevel = alert.value;
      if(this.warningLevel != -1 && this.ruleData.Type == 32){
        this.warningILText =  "is less than " + this.warningLevel + " tests";
      }else if(this.warningLevel != -1 && this.ruleData.Type == 80){
        this.warningILText =  "is less than " + this.warningLevel + " mL";
      }else{
        this.warningILText =  "never; this inventory alert is currently disabled";  
      }
    }else if(alert.type == "critical"){
      this.criticalLevel = alert.value == "" ? -1 : alert.value;
      if(this.criticalLevel != -1  && this.ruleData.Type == 32){
        this.criticalILText =  "is less than " + this.criticalLevel + " tests";
      }else if(this.criticalLevel != -1  && this.ruleData.Type == 80){
        this.criticalILText =  "is less than " + this.criticalLevel + " mL";
      }else{
        this.criticalILText =  "never; this inventory alert is currently disabled";  
      }
    }else if(alert.type == "fullinventory"){
      this.fullInventoryLevel = alert.value;
      if(this.fullInventoryLevel != -1 && this.ruleData.Type == 32){
        this.fullinventorylevelText =  "if " + this.fullInventoryLevel + " tests (or more) are available.";
      }else if(this.fullInventoryLevel != -1 && this.ruleData.Type == 80){
        this.fullinventorylevelText =  "if " + this.fullInventoryLevel + " mL (or more) are available.";
      }else{
        this.fullinventorylevelText =  "n/a; do not define a full inventory level in this rule.";  
      }
    }
    this.isShowAlertModal = false;
    this.updatedRuleData["WarningLevel"] =  this.warningLevel;
    this.updatedRuleData["CriticalLevel"] = this.criticalLevel;
    this.updatedRuleData["FullLevel"] = this.fullInventoryLevel;
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