import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-descriptionconfigurator',
  templateUrl: './descriptionconfigurator.component.html',
  styleUrls: ['./descriptionconfigurator.component.css']
})
export class DescriptionconfiguratorComponent implements OnInit {
  @Output() onTextSubmit: EventEmitter<any> = new EventEmitter<any>();
  alertValue: number;
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }

  public setText(event){
    this.onTextSubmit.emit(this.message);
  }
}

