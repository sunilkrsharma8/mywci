import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertconfigurator',
  templateUrl: './alertconfigurator.component.html',
  styleUrls: ['./alertconfigurator.component.css']
})
export class AlertconfiguratorComponent implements OnInit {
  @Output() onAlertSelection: EventEmitter<any> = new EventEmitter<any>();
  alertValue: number;
  @Input() configurabletext1: string;
  @Input() configurabletext2: string;
  @Input() configurabletext3: string;
  @Input() isShowTextBox: boolean = false;;
  @Input() alertType: string;
  isInputTextDisabled: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  public setAlert(event){
    if(this.alertValue == undefined){
      this.onAlertSelection.emit({value: -1, type: this.alertType}); 
    }else{
      this.onAlertSelection.emit({value: this.alertValue, type: this.alertType}); 
    }
  }

  public handleRadioClick(event){
    if(event.target.id == "chbx_generate"){
      this.isInputTextDisabled =  false;
      this.alertValue = 0;
    }else if(event.target.id == "chbx_donotgenerate"){
      this.isInputTextDisabled =  true;
      //this.alertValue = -1;
    }
  }
}

