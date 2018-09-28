import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-consumableinventorylevel',
  templateUrl: './consumableinventorylevel.component.html',
  styleUrls: ['./consumableinventorylevel.component.css']
})
export class ConsumableinventorylevelComponent implements OnInit {
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  consumableText: string;
  instrumentText: string = "All Current and Future Instruments";
  warningILText: string = "unspecified consumable inventory level for warning alert";
  criticalILText: string = "unspecified consumable inventory level for critical alert";
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

  private refreshRuleData(): void{
    if(this.ruleData){
      if(!this.isNewRule){
        if(this.ruleData.hasOwnProperty("ItemNames") && this.ruleData["ItemNames"].length != 0){
          this.itemsNames = []; 
          this.consumableText = "";
          this.ruleData["ItemNames"].forEach(element =>{
            
          });
          this.consumableText = this.consumableText.slice(1);
        }else{
          this.itemsNames = [];
          this.consumableText = "All Current and Future Consumable Inventory Items";
        }
        if(this.ruleData.hasOwnProperty("Instruments") && this.ruleData["Instruments"].length > 0){
          this.instruments = [];
          this.instrumentText = "";
          this.ruleData["Instruments"].forEach(element =>{
            this.ruleDataService.getInstrumentNamebyId(element).then((data)=>{
              this.instrumentText += data + ", "; 
            });
          });
          this.instrumentText = this.instrumentText.slice(1);
        }else{
          this.instruments = [];
          this.instrumentText = "All Current and Future Instruments";
        }

        if(this.ruleData.hasOwnProperty("WarningLevel") && this.ruleData.WarningLevel != -1 && this.ruleData.Type == 31){
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText =  "is less than " + this.ruleData.WarningLevel + " percent";
        }else if(this.ruleData.hasOwnProperty("WarningLevel") && this.ruleData.WarningLevel != -1 && this.ruleData.Type == 38){
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText =  "is less than " + this.ruleData.WarningLevel + " percent full";
        }else{
          this.warningLevel = this.ruleData.WarningLevel;
          this.warningILText =  "never; this inventory alert is currently disabled";
        }

        if(this.ruleData.hasOwnProperty("CriticalLevel") && this.ruleData.CriticalLevel != -1 && this.ruleData.Type == 31){
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText =  "is less than " + this.ruleData.CriticalLevel + " percent";
        }else if(this.ruleData.hasOwnProperty("CriticalLevel") && this.ruleData.CriticalLevel != -1 && this.ruleData.Type == 38){
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText =  "is less than " + this.ruleData.CriticalLevel + " percent full";
        }
        else{
          this.criticalLevel = this.ruleData.CriticalLevel;
          this.criticalILText =  "never; this inventory alert is currently disabled";
        }
      }else{
        this.instruments = [-1];
        this.itemsNames = [-1];
        this.warningLevel = -2;
        this.criticalLevel = -2;
        this.consumableText = "unspecified consumable(s)";
        this.instrumentText = "unspecified instrument(s)"; 
        this.warningILText = "unspecified consumable inventory level for warning alert";
        this.criticalILText = "unspecified consumable inventory level for critical alert";
      }
    }
  }

  public naturalLanguageTextConfigurator(handle: any){
    if(handle == "consumable"){
      this.isShowInventoryModal= true;
      //this.reagentsText = "All Current and Future Reagents";
    }else if(handle == "instrument"){
      this.isShowInstrumentModal = true;
    }else if(handle == "warninginventorylevel"){
      this.alertType = "warning";
      this.configurabletext1 = "Generate a critical alert if inventory level falls below";
      this.configurabletext2 = "test(s)";
      this.configurabletext3 = "Disable the generation of a Critical nventory level alert";
      this.isShowAlertInputText = true;
      this.isShowAlertModal = true;
    }else if(handle == "criticalinventorylevel"){
      this.alertType = "critical";
      this.configurabletext1 = "Generate a critical alert if inventory level falls below";
      this.configurabletext2 = "test(s)";
      this.configurabletext3 = "Disable the generation of a Critical nventory level alert";
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
    if(alert.type == "warning"){
      this.warningLevel = alert.value;
      if(this.warningLevel != 1 && this.ruleData.Type == 31){
        this.warningILText =  "is less than " + this.warningLevel + " percent";
      }else if(this.warningLevel != 1 && this.ruleData.Type == 38){
        this.warningILText =  "is less than " + this.warningLevel + " percent full";
      }else{
        this.warningILText =  "never; this inventory alert is currently disabled";  
      }
    }else if(alert.type == "critical"){
      this.criticalLevel = alert.value;
      if(this.criticalLevel != -1  && this.ruleData.Type == 31){
        this.criticalILText =  "is less than " + this.criticalLevel + " percent";
      }else if(this.criticalLevel != -1  && this.ruleData.Type == 38){
        this.criticalILText =  "is less than " + this.criticalLevel + " percent full";
      }else{
        this.criticalILText =  "never; this inventory alert is currently disabled";  
      }
    }
  
    this.isShowAlertModal = false;
    this.updatedRuleData["WarningLevel"] =  this.warningLevel;
    this.updatedRuleData["CriticalLevel"] = this.criticalLevel;
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
