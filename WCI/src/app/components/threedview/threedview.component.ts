import {RenderThreeJSObj} from "../../services/render.ThreeJSObj";
import {AfterViewInit,OnInit,OnDestroy, Component, ElementRef, ViewChild, Inject} from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { DashboardBroadcastService } from "../../services/dashboard.data.broadcast.service";
import { SpinnerComponent } from '../spinner';

@Component({
  selector: 'app-threedview',
  templateUrl: './threedview.component.html',
  styleUrls: ['./threedview.component.css']
})
export class ThreedviewComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("myContainer") container: ElementRef;
    public isRequesting: boolean = true;
    dashboardService: DashboardBroadcastService;
    renderService: RenderThreeJSObj;

    constructor(private http: HttpClient, renderService: RenderThreeJSObj, @Inject(DashboardBroadcastService)dashboardService: DashboardBroadcastService) { 
        this.dashboardService = dashboardService;
        this.renderService = renderService;
    }

    /**
     * Called before initialization
     */
    ngOnInit() {
        this.isRequesting = true;
        document.getElementById('nav3DView').setAttribute('active', 'true');
    }

    /**
     * Initialize home components.
     */
    ngAfterViewInit() {
        this.dashboardService.ZoneSubject.subscribe(
             labName => {
                    this.isRequesting = true;
                    this.renderService.destroy();
                    this.container.nativeElement.style["display"] = "none"; 
                    this.renderService.init(this.container, this.http);
                    this.renderService.renderUIFromJson(labName.Name).then(()=>{
                    this.isRequesting = false;
                    this.renderService.animate();
                });
             });
    }

    /**
     * ~destructor
     */
    ngOnDestroy() {
        this.renderService.destroy();
    }
}
