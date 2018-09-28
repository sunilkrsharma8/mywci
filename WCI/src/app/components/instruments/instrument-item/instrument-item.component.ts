import { Component, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, DoCheck, AfterContentChecked, Input, ViewChild, ElementRef, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { InstrumentItem } from './../../../models/instrument-item';
import { ServicesConstants } from "../../../services/constants.service";

@Component({
  selector: 'app-instrument-item',
  templateUrl: './instrument-item.component.html',
  styleUrls: ['./instrument-item.component.css']
})
export class InstrumentItemComponent implements OnInit, AfterViewInit {
  @ViewChild("equipmentModelTypeId") equipmentModelTypeId: ElementRef;
  @ViewChild("equipmentActiveId") equipmentActiveId: ElementRef;
  @ViewChild("remoteControlMethodId") remoteControlMethodId: ElementRef;
  @ViewChild("remoteControlThumbUpdateId") remoteControlThumbUpdateId: ElementRef;
  @ViewChild("rcPort") rcPort: ElementRef;
  @ViewChild("rcPassword") rcPassword: ElementRef;
  @ViewChild("instumentIcon") instumentIcon: ElementRef;
  @ViewChild("matPanelExpansion") matPanelExpansion: ElementRef;
  
  @Input() data: InstrumentItem;
  @Input() parrentComponent: any;
  @Input() instrumentComp: any;
  servicesConstants: ServicesConstants;
  remoteControlType: string;
  rCThumbnailUpdate: string;
  equipmentModelData: Array<any>;
  isRcDisabled: false;
  icon: string = "patient";
  isDataChanged: boolean = false;
  isCancelDisabled: boolean = true;
  constructor() {
  }

  ngOnInit() {
    this.setRemoteControlType();
    this.setRCThumbnailUpdate();
    if (ServicesConstants.EQUIPMENT_MODEL_ICON[this.data.EquipmentModelId]) {
      this.icon = ServicesConstants.EQUIPMENT_MODEL_ICON[this.data.EquipmentModelId];
    }
  }

  ngAfterViewInit() {
    if(this.data.Id===0){
      this.parrentComponent.currentMatExpansionPanel = this.matPanelExpansion;
      this.parrentComponent.currentMatExpansionPanel .open();
      this.parrentComponent.matExpansionPanelItemSwape(this.data, this.matPanelExpansion);
    }
  }

  save(InstrumentData: any): void {
    InstrumentData = this.setRemoteControlConnectionString(InstrumentData);
    this.instrumentComp.saveInstrumentItem(InstrumentData);
  }
  setRCThumbnailUpdate(): void {
    if (this.data.RemoteControl != null) {
      if (this.data.RemoteControl.ThumbnailUpdateMode == 1) {
        this.rCThumbnailUpdate = "When User Is Logged In";
      } else if (this.data.RemoteControl.ThumbnailUpdateMode == 0) {
        this.rCThumbnailUpdate = "Always";
      } else {
        this.rCThumbnailUpdate = "Never";
      }
    }
  }

  setRemoteControlType(): void {
    if (this.data.RemoteControl != null) {
      if (this.data.RemoteControl.Method == 1) {
        this.remoteControlType = "VNC";
      } else if (this.data.RemoteControl.Method == 0) {
        this.remoteControlType = "None";
      } else {
        this.remoteControlType = "Remote Desktop";
      }
    }
  }

  setRemoteControlConnectionString(InstrumentData: any): any {
    if (InstrumentData.RemoteControl && InstrumentData.RemoteControl.Address && InstrumentData.RemoteControl.Port) {
      InstrumentData.RemoteControl.ConnectionString = 'rfb:\/\/rti@'.concat(InstrumentData.RemoteControl.Address).concat('@').concat(InstrumentData.RemoteControl.Port);
    }
    return InstrumentData;
  }

  delete(InstrumentData: any): void {
    this.instrumentComp.deleteInstumentItem(InstrumentData);
  }

  cancel(): void {
    this.parrentComponent.isShowAlertBox = !this.parrentComponent.isShowAlertBox;
  }

  expandCollapse(itemData: any, matExpansionPanel: any): void {
    if (itemData.isExpanded) {
      if (this.rcPassword) {
        this.rcPassword.nativeElement.shadowRoot.children[1].firstElementChild.setAttribute("type", "password");
      }
    }
    this.parrentComponent.expandOverviewCollapse(itemData, matExpansionPanel);
  }
}



