import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const dayInstance = {
      "First": 1,
      "Second": 2,
      "Third": 3,
      "Fourth": 4,
      "Last": 5
    };

const daysofWeekMask = {
      "Monday": 2,
      "Tuesday": 4,
      "Wednesday": 8,
      "Thursday": 16,
      "Friday": 32,
      "Saturday": 64,
      "Sunday": 1
    };

const monthofYear = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September":9,
    "October": 10,
    "November": 11,
    "December": 12
};
@Component({
  selector: 'app-occurrencepatternconfigurator',
  templateUrl: './occurrencepatternconfigurator.component.html',
  styleUrls: ['./occurrencepatternconfigurator.component.css']
})
export class OccurrencepatternconfiguratorComponent implements OnInit {
@Output() onRecurrencePatternSelection: EventEmitter<any> = new EventEmitter<any>();
  alertValue: number;
  @Input() occurencePattern: any;
  @Input() alertType: string;
  occurenceFrequency: string;
  isInputTextDisabled: boolean = true;
  constructor() {
    
   }

  ngOnInit() {
  }

  public setRecurrencePattern(event){
    this.onRecurrencePatternSelection.emit(this.occurencePattern);
  }

  public handleRadioClick(event){
    switch(event.target.id){
        case "rbtnNoOccurence":
        this.occurencePattern["RecurrenceType"] = 0;
        break;

        case "rbtnHourly":
        this.occurencePattern["RecurrenceType"] = 1;
        break;

        case "rbtnDaily":
        this.occurencePattern["RecurrenceType"] = 2;
        break;

        case "rbtnWeekly":
        this.occurencePattern["RecurrenceType"] = 3;
        this.occurencePattern["DaysOfWeekMask"] = 0
        break;

        case "rbtnMonthly":
        this.occurencePattern["RecurrenceType"] = 4;
        break;

        case "rbtnYearly":
        this.occurencePattern["RecurrenceType"] = 5;
        break;

        case "rbtnMonthly1":
        this.occurencePattern["RecurrenceType"] = 4;
        break;

        case "rbtnMonthly2":
        this.occurencePattern["RecurrenceType"] = 7;
        break;

        case "rbtnYearly1":
        this.occurencePattern["RecurrenceType"] = 5;
        break;

        case "rbtnYearly2":
        this.occurencePattern["RecurrenceType"] = 8;
        break;
    }
  }

  public setOccurenceInstance(event: any): void{
     if(event != undefined && event.target.__data.label != ""){
      this.occurencePattern["Instance"] = dayInstance[event.target.__data.label];
     }
  }

  public setDaysofWeekMask(event: any): void{
    if(event != undefined && event.target.__data.label != ""){
      this.occurencePattern["DaysOfWeekMask"] = daysofWeekMask[event.target.__data.label];
     }
  }

  public setOccurenceMonth(event: any): void{
    if(event != undefined && event.target.__data.label != ""){
      this.occurencePattern["MonthOfYear"] = monthofYear[event.target.__data.label];
     }
  }

  public handleDaysCheckBXClick(event: any): void{
    switch(event.target.id){
      case "chkbxSunday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Sunday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Sunday"];
        }
      break;

      case "chkbxMonday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Monday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Monday"];
        }

      break;
      
      case "chkbxTuesday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Tuesday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Tuesday"];
        }
      break;

      case "chkbxWednesday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Wednesday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Wednesday"];
        }
      break;

      case "chkbxThursday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Thursday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Thursday"];
        }
      break;

      case "chkbxFriday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Friday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Friday"];
        }
      break;

      case "chkbxSaturday":
        if(event.target.$.checkbox.checked){
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] + daysofWeekMask["Saturday"];
        }else{
          this.occurencePattern["DaysOfWeekMask"] = this.occurencePattern["DaysOfWeekMask"] - daysofWeekMask["Saturday"];
        }
      break;
    }
  }
}

