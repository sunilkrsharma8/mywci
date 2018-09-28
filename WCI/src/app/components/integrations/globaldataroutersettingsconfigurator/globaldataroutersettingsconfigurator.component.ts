import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-globaldataroutersettingsconfigurator',
  templateUrl: './globaldataroutersettingsconfigurator.component.html',
  styleUrls: ['./globaldataroutersettingsconfigurator.component.css']
})
export class GlobaldataroutersettingsconfiguratorComponent implements OnInit {
  @Input() settings: Array<any>;
  @Output() onGlobalDRSettingsSet: EventEmitter<any> = new EventEmitter<any>();
  IP: string;
  port: string;

  constructor() { }

  ngOnInit() {
    this.IP = this.settings.find(setting => setting.Name == "DataRouterConfig_IP").Value;
    this.port = this.settings.find(setting => setting.Name == "DataRouterConfig_Port").Value;
  }

  public saveGDRSettings(setting: any): void{
    this.settings.find(setting => setting.Name == "DataRouterConfig_IP").Value  = this.IP;
    this.settings.find(setting => setting.Name == "DataRouterConfig_Port").Value = this.port;
    this.onGlobalDRSettingsSet.emit(this.settings);
  }

  public cancelGDRSettings():void{
    this.onGlobalDRSettingsSet.emit("");
  }

}
