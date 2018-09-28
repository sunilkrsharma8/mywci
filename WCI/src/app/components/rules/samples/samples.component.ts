import { Component, OnInit, Inject, Input, Directive, Output, ViewChild, ElementRef } from '@angular/core';
import { RuleDataService } from '../../../services/rule.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServicesConstants } from "../../../services/constants.service";
import { TurnaroundtimeComponent } from "../../rulenaturallanguage/turnaroundtime";

import { Store } from '@ngrx/store';
import { SampleRule } from './../../../models/samplerule';
import { AppState } from './../../../app.state';
import * as SampleRuleActions from './../../../actions/samplerules.actions';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {
  @ViewChild("ruleTableBody") ruleTableBody: ElementRef;
  @ViewChild("tatComponent") tatComponent: TurnaroundtimeComponent;
  ruleTypeList: any;
  selectedRowRuleType: number = 1;
  menuList: any;
  selected: any;
  isDrawWall: boolean = false;
  ruleDataService: RuleDataService;
  sampleRulesData: Observable<SampleRule[]>;
  currentrulesData: any;
  currentRuleIndex: number;
  currentRule: any = 1;
  isTurnAroundTime: boolean = false;
  emailsList: Array<any> = [];
  isNewCreatedRule: boolean = false;
  sortBy: string;
  isSortByEnabledAsc: boolean = false;
  isSortByNameAsc: boolean = false;
  isSortByTypeAsc: boolean = false;
  isShowGRSettings: boolean = false;
  globalRuleSettings: Array<any>;

  constructor(ruleDataService: RuleDataService, private store: Store<AppState>) {
    this.ruleDataService = ruleDataService;
    this.sampleRulesData = store.select('samplerule');
  }

  /**
   * Called before initialization
   */
  ngOnInit() {
    this.ruleDataService.getSampleTestRulesData().then((data) => {
      this.store.dispatch(new SampleRuleActions.EmptySample());
      data.forEach(element => {
        this.store.dispatch(new SampleRuleActions.AddSampleRule(element));
      });
      //    this.rulesData = data;

      this.updateRuleDescription();
      this.store.dispatch(new SampleRuleActions.SortSampleRuleByDescriptionName(true));
      this.sampleRulesData.subscribe(rule => {
        this.currentrulesData = rule[0];
        this.ruleSelect({}, rule[0], 0);
      });

    });

    this.ruleDataService.getGlobalRuleSettingsData("Samples").then((data) => {
      this.globalRuleSettings = data;
    });

    document.getElementById('navSettingsRulesSamples').setAttribute('active','true');
  }

  public ruleSelect(event: any, rule: any, index: any) {
    this.currentRuleIndex = index;
    this.currentrulesData = rule;
    if (rule != null || rule != undefined) {
      this.currentRule = rule.Id;
    }

    if (this.currentrulesData == null || this.currentrulesData == undefined) {
      this.hideAllNaturalLanguageRules();
    } else {
      this.isTurnAroundTime = true;
    }
  }

  hideAllNaturalLanguageRules() {
    this.isTurnAroundTime = false;
  }

  private updateRuleDescription() {
    this.sampleRulesData.subscribe(rules => {
      rules.forEach(element => {
        element["TypeDescription"] = (element.OverdueDuration == null && element.AtRiskDuration == null) ? ServicesConstants.TEST_RULE_TYPE_DESCRIPTION[1] : ServicesConstants.TEST_RULE_TYPE_DESCRIPTION[2];
        //  this.store.dispatch(new SampleRuleActions.UpdateRuleDescription(element));
      });
    });
  }

  public saveRule(event: any): void {
    let updateRuleData
    if (this.isTurnAroundTime) {
      updateRuleData = this.tatComponent.getUpdatedRuleData();
    }
    this.ruleDataService.setSampleTestRulesData(updateRuleData).then((data, err) => {
      if (data && (Object.keys(data).length != 0)) {
        this.currentrulesData = data;
        // this.rulesData[this.currentRuleIndex] = data;
        //  this.updateRuleDescription();
        this.store.dispatch(new SampleRuleActions.UpdateSampleRule(data));
        this.ruleSelect({}, data, this.currentRuleIndex);
        this.isNewCreatedRule = false;
      }
    });
  }

  public cancelRule(event: any): void {
    if (this.isNewCreatedRule) {
      this.hideAllNaturalLanguageRules();
      this.store.dispatch(new SampleRuleActions.RemoveSampleRuleByIndex(this.currentRuleIndex));
      // this.sampleRulesData.splice(this.currentRuleIndex, 1);
      this.isNewCreatedRule = false;
    } else {
      if (this.isTurnAroundTime) {
        this.tatComponent.cancelRule(this.currentrulesData);
      }
    }

  }

  public defaultSort(event: any): void {
    //    this.sortRulesByName(true);
    this.store.dispatch(new SampleRuleActions.SortSampleRuleByName(true));
  }

  public copyRule(event: any): void {
    let copiedCurrentRule = Object.assign([], this.currentrulesData);
    copiedCurrentRule.Name = "Copy of " + this.currentrulesData.Name;
    copiedCurrentRule.Id = 0
    copiedCurrentRule.Version = 0;
    //  this.rulesData.splice(this.currentRuleIndex + 1, 0, copiedCurrentRule);
    this.store.dispatch(new SampleRuleActions.AddSampleRuleByIndex({ index: this.currentRuleIndex + 1, rule: copiedCurrentRule }));
    this.ruleSelect({}, copiedCurrentRule, this.currentRuleIndex + 1);
  }

  public deleteRule(event: any): void {
    let ruleId = this.currentrulesData.Id;
    this.ruleDataService.deleteSampleTestRulesData(ruleId).then((data, err) => {
      this.currentrulesData = data;
      //  this.rulesData.splice(this.currentRuleIndex, 1);
      this.store.dispatch(new SampleRuleActions.RemoveSampleRule(ruleId))
      this.ruleSelect({}, this.currentrulesData, -1);
    });
  }

    public setGlobalRuleSettings(event: any):void{
      this.isShowGRSettings = true;
    }
  
    public onSetGlobalRuleSettings(settings: any): void{
      if(settings != ""){
        var setting = settings.find(setting => setting.Name == "STAT_TATStartEvent");
          this.ruleDataService.setGlobalRuleSettingsData(setting).then((data, err)=>{
        });
  
        setting = settings.find(setting => setting.Name == "Routine_TATStartEvent");
          this.ruleDataService.setGlobalRuleSettingsData(setting).then((data, err)=>{
        });
      }
      this.isShowGRSettings = false;
    }

  public sortRules(column: number): void {
    switch (column) {
      case 0:
        this.isSortByEnabledAsc = !this.isSortByEnabledAsc;
        this.sortBy = "enabled";
        this.store.dispatch(new SampleRuleActions.SortSampleRuleByEnabled(this.isSortByEnabledAsc));
        //  this.sortRulesByEnabled(this.isSortByEnabledAsc);
        break;
      case 1:
        this.isSortByNameAsc = !this.isSortByNameAsc;
        //  this.sortRulesByName(this.isSortByNameAsc);
        this.sortBy = "name";
        this.store.dispatch(new SampleRuleActions.SortSampleRuleByName(this.isSortByNameAsc));
        break;
      case 2:
        this.isSortByTypeAsc = !this.isSortByTypeAsc;
        //  this.sortRulesByDescriptionName(this.isSortByTypeAsc);
        this.sortBy = "type";
        this.store.dispatch(new SampleRuleActions.SortSampleRuleByDescriptionName(this.isSortByTypeAsc));
        break;
    }
  }

  public createNewRule(event: any): void {
    let _this = this;
    let selectedRule;
    if (event != undefined && event.target.__data.label != "New Rule") {
      selectedRule = event.target.__data.label;
      Object.keys(ServicesConstants.TEST_RULE_TYPE_DESCRIPTION).forEach(function (key, index) {
        switch (selectedRule) {
          case "Turnaround Time Rule":
            _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_STTT;
            break;
          case "On-Time STAT Display Rule":
            _this.currentrulesData = ServicesConstants.EMPTY_RULE_DATA_STOTSD;
            break;
        }
      });
      let copiedCurrentRule = Object.assign([], this.currentrulesData);
      copiedCurrentRule["Name"] = "New Rule";
      copiedCurrentRule["TypeDescription"] = selectedRule;
      //   this.rulesData.push(copiedCurrentRule);
      this.store.dispatch(new SampleRuleActions.AddSampleRule(copiedCurrentRule));
      if (this.sortBy == "type") {
        //   this.sortRulesByDescriptionName(true);
        this.store.dispatch(new SampleRuleActions.SortSampleRuleByDescriptionName(true));
      } else {
        //   this.sortRulesByName(true);
        this.store.dispatch(new SampleRuleActions.SortSampleRuleByName(true));
      }
      this.currentRuleIndex = this.getIndexForNewRule();
      this.ruleSelect({}, this.currentrulesData, this.currentRuleIndex);
      this.focusSelectedRule("New Rule");
      this.isNewCreatedRule = true;
    }
  }

  private getIndexForNewRule(): number {
    let newRuleIndex: number, index: number = 0;
    this.sampleRulesData.subscribe(rule => {
      rule.forEach(element => {
        if (element["Name"] == "New Rule") {
          newRuleIndex = index;
        }
        index++;
      });
    });
    return newRuleIndex;
  }

  private focusSelectedRule(name: string): void {
    let element, _this = this;
    setTimeout(function () {
      for (let i = 0; i < _this.ruleTableBody.nativeElement.children.length; i++) {
        element = _this.ruleTableBody.nativeElement.children[i]
        if (element.children[1].innerHTML == name) {
          _this.ruleTableBody.nativeElement.scrollTo({ left: 0, top: element.clientHeight * (i) });
        }
      }
    }, 100);
  }

  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }
}
