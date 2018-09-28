import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
}
