import { Component, OnInit, Input, AfterViewInit, OnChanges, ViewChild } from '@angular/core';
import { HelperFunctions } from "../../../services/helper.functions";
import { Subject }    from 'rxjs';
import { SharedruleparamsComponent } from "../sharedruleparams";
import { ServicesConstants } from "../../../services/constants.service";
import { RuleDataService } from '../../../services/rule.data.service';


@Component({
  selector: 'app-communicationescalation',
  templateUrl: './communicationescalation.component.html',
  styleUrls: ['./communicationescalation.component.css']
})
export class CommunicationescalationComponent implements OnInit {
  @Input() emailsList: Array<string>;
  @Input() isNewRule: boolean;
  @ViewChild("srpComponent") srpComponent: SharedruleparamsComponent;
  instrumentText: string = "All Current and Future Instruments";//"unspecified instrument(s)"; //
  isShowAssetModal: boolean = false;
  updatedRuleData: any;
  instruments: Array<any> = [];
  allInstruments: any;
  @Input() ruleData;
  ruleDataService: RuleDataService;
  
  constructor(ruleDataService: RuleDataService) { 
    this.ruleDataService = ruleDataService;
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
      }else{
        this.instruments = [-1];
        this.instrumentText = "unspecified instrument(s)"; 
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
  }

  public updateInstruments(selectedinstruments: any){
    if(selectedinstruments.length > 0){
      this.instruments = [];
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
