import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef} from '@angular/core';
import { RuleDataService } from '../../../services/rule.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServicesConstants } from "../../../services/constants.service";
import { CalibrationexpirationComponent } from "../../rulenaturallanguage/calibrationexpiration";
import { ReagentexpirationComponent } from "../../rulenaturallanguage/reagentexpiration";
import { ConsumableinventorylevelComponent } from "../../rulenaturallanguage/consumableinventorylevel";
import { ReagentinventorylevelComponent } from "../../rulenaturallanguage/reagentinventorylevel";
import { InstrumenteventComponent } from "../../rulenaturallanguage/instrumentevent";
import { CommunicationescalationComponent } from "../../rulenaturallanguage/communicationescalation";
import { SystemescalationComponent } from "../../rulenaturallanguage/systemescalation";
import { UserdefinedComponent } from "../../rulenaturallanguage/userdefined";

import { Store } from '@ngrx/store';
import { AlertRule } from './../../../models/alertrule';
import { AppState } from './../../../app.state';
import * as AlertRuleActions from './../../../actions/alertrules.actions';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
@ViewChild("ruleTableBody") ruleTableBody: ElementRef;
  @ViewChild("calExpComponent") calExpComponent: CalibrationexpirationComponent;
  @ViewChild("reAgentExpComponent") reAgentExpComponent: CalibrationexpirationComponent;
  @ViewChild("reagentILComponent") reagentILComponent: ReagentexpirationComponent;
  @ViewChild("consILComponent") consILComponent: ConsumableinventorylevelComponent;
  @ViewChild("instrueventComponent") instrueventComponent: InstrumenteventComponent;
  @ViewChild("commescalationComponent") commescalationComponent: CommunicationescalationComponent;
  @ViewChild("sysescalationComponent") sysescalationComponent: SystemescalationComponent;
  @ViewChild("userdefinedComponent") userdefinedComponent: UserdefinedComponent;
  ruleTypeList: any;
  selectedRowRuleType: number = 1;
  menuList: any;
  selected:any;
  isDrawWall: boolean = false;
  ruleDataService: RuleDataService;
  rulesData: Observable<AlertRule[]>;
  currentrulesData: any;
  currentRuleIndex: number;
  currentRule: any = 1;
  isConsumableWasteIL: boolean = false;
  isAncillaryReagentIL: boolean = false;
  isCalibrationExpiration: boolean = false;
  isReagentExpiration: boolean = false;
  isUserDefined: boolean = false;
  isInstrumentEvent: boolean = false;
  isCommAlertEscalation: boolean = false;
  isSysAlertEscalation: boolean = false;
  emailsList: Array<any> = [];
  isNewCreatedRule: boolean = false;
  sortBy: string;
  isSortByEnabledAsc: boolean = false;
  isSortByNameAsc: boolean = false;
  isSortByTypeAsc: boolean = false;

  constructor(ruleDataService: RuleDataService, private store: Store<AppState>) {
      this.ruleDataService = ruleDataService;
      this.rulesData = store.select('alertrule');
  }

    /**
     * Called before initialization
     */
    ngOnInit() {
        this.ruleDataService.getAlertRulesData().then((data)=>{
          this.store.dispatch(new AlertRuleActions.Empty());
          data.forEach(element => {
            this.store.dispatch(new AlertRuleActions.AddRule (element));
          });
          this.updateRuleDescription();
          this.sortBy = "type";
          this.store.dispatch(new AlertRuleActions.SortRuleByDescriptionName(true));

          this.generateEmailList();
          this.rulesData.subscribe(rule =>{
            this.currentrulesData = rule[0];
            this.ruleSelect({},rule[0],0);
          });
          
        });

        document.getElementById('navSettingsRulesAlerts').setAttribute('active','true');
    }

    ngAfterViewInit() {
    }

  handleMenuClick (): void   
  {  
    alert("Clicked");
  } 

  public loadRules(index){
    this.selectedRowRuleType = index;
    alert(this.ruleTypeList[index].name);
  }

  public ruleSelect(event: any, rule: any, index: any){
    this.currentRuleIndex = index;
    this.currentrulesData = rule;
    if(rule != null || rule != undefined){
      this.currentRule = rule.Id;
    }

    if(this.currentrulesData == null || this.currentrulesData == undefined){
      this.hideAllNaturalLanguageRules();
    }else{
      switch(rule.Type){
        case 31:
        case 38:
          this.hideAllNaturalLanguageRules();
          this.isConsumableWasteIL = true;
          break;
        case 32:
        case 80:
          this.hideAllNaturalLanguageRules();
          this.isAncillaryReagentIL = true;
          break;
        case 37:
          this.hideAllNaturalLanguageRules();
          this.isCalibrationExpiration = true;
          break;
        case 33:
          this.hideAllNaturalLanguageRules();
          this.isReagentExpiration = true;
          break;
        case 50:
          this.hideAllNaturalLanguageRules();
          this.isUserDefined = true;
          break;
        case 20:
          this.hideAllNaturalLanguageRules();
          this.isInstrumentEvent = true;
          break;
        case 40:
          this.hideAllNaturalLanguageRules();
          this.isCommAlertEscalation =  true;
          break;
        case 102:
          this.hideAllNaturalLanguageRules();
          this.isSysAlertEscalation = true;
          break;
     }
    }
  }

  hideAllNaturalLanguageRules(){
    this.isConsumableWasteIL= false;
    this.isAncillaryReagentIL = false;
    this.isCalibrationExpiration = false;
    this.isReagentExpiration = false;
    this.isUserDefined = false;
    this.isInstrumentEvent = false;
    this.isCommAlertEscalation = false;
    this.isSysAlertEscalation = false;
  }

  private updateRuleDescription(){
    this.rulesData.subscribe(rules => 
    { 
      rules.forEach(element => {
        element["TypeDescription"] = ServicesConstants.ALERT_RULE_TYPE_DESCRIPTION[element.Type];
        this.store.dispatch(new AlertRuleActions.UpdateRuleDescription(element));
      });
    });
  }

  private generateEmailList() {
    let emails: Array<string> = [];
    this.rulesData.subscribe(rules => 
      {
        rules.forEach(element => {
          if (element.hasOwnProperty("NotificationEmails")) {
            element["NotificationEmails"].forEach(subelement => {
              if (emails.indexOf(subelement) === -1) {
                emails.push(subelement);
              }
            });
          }
          if (element.hasOwnProperty("EscalationEmails")) {
            element["EscalationEmails"].forEach(subelement => {
              if (emails.indexOf(subelement) === -1) {
                emails.push(subelement);
              }
            });
          }
        });
      }
    );

    emails.forEach( element => {
      this.emailsList.push({id: element, selected: false});
    });
  }

  public saveRule(event: any): void{
    let updateRuleData
    if(this.isCalibrationExpiration){
      updateRuleData = this.calExpComponent.getUpdatedRuleData();
    }else if(this.isReagentExpiration){
      updateRuleData = this.reAgentExpComponent.getUpdatedRuleData();
    }else if(this.isConsumableWasteIL){
      updateRuleData = this.consILComponent.getUpdatedRuleData();
    }else if(this.isAncillaryReagentIL){
      updateRuleData = this.reagentILComponent.getUpdatedRuleData();
    }else if(this.isInstrumentEvent){
      updateRuleData = this.instrueventComponent.getUpdatedRuleData();
    }else if(this.isCommAlertEscalation){
      updateRuleData = this.commescalationComponent.getUpdatedRuleData();
    }else if(this.isSysAlertEscalation){
      updateRuleData = this.sysescalationComponent.getUpdatedRuleData();
    }else if(this.isUserDefined){
      updateRuleData = this.userdefinedComponent.getUpdatedRuleData();
    }
    this.ruleDataService.setAlertRulesData(updateRuleData).then((data, err)=>{
      if(data && (Object.keys(data).length != 0)){
        this.currentrulesData = data;
        this.store.dispatch(new AlertRuleActions.UpdateRule(data));
        this.ruleSelect({},data, this.currentRuleIndex);
        this.isNewCreatedRule = false;
      }
    });
  }

  public cancelRule(event: any): void{
    if(this.isNewCreatedRule){
      this.hideAllNaturalLanguageRules();
      this.store.dispatch(new AlertRuleActions.RemoveRuleByIndex(this.currentRuleIndex));
      this.isNewCreatedRule = false;
    }else{
      if(this.isCalibrationExpiration){
        this.calExpComponent.cancelRule(this.currentrulesData);
      }else if(this.isReagentExpiration){
        this.reAgentExpComponent.cancelRule(this.currentrulesData);
      }else if(this.isConsumableWasteIL){
        this.commescalationComponent.cancelRule(this.currentrulesData);
      }else if(this.isAncillaryReagentIL){
        this.reagentILComponent.cancelRule(this.currentrulesData);
      }else if(this.isInstrumentEvent){
        this.instrueventComponent.cancelRule(this.currentrulesData);
      }else if(this.isCommAlertEscalation){
        this.commescalationComponent.cancelRule(this.currentrulesData);
      }else if(this.isSysAlertEscalation){
        this.sysescalationComponent.cancelRule(this.currentrulesData);
      }else if(this.isUserDefined){
        this.userdefinedComponent.cancelRule(this.currentrulesData);
      }
    }
    
  }

  public defaultSort(event: any):void{
    this.store.dispatch(new AlertRuleActions.SortRuleByName(true));
  }

  public copyRule(event: any): void{
    let copiedCurrentRule = Object.assign([], this.currentrulesData);
    copiedCurrentRule.Name = "Copy of " + this.currentrulesData.Name;
    copiedCurrentRule.Id = 0
    copiedCurrentRule.Version = 0;
    this.store.dispatch(new AlertRuleActions.AddRuleByIndex ({index: this.currentRuleIndex + 1, rule: copiedCurrentRule}));
    this.ruleSelect({},copiedCurrentRule, this.currentRuleIndex + 1);
  }

  public deleteRule(event: any): void{
    let ruleId = this.currentrulesData.Id;
    this.ruleDataService.deleteAlertRulesData(ruleId).then((data, err)=>{
      this.currentrulesData = data;
      this.store.dispatch(new AlertRuleActions.RemoveRule(ruleId))
      this.ruleSelect({},this.currentrulesData, -1);
    });
  }

  public updateRuleChangeFlag(event: any){

  }

  public sortRules(column: number): void{
    switch(column){
      case 0: 
        this.isSortByEnabledAsc = !this.isSortByEnabledAsc;
        this.sortBy = "enabled";
        this.store.dispatch(new AlertRuleActions.SortRuleByEnabled(this.isSortByEnabledAsc));
        break;
      case 1:
      this.isSortByNameAsc = ! this.isSortByNameAsc;
        this.sortBy = "name";
        this.store.dispatch(new AlertRuleActions.SortRuleByName(this.isSortByNameAsc));
        break;
      case 2:
        this.isSortByTypeAsc = !this.isSortByTypeAsc;
        //this.sortRulesByDescriptionName(this.isSortByTypeAsc);
        this.sortBy = "type";
        this.store.dispatch(new AlertRuleActions.SortRuleByDescriptionName(this.isSortByTypeAsc));
        break;
    }
  }

  public handleFocus(event){
    alert("focussed");
  }

  public createNewRule(event: any): void{
    let _this = this;
    let selectedRule;
    if(event != undefined && event.target.__data.label != "New Rule"){
      selectedRule = event.target.__data.label;
       Object.keys(ServicesConstants.ALERT_RULE_TYPE_DESCRIPTION).forEach(function(key,index) {
          switch(selectedRule){
            case "Consumable Inventory Levels Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_CILAR;
              break;
            case "Reagent Inventory Levels Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_RILAR;
              break;
            case "Calibration Expiration Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_CEAR;
              break;
            case "Reagent Expiration Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_REAR;
              break;
            case "Communication Alert Escalation Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_CAER;
              break;
            case "Waste Inventory Levels Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_WIAR;
              break;
            case "User-Defined Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_UDAR;
              break;
            case "Ancillary Reagent Inventory Levels Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_ARILAR;
              break;
            case "System Alert Escalation Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_SAER;
              break;
            case "Instrument Event Alert Rule":
              _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_IEAR;
              break;
          }
      });   
      let copiedCurrentRule = Object.assign([], this.currentrulesData);
      copiedCurrentRule["Name"] = "New Rule";
      copiedCurrentRule["TypeDescription"] = selectedRule;
      this.store.dispatch(new AlertRuleActions.AddRule(copiedCurrentRule));
      if(this.sortBy == "type"){
        this.store.dispatch(new AlertRuleActions.SortRuleByDescriptionName(true));
      }else{
        this.store.dispatch(new AlertRuleActions.SortRuleByName(true));
      }
      this.currentRuleIndex = this.getIndexForNewRule();
      this.ruleSelect( {},this.currentrulesData, this.currentRuleIndex);
      this.focusSelectedRule("New Rule");
      this.isNewCreatedRule = true;
    }
  }

  private getIndexForNewRule(): number{
    let newRuleIndex: number, index:number = 0;
    this.rulesData.subscribe(rule =>{
      rule.forEach(element => {
        if(element["Name"] == "New Rule"){
          newRuleIndex = index;  
        }
        index++;
      });
    });
    return newRuleIndex;
  }

  private focusSelectedRule(name: string): void{
    let element, _this = this;
    setTimeout(function(){
      for(let i = 0; i < _this.ruleTableBody.nativeElement.children.length; i++){
        element = _this.ruleTableBody.nativeElement.children[i]
        if(element.children[1].innerHTML == name){
          _this.ruleTableBody.nativeElement.scrollTo({left: 0 , top: element.clientHeight*(i)});
        }
      }
    }, 100);
  }

  canDeactivate(): Observable<boolean> | boolean{
    return true;
  }
}
