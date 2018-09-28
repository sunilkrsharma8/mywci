import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RuleDataService } from '../../../../services/rule.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-informationbox',
  templateUrl: './informationbox.component.html',
  styleUrls: ['./informationbox.component.css']
})
export class InformationboxComponent implements OnInit {
  @Output() onCancelEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() modalType: string;
  @Input() activeAlertsData: any;
  noAlertsToResolve: boolean;
  resolveActiveAlerts: boolean;
  ruleDataService: RuleDataService;
  newAlertData: any;
  sortBy: string;
  isSortByMessageAsc: boolean = false;

  constructor(ruleDataService: RuleDataService) {
    this.ruleDataService = ruleDataService;
  }

  ngOnInit() {
    this.modalType == "noAlertsToResolve" ? this.noAlertsToResolve = true : this.modalType == "resolveActiveAlerts" ? this.resolveActiveAlerts = true : null;
    this.activeAlertsData.forEach(element => {
      this.ruleDataService.getResolveAlerts(element.Id).then((data, err) => {
        this.activeAlertsData[this.activeAlertsData.indexOf(this.activeAlertsData.find(x => x.Id == element.Id))]["Status"] = data.Status;
        this.activeAlertsData[this.activeAlertsData.indexOf(this.activeAlertsData.find(x => x.Id == element.Id))]["Occurred"] = this.constructAlertTimeText(data.Time);
      });
    });
  }

  public cancelEvent(event: any): void {
    this.onCancelEvent.emit();
  }

  public resolveAllAlerts(event: any): void {
    this.activeAlertsData.forEach(element => {
      this.ruleDataService.resolveAlerts(element.Id).then((data, err) => {
        console.log(data);
        this.onCancelEvent.emit();
      });
    });

  }

  public sortEvents(column: number): void {
    switch (column) {
      case 0:
      /*   this.isSortByMessageAsc = !this.isSortByMessageAsc;
         this.sortEventsByMessage(this.isSortByMessageAsc);
         break;*/
      case 1:
        this.isSortByMessageAsc = !this.isSortByMessageAsc;
        this.sortEventsByMessage(this.isSortByMessageAsc);
        break;

    }
  }

  private constructAlertTimeText(alertTime: any): any {
    var strAlertTime = alertTime;
    if (strAlertTime.indexOf("-") != -1) {
      var alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("-") - strAlertTime.indexOf("(") - 1);
      var offset = strAlertTime.substr(strAlertTime.indexOf("-") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("-") - 1);
      alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0, 2)) * 60 * 60 * 1000 + parseInt(offset.substr(2, 2)) * 60 * 1000;
    } else if (strAlertTime.indexOf("+") != -1) {
      var alertimeinMilliSec = strAlertTime.substr(strAlertTime.indexOf("(") + 1, strAlertTime.indexOf("+") - strAlertTime.indexOf("(") - 1);
      var offset = strAlertTime.substr(strAlertTime.indexOf("+") + 1, strAlertTime.indexOf(")") - strAlertTime.indexOf("+") - 1);
      alertimeinMilliSec = alertimeinMilliSec - parseInt(offset.substr(0, 2)) * 60 * 60 * 1000 + parseInt(offset.substr(2, 2)) * 60 * 1000;
    }
    alertTime = new Date(parseInt(alertimeinMilliSec));
    return alertTime.toLocaleString();
  }

  private sortEventsByMessage(isAscending: boolean) {
    this.sortBy = "Message";
    this.activeAlertsData.sort(function (event1: any, event2: any): number {
      var textNameA = event1.Message.toUpperCase();
      var textNameB = event2.Message.toUpperCase();
      if (isAscending) {
        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
      } else {
        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
      }
    });
  }

}

