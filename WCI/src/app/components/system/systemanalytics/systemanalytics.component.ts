import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-systemanalytics',
  templateUrl: './systemanalytics.component.html',
  styleUrls: ['./systemanalytics.component.css']
})
export class SystemanalyticsComponent implements OnInit {


  divState: boolean = true;
  testConnection: boolean = false;
  synchWithServer: boolean = false;
  address: boolean = true;
  username1: boolean = true;
  username2: boolean = true;
  password1: boolean = true;
  password2: boolean = true;

  constructor() {

  }

  ngOnInit() {
  }

  public enableDiv() {
    this.divState = this.divState ? false : true;
    this.address = this.address ? false : true;
    this.username1 = this.username1 ? false : true;
    this.username2 = this.username2 ? false : true;
    this.password1 = this.password1 ? false : true;
    this.password2 = this.password2 ? false : true;

  }
  canDeactivate(): Observable<boolean> | boolean {
    // alert("Change detected");
    return true;
  }
}
