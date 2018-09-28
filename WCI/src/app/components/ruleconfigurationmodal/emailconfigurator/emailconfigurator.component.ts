import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emailconfigurator',
  templateUrl: './emailconfigurator.component.html',
  styleUrls: ['./emailconfigurator.component.css']
})
export class EmailconfiguratorComponent implements OnInit, AfterViewInit {
  @ViewChild('tableEmail') tableEmail: ElementRef
  @Output() onEmailSet: EventEmitter<any> = new EventEmitter<any>();
  @Input() emails: any;
  newEmail: string = "";
  emailExp: any = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
  invalidEmail: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public onLoadTable($event: any): void {
    alert("Loaded");
  }

  ngAfterViewInit() {

    for (let i = 0; i < this.tableEmail.nativeElement.children.length; i++) {
      let element = this.tableEmail.nativeElement.children[i];
      setTimeout(() => {
        this.tableEmail.nativeElement.children[i].children[0].children[0].$.checkbox.checked = this.emails[i++].selected;
      }, 1000);
    }

  }

  public setEmail(event: any): void {

    let selectedEmails: Array<string> = [];
    for (let i = 0; i < this.tableEmail.nativeElement.children.length; i++) {
      let element = this.tableEmail.nativeElement.children[i];
      if (element.children[0].children[0].$.checkbox.checked) {
        selectedEmails.push(this.emails[i].id);
      }
    }
    this.onEmailSet.emit({ selected: selectedEmails, allemails: this.emails });
  }

  public addEmail(event: any): void {
    if (this.newEmail != "" && this.emailExp.test(this.newEmail) !== false) {
      this.emails.push({ id: this.newEmail, selected: false });
      this.invalidEmail = false;
    }
    else {
      this.invalidEmail = true;
    }
    this.newEmail = "";
    setTimeout(() => {
      this.invalidEmail = false;
    }, 2000);
  }

}
