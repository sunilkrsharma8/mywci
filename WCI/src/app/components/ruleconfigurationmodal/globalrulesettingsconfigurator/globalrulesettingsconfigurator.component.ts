import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-globalrulesettingsconfigurator',
  templateUrl: './globalrulesettingsconfigurator.component.html',
  styleUrls: ['./globalrulesettingsconfigurator.component.css']
})
export class GlobalrulesettingsconfiguratorComponent implements OnInit {
  @Input() settings: Array<any>;
  @Output() onGlobalRuleSet: EventEmitter<any> = new EventEmitter<any>();
  STAT_TATStartEvent: string;
  STAT_TATEndEvent: string;
  Routine_TATStartEvent: string;
  Routine_TATEndEvent: string;
  text: string = "ABC";
  canSaveRule: boolean;

  constructor() { }

  ngOnInit() {
    this.STAT_TATStartEvent = this.settings.find(setting => setting.Name == "STAT_TATStartEvent").Value;
    this.STAT_TATEndEvent = this.settings.find(setting => setting.Name == "STAT_TATEndEvent").Value;
    this.Routine_TATStartEvent = this.settings.find(setting => setting.Name == "Routine_TATStartEvent").Value;
    this.Routine_TATEndEvent = this.settings.find(setting => setting.Name == "Routine_TATEndEvent").Value;
  }

  public saveGLSettings(setting: any): void{
    this.settings.find(setting => setting.Name == "STAT_TATStartEvent").Value  = this.STAT_TATStartEvent;
    this.settings.find(setting => setting.Name == "Routine_TATStartEvent").Value = this.Routine_TATStartEvent;
    this.onGlobalRuleSet.emit(this.settings);
  }

  public cancelGLSettings():void{
    this.onGlobalRuleSet.emit("");
  }

  public setGRSettingforRoutine(event: any): void{
    if(event != undefined && event.target.__data.label != ""){
      //this.settings.find(setting => setting.Name == "STAT_TATStartEvent").Value = event.target.__data.label.replace(" ","");
      this.Routine_TATStartEvent = event.target.__data.label;
      this.Routine_TATStartEvent = this.Routine_TATStartEvent.replace(/ /g,"");
    }

    if(this.STAT_TATStartEvent != this.settings.find(setting => setting.Name == "STAT_TATStartEvent").Value || this.Routine_TATStartEvent != this.settings.find(setting => setting.Name == "Routine_TATStartEvent").Value){
      this.canSaveRule = true;
    }
  }

  public setGRSettingforSTAT(event: any): void{
    if(event != undefined && event.target.__data.label != ""){
      //this.settings.find(setting => setting.Name == "Routine_TATStartEvent").Value = event.target.__data.label.replace(" ","");
      this.STAT_TATStartEvent = event.target.__data.label;
      this.STAT_TATStartEvent = this.STAT_TATStartEvent.replace(/ /g,"");
    }

    if(this.STAT_TATStartEvent != this.settings.find(setting => setting.Name == "STAT_TATStartEvent").Value || this.Routine_TATStartEvent != this.settings.find(setting => setting.Name == "Routine_TATStartEvent").Value){
      this.canSaveRule = true;
    }
  }

}
