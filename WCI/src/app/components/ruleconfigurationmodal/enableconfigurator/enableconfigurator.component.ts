import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-enableconfigurator',
  templateUrl: './enableconfigurator.component.html',
  styleUrls: ['./enableconfigurator.component.css']
})
export class EnableconfiguratorComponent implements OnInit {
@Output() onEnable: EventEmitter<any> = new EventEmitter<any>();
@Input() ruleEnabled: boolean;
@ViewChild("chkboxenable") checkBoxEnable: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  public setEnable(event){
    if(this.checkBoxEnable.nativeElement.$.checkbox.checked){
      this.ruleEnabled = true;
      this.onEnable.emit({enabled:true}); 
    }else{
      this.ruleEnabled = false;
      this.onEnable.emit({enabled:false}); 
    }
  }
}
