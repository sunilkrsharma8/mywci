import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datetimeconfigurator',
  templateUrl: './datetimeconfigurator.component.html',
  styleUrls: ['./datetimeconfigurator.component.css']
})
export class DatetimeconfiguratorComponent implements OnInit {
  @Output() onAlertDateTimeSelection: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("time") time: ElementRef; 
  alertValue: number;
  alertDate: any;
  alertTime: any;
  constructor() { }

  ngOnInit() {
    let currentDate = new Date();
    this.alertDate = {
      "year":currentDate.getFullYear(),
      "month":currentDate.getMonth() + 1,
      "day": currentDate.getDate()
    }

    let hours;
    let minutes = currentDate.getMinutes();
    if(currentDate.getHours() < 10){
     hours = "0" + currentDate.getHours();
    }else{
      hours = currentDate.getHours();
    }
    this.alertTime = hours + ":" + minutes + ":00.000";
  }

  public setAlertDateTime(date){
      this.onAlertDateTimeSelection.emit({date: this.alertDate, time: this.alertTime});
  }

  public pickTime(time){
    this.alertTime = time;
  }

  public pickDate(date){
    this.alertDate["year"] = date.year;
    this.alertDate["month"] = date.month;
    this.alertDate["day"] = date.day;
  }
}

