import { Component, OnInit, } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { RuleDataService } from '../../services/rule.data.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ServicesConstants } from "../../services/constants.service";
@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {
  public navRoutes: Array<Route>;
  ruleTypeList: any;
  selectedRow: number = 0;

  constructor(private parentRoute: ActivatedRoute) {
    this.ruleTypeList = [
      {
        "name": "Notifications",
        "id": "notifications"
      },
      {
        "name": "Miscellaneous",
        "id": "miscellaneous"
      },
      {
        "name": "SystemAnalytics",
        "id": "systemanalytics"
      },
      {
        "name": "Purgue",
        "id": "purgue"
      },
      {
        "name": "Samples",
        "id": "samples"
      },
      {
        "name": "Update",
        "id": "update"
      },
      {
        "name": "Custome Tiles",
        "id": "custometiles"
      },
      {
        "name": "Recent Audit Log",
        "id": "recentauditlog"
      }
    ];

    this.navRoutes = new Array<Route>();
    this.populateRoutes();
  }

  public loadData(index: number) {
    this.selectedRow = index;
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

  handleMenuClick(): void {
  }

  canDeactivate(): Observable<boolean> | boolean {
    // alert("Change detected");
    return true;
  }
}
