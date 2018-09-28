import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Route, ActivatedRoute } from '@angular/router';
import { Store } from "@ngrx/store";
import { AppState } from "./app.state";
import * as UserActions from  "./actions/users.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public isLoading: boolean;
  public navRoutes: Array<Route>;
  public subNavRoutes: Array<Route>;
  public errMsg: string;
  public showLogin: boolean;
  public showLogout: boolean = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.navRoutes = new Array<Route>();
    this.subNavRoutes = new Array<Route>();
    this.populateRoutes();
    this.isLoading = true;
    this.showLogin = false;
  }

  ngOnInit() {
    this.router.events
      .subscribe((evt) => {
        if (evt instanceof NavigationStart) {
          this.isLoading = true;
          this.subNavRoutes = [];
        } else if (evt instanceof NavigationEnd || evt instanceof NavigationCancel || evt instanceof NavigationError) {
          if (evt instanceof NavigationEnd) {
            const routeId = this.getRouteId(evt.urlAfterRedirects);
            if (routeId) {
              document.getElementById(`nav${routeId}`).setAttribute('active', 'true');
            }
          } else if (evt instanceof NavigationCancel) {
            this.errMsg = evt.reason;
          } else if (evt instanceof NavigationError) {
            this.errMsg = evt.toString();
          }
          this.isLoading = false;
        }
      });
  }

  populateRoutes() {
    this.router.config.forEach(element => {
      if (element.data && element.data.title) {
        this.navRoutes.push(element);
      }
    });
  }

  getRouteId(routePath: string): string {
    const myRoute = this.navRoutes.find((route, index, routes) => {
      const pathMatch = routePath.match(route.path);
      return pathMatch ? pathMatch.length > 0 : false;
    });
    const retVal = (myRoute && myRoute.data && myRoute.data.routeId) ? myRoute.data.routeId : null;
    return retVal;
  }

  public handleClickAccessUser(event: any): void{
    this.showLogout = !this.showLogout;
  }

  public signOut(): void{
    this.showLogout = !this.showLogout;
    this.router.navigateByUrl('/(main:login)');
    this.store.dispatch(new UserActions.SignOutAction());
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
