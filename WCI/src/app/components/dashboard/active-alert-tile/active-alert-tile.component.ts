import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-active-alert-tile',
  templateUrl: './active-alert-tile.component.html',
  styleUrls: ['./active-alert-tile.component.css']
})
export class ActiveAlertTileComponent implements OnInit {
  @ViewChild("activeAlertsMsg") activeAlertsMsg: ElementRef;
  @Input() criticalAlert: Array<any>;
  @Input() warningAlert: Array<any>;
  @Input() infoAlert: Array<any>;
  @Input() activeAlerts: any;
  


  constructor(private router: Router) { }

  ngOnInit() {
   
  }

  navigateToActiveAlerts(): void {
    var tabs = document.getElementsByTagName("sh-tab-item");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].removeAttribute("active");
    }
    this.router.navigateByUrl('/(main:home/(home:activealerts))');
  }

  displaymsg(): void {
    this.activeAlertsMsg.nativeElement.firstElementChild.firstElementChild.textContent = "Active Alerts"
  }

  hiddenmsg(): void {
    this.activeAlertsMsg.nativeElement.firstElementChild.firstElementChild.textContent = "";
  }
}
