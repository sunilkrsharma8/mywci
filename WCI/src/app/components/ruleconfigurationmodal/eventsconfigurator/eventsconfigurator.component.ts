import { Component, OnInit, ViewChild, ElementRef, AfterViewInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-eventsconfigurator',
  templateUrl: './eventsconfigurator.component.html',
  styleUrls: ['./eventsconfigurator.component.css']
})
export class EventsconfiguratorComponent implements OnInit {
 @ViewChild('tableEvents') tableEvents: ElementRef
  @Output() onEventsSet: EventEmitter<any> = new EventEmitter<any>();
  @Input() deviceEvents: any;
  newEmail: string = "";
  filteredItems: any;
  constructor() { }

  ngOnInit() {
  }

  public setEvents(event: any): void{
    let selectedEvents: Array<string> = [];
    for(let i = 0; i < this.tableEvents.nativeElement.children.length; i++){
      let element = this.tableEvents.nativeElement.children[i];
      if(element.children[0].children[0].$.checkbox.checked){
        selectedEvents.push(this.deviceEvents[i]);
      }
    }
    this.onEventsSet.emit(selectedEvents);
  }

}
