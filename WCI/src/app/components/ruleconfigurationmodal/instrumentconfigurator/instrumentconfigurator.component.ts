import { Component, OnInit, ViewChild, ElementRef, AfterViewInit , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-instrumentconfigurator',
  templateUrl: './instrumentconfigurator.component.html',
  styleUrls: ['./instrumentconfigurator.component.css']
})
export class InstrumentconfiguratorComponent implements OnInit {
  @ViewChild('tableInstrument') tableInstrument: ElementRef
  @Output() onInstrumentSet: EventEmitter<any> = new EventEmitter<any>();
  @Input() instruments: any;
  newEmail: string = "";
  filteredItems: any;
  constructor() { }

  ngOnInit() {
    this.assignCopy()
  }

  public filterItem(value){
   if(!value) this.assignCopy(); //when nothing has typed
   this.filteredItems = Object.assign([], this.instruments).filter(
      item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
   )
  }

  private assignCopy(){
    this.filteredItems = Object.assign([], this.instruments);
  }
  public setInstrument(event: any): void{
    let selectedInstruments: Array<any> = [];
    for(let i = 0; i < this.tableInstrument.nativeElement.children.length; i++){
      let element = this.tableInstrument.nativeElement.children[i];
      if(element.children[0].children[0].$.checkbox.checked){
        selectedInstruments.push(this.filteredItems[i]);
      }
    }
    this.onInstrumentSet.emit(selectedInstruments);
  }

}
