import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { ServicesConstants } from "../../../services/constants.service";
import { RuleDataService } from '../../../services/rule.data.service';

@Component({
  selector: 'app-systemescalation',
  templateUrl: './systemescalation.component.html',
  styleUrls: ['./systemescalation.component.css']
})
export class SystemescalationComponent implements OnInit {
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  isShowAssetModal: boolean = false;
  updatedRuleData: any;
  instruments: Array<string> = [];
  allInstruments: any;
  @Input() ruleData;
  ruleDataService: RuleDataService;
  
  constructor(ruleDataService: RuleDataService) { 
    this.ruleDataService = ruleDataService;
  }

  ngOnInit() {
  }

  ngOnChanges(){
    this.updatedRuleData = Object.assign({}, this.ruleData);
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
    this.srpComponent.cancelRule(ruleData);
  }

  public getUpdatedRuleData(): any{
    return this.updatedRuleData;
  }
}
