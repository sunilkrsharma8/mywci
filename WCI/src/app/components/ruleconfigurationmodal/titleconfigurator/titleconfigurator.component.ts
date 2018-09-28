import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-titleconfigurator',
  templateUrl: './titleconfigurator.component.html',
  styleUrls: ['./titleconfigurator.component.css']
})
export class TitleconfiguratorComponent implements OnInit {
 @Output() onTitleSelection: EventEmitter<any> = new EventEmitter<any>();
 @Input() title: string = "";
  constructor() { }

  ngOnInit() {
  }

  public setTitle(event){
    this.onTitleSelection.emit({name: this.title}); 
  }
}