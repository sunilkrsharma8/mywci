import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-durationconfigurator',
  templateUrl: './durationconfigurator.component.html',
  styleUrls: ['./durationconfigurator.component.css']
})
export class DurationconfiguratorComponent implements OnInit {
  @Input() title: string;
  @Output() onDurationSet: EventEmitter<any> = new EventEmitter<any>();
  hours: number = 0;
  minutes: number = 0;
  days: number = 0;
  filteredItems: any;
  constructor() { }
  ngOnInit() {
  }

  public setDuration(event: any): void {
    let duration: number;
    duration = this.days * 24 * 60 * 60 + this.hours * 60 * 60 + this.minutes * 60;
    this.onDurationSet.emit(duration);
  }
}
