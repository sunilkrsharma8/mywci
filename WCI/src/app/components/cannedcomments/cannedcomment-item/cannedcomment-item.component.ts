import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NoteTemplate } from './../../../models/notetemplate';
import { ServicesConstants } from "../../../services/constants.service";

@Component({
  selector: 'app-cannedcomment-item',
  templateUrl: './cannedcomment-item.component.html',
  styleUrls: ['./cannedcomment-item.component.css']
})
export class CannedcommentItemComponent implements OnInit {
  @Input() data: NoteTemplate;
  @Input() parrentComponent: any;
  @Input() cannedCommentComp: any;
  @ViewChild("matPanelExpansion") matPanelExpansion: ElementRef;
  servicesConstants: ServicesConstants;
  isFieldChanged: boolean = false;
  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.data.Id === 0) {
      this.parrentComponent.currentMatExpansionPanel = this.matPanelExpansion;
      this.parrentComponent.currentMatExpansionPanel .open();
      this.parrentComponent.matExpansionPanelItemSwape(this.data, this.matPanelExpansion);
    }
  }

  public save(cannedCommentData: any): void {
    this.cannedCommentComp.saveCannedComment(cannedCommentData);
    this.isFieldChanged = false;
  }


  public delete(cannedCommentData: any): void {
    this.cannedCommentComp.deleteCannedComment(cannedCommentData);
  }

  public cancel(): void {
    this.parrentComponent.isShowAlertBox = !this.parrentComponent.isShowAlertBox;
  }

  public expandCollapse(itemData: any, matExpansionPanel: any): void {
    this.parrentComponent.expandOverviewCollapse(itemData, matExpansionPanel);
  }
}


