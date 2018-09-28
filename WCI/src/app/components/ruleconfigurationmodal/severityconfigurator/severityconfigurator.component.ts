import { Component, OnInit, ViewChild, ElementRef, AfterViewInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-severityconfigurator',
  templateUrl: './severityconfigurator.component.html',
  styleUrls: ['./severityconfigurator.component.css']
})
export class SeverityconfiguratorComponent implements OnInit {
  @ViewChild('groupSeverity') groupSeverity: ElementRef
  @Output() onSeveritySet: EventEmitter<any> = new EventEmitter<any>();
  severityList: any;
  newEmail: string = "";
  filteredItems: any;
  constructor() { 
    this.severityList = [
      {
        "id": 0,
        "description": "No Alert"
      },
      {
        "id": 50,
        "description": "an Information Alert"
      },
      {
        "id": 100,
        "description": "a Warning Alert"
      },
      {
        "id": 200,
        "description": "a Critical Alert"
      },
    ];
  }
  ngOnInit() {
  }

  public setSeverity(event: any): void{
    let severity: any;
    for(let i = 0; i < this.groupSeverity.nativeElement.children.length; i++){
      let element = this.groupSeverity.nativeElement.children[i];
      if(element.$.radioBtn.checked){
        severity = this.severityList[i]["id"];
        break;
      }
    }
    this.onSeveritySet.emit(severity);
  }

}
