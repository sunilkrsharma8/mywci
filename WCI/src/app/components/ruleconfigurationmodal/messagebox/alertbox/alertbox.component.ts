import { Component,AfterViewInit, OnInit, Output,Input,TemplateRef, ViewContainerRef, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements OnInit, AfterViewInit {
  @Output() onDiscardChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() maxHeight: String;
  @Input() minHeight: String;
  @Input() maxWidth: String;
  @Input() minWidth: String;
  @Input() marginLeft: String;
  @Input() marginTop: String;
  @Input() shIcon: String;
  @Input() modelHeaderContent: any;
  @Input() modelBodyContent: any;
  //@ViewChild("modalPopupHeaderContent") modalPopupHeaderContent: ElementRef;
  //@ViewChild("modalPopupBodyContent") modalPopupBodyContent: ElementRef;
  @ViewChild("modalPopup") modalPopup: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if(this.modalPopup && this.modalPopup.nativeElement &&  this.maxHeight && this.minHeight && this.maxWidth && this.minWidth && this.marginLeft && this.marginTop){
      this.modalPopup.nativeElement.shadowRoot.children[1].style.maxHeight = this.maxHeight;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.minHeight = this.minHeight;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.maxWidth = this.maxWidth;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.minWidth = this.minWidth;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.marginLeft = this.marginLeft;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.marginTop = this.marginTop;
      this.modalPopup.nativeElement.shadowRoot.children[1].style.border = "2px solid #141414";
      this.modalPopup.nativeElement.shadowRoot.children[1].style.borderRadius = "10px";
      this.modalPopup.nativeElement.shadowRoot.children[1].style.zIndex = "999";
    }
    if(this.modalPopup && this.modalPopup.nativeElement && this.shIcon!=undefined && this.shIcon=="false"){
      this.modalPopup.nativeElement.shadowRoot.children[1].children[0].style.display = "none";
    }
  }

  public discardChanges(event: any):void{
    this.onDiscardChanges.emit();
  }

  public cancelEvent(event: any):void{
    this.onCancelEvent.emit();
  }
}
