import { Component, OnInit, } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { RuleDataService } from '../../services/rule.data.service';
import { Observable } from 'rxjs';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ServicesConstants } from "../../services/constants.service";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {
  public navRoutes: Array<Route>;
  ruleTypeList: any;
  selectedRowRuleType: number = 0;

  constructor(private parentRoute: ActivatedRoute) {
     this.ruleTypeList = [
          {
            "name":"Samples",
            "id": "samples"
        },{
            "name":"Alerts",
            "id": "alerts"
        },
        {
            "name":"Auto-Filter",
            "id": "autofilter"
        }
      ];
      
    this.navRoutes = new Array<Route>();
    this.populateRoutes();
  }

  public loadRules(index){
    this.selectedRowRuleType = index;
  }

    /**
     * Called before initialization
     */
    ngOnInit() {
    }

    populateRoutes() {
      this.parentRoute.routeConfig.children.forEach(route => {
        if (route.data && route.data.title) {
          this.navRoutes.push(route);
        }
      });
    }

  ngAfterViewInit() {
  }

  handleMenuClick (): void   
  { 

    let menuContainer = (document.getElementsByClassName("rule-list") as HTMLCollectionOf<Element>);
    for(var i = 0; i < menuContainer[0].children[0].children.length; i++) {
      let menu = menuContainer[0].children[0].children[i];
      menu.removeAttribute("active");
    }
  } 

  canDeactivate(): Observable<boolean> | boolean{
    return true;
  }
}