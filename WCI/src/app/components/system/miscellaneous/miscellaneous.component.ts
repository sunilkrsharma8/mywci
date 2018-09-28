import { Component, OnInit, } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
  }

  canDeactivate(): Observable<boolean> | boolean {
   // alert("Change detected");
    return true;
  }
}
