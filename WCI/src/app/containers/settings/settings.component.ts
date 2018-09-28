import { Route, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public navRoutes: Array<Route>;

  constructor(private parentRoute: ActivatedRoute) {
    this.navRoutes = new Array<Route>();
    this.populateRoutes();
  }

  ngOnInit() {
    
  }

  populateRoutes() {
    this.parentRoute.routeConfig.children.forEach(route => {
      if (route.data && route.data.title) {
        this.navRoutes.push(route);
      }
    });
  }

  public setTargetLink(route: Route){
    var url;
    if(!route.children){
      url = '/(main:settings/(settings:'+route.path+'))';
    } else{
      url = route.children[0].redirectTo
    }
    localStorage.setItem('targetLink',JSON.stringify({url: url, isCancel:false}));
   }

}
