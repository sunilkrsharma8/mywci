import { Component, OnInit,OnChanges, SimpleChanges, AfterViewInit, AfterContentInit, AfterViewChecked, DoCheck, AfterContentChecked, Input, ViewChild, ElementRef, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { MatSort, MatIcon } from '@angular/material';
import { ManageIntegrationItem } from './../../../../models/manage-integration-item';

@Component({
  selector: 'app-manage-integration-item',
  templateUrl: './manage-integration-item.component.html',
  styleUrls: ['./manage-integration-item.component.css']
})
export class ManageIntegrationItemComponent implements OnInit {

  constructor() { }

  @Input() data: ManageIntegrationItem;
  @Input() parrentComponent: any;
  @Input() manageIntegrationComp: any;
  @ViewChild("matPanelExpansion") matPanelExpansion: ElementRef;
  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.data.Id===0){
      this.parrentComponent.currentMatExpansionPanel = this.matPanelExpansion;
      this.parrentComponent.currentMatExpansionPanel .open();
      this.parrentComponent.matExpansionPanelItemSwape(this.data, this.matPanelExpansion);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
    }
  }

  save(extSysData: any): void {
    this.manageIntegrationComp.saveManageIntegrationItem(extSysData);
  }

  delete(extSysId: any): void {
    this.manageIntegrationComp.deleteManageIntegrationItem(extSysId);
  }

  cancel(): void {
    this.parrentComponent.isShowAlertBox = !this.parrentComponent.isShowAlertBox;
  }

  expandCollapse(itemData: any, matExpansionPanel: any): void {
    this.parrentComponent.expandOverviewCollapse(itemData, matExpansionPanel);
  }

}
