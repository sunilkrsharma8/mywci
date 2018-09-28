import { Component, OnInit, ViewChild, ElementRef, Renderer, HostListener } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import { InstrumentDataService } from './../../services/instrument.data.service';
import { ZoneDataService } from './../../services/zone.data.service';
import { AlertDataService } from './../../services/alert.data.service';
import { CustomTileDataService } from './../../services/customtiles.data.service';
import { InstrumentItem } from './../../models/instrument-item';
import { Customtile } from './../../models/customtile';
import { Zone } from '../../models/zone';
import * as ZonesActions from './../../actions/zones.actions';
import * as InstrumentsActions from './../../actions/instruments.actions'
import { DashboardBroadcastService } from './../../services/dashboard.data.broadcast.service';
import { ServicesConstants } from "./../../services/constants.service";
import { DashboardMenuEnum } from './../../models/ModelEnums';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("dashboardshcard") dashboardshcard: ElementRef;
  instrumentDataService: InstrumentDataService;
  dashboardBroadcastService: DashboardBroadcastService;
  zoneDataService: ZoneDataService;
  alertDataService: AlertDataService;
  customtilesDataService: CustomTileDataService;
  allInstruments: Observable<InstrumentItem[]>;
  allInstrumentsSubscribedResult: Array<any>;
  allCustomtiles: Observable<Customtile[]>;
  allCustomtilesSubscribedResult: Array<any>;
  allZones: Observable<Zone[]>;
  allZonesSubscribedResult: Array<any>;
  criticalAlert: Array<any>;
  warningAlert: Array<any>;
  infoAlert: Array<any>;
  noAlert: Array<any>;
  selectedZone: Zone;
  allUnResolvedAlerts: Array<any>;
  allUnResolvedAlertsSubscribedResult: Array<any>;
  allDashboardItems: Array<any>;
  activeAlerts: any;
  menuItems: Array<any>;
  addTileMenuItems: Array<any>;
  isShowContextMenu: boolean = false;
  isOutSidecontextMenu: boolean = false;
  isShowAddTileMenu: boolean = false;
  selectedComponent: any;
  isEditDashboard: boolean = false;

  constructor(private router: Router, instrumentDataService: InstrumentDataService, zoneDataService: ZoneDataService, alertDataService: AlertDataService, customtilesDataService: CustomTileDataService, elementRef: ElementRef, renderer: Renderer, private store: Store<AppState>, dashboardBroadcastService: DashboardBroadcastService) {
    this.instrumentDataService = instrumentDataService;
    this.dashboardBroadcastService = dashboardBroadcastService;
    this.zoneDataService = zoneDataService;
    this.alertDataService = alertDataService;
    this.customtilesDataService = customtilesDataService;
    this.allDashboardItems = [];
    if (JSON.parse(localStorage.getItem("allDashboardItems")) == null) {
      localStorage.setItem("allDashboardItems", JSON.stringify([]));
    } else {
      this.allDashboardItems = JSON.parse(localStorage.getItem("allDashboardItems"));
    }
    this.menuItems = ServicesConstants.DashboardMenuItems;
    this.addTileMenuItems = this.setAddTileMenuItems();
    this.menuItems.find(item => { return item.menuLabel === DashboardMenuEnum.ADD_TITLE }).subMenuLabel = this.addTileMenuItems;

    this.allInstruments = store.select('instrumentItem');
    this.allZones = store.select('zone');


    this.zoneDataService.getZones().then(zones => {
      if (zones != undefined) {
        this.dashboardBroadcastService.updateZone(zones[0]);
        this.store.dispatch(new ZonesActions.Empty());
        zones.forEach(element => {
          this.store.dispatch(new ZonesActions.AddZone(element));
        });

        this.allZones.subscribe(allZones => {
          this.allZonesSubscribedResult = allZones;
        });

        this.alertDataService.getUnresolvedAlerts().then(unResolvedAlerts => {
          this.allUnResolvedAlerts = unResolvedAlerts;
          this.setUnResolvedAlerts(zones[0]);
        });

        this.customtilesDataService.getCustomTilesData().then(customTiles => {
          this.allCustomtilesSubscribedResult = customTiles;

          var custTileMenu = this.addTileMenuItems.find(menuitem => {
            return menuitem.menuLabel == DashboardMenuEnum.CUSTOM_TIES;
          });
          var custTileDashboard = this.allDashboardItems.find(dashboardItem => {
            return dashboardItem.ref_component == DashboardMenuEnum.CUSTOM_TIES;
          });

          if (!custTileMenu && !custTileDashboard) {
            var addCustTileMenu = { menuLabel: DashboardMenuEnum.CUSTOM_TIES, subMenuLabel: [] };
            this.allCustomtilesSubscribedResult.forEach(custTile => {
              addCustTileMenu.subMenuLabel.push({ menuLabel: custTile.Title, subMenuLabel: [] });
            });
            this.addTileMenuItems.push(addCustTileMenu);
          }

        });

        this.instrumentDataService.getInstrumentsAllData().then(data => {
          this.store.dispatch(new InstrumentsActions.Empty());
          data.forEach(element => {
            this.store.dispatch(new InstrumentsActions.AddInstrument(element));

            this.allInstruments.subscribe(allInstruments => {
              this.allInstrumentsSubscribedResult = allInstruments;
              if (this.addTileMenuItems.find(item => { return item.menuLabel === DashboardMenuEnum.REMOTE_CONTROL }) && this.addTileMenuItems.find(item => { return item.menuLabel === DashboardMenuEnum.REMOTE_CONTROL }).subMenuLabel) {
                this.allInstrumentsSubscribedResult.forEach(instrument => {
                  if (instrument.RemoteControl && instrument.RemoteControl.Address && instrument.RemoteControl.Address != '' && this.addTileMenuItems.length) {
                    this.addTileMenuItems.find(item => { return item.menuLabel === DashboardMenuEnum.REMOTE_CONTROL }).subMenuLabel.push({ menuLabel: instrument.Name, subMenuLabel: [] });
                  }
                });
              }
            });

          });
        });
      }
    });


  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dashboardScroll(0, '', 0);
  }

  public setAddTileMenuItems(): any {
    var addTileMenusData = [];
    if (JSON.parse(localStorage.getItem("allDashboardItems"))) {
      ServicesConstants.DashboardAddTileMenus.forEach(menuItem => {
        var menuExists = JSON.parse(localStorage.getItem("allDashboardItems")).find(item => {
          return item.ref_component == menuItem.menuLabel;
        });
        if (!menuExists) {
          addTileMenusData.push(menuItem);
        }
      });
    }
    return addTileMenusData;
  }

  public setDashboardItems(label: string, data: any) {
    this.allDashboardItems.push({ ref_component: label, ref_data: data });
    this.setDashboardItemsLocal();


  }

  public setDashboardItemsLocal(): void {
    localStorage.setItem("allDashboardItems", JSON.stringify(this.allDashboardItems));
  }

  public setZone(zone: Zone): void {
    this.selectedZone = zone;
    this.dashboardBroadcastService.updateZone(zone);
    this.setUnResolvedAlerts(zone);
  }

  setUnResolvedAlerts(zone: Zone): void {
    this.selectedZone = zone;
    this.criticalAlert = [];
    this.warningAlert = [];
    this.infoAlert = [];
    this.noAlert = [];
    this.selectedZone.Equipment.forEach(equip => {
      var criti = this.allUnResolvedAlerts.filter(item => {
        return item.Severity === 200 && item.EquipmentId === equip.EquipmentId;
      });
      this.criticalAlert.push(...criti);

      var warn = this.allUnResolvedAlerts.filter(item => {
        return item.Severity === 100 && item.EquipmentId === equip.EquipmentId;
      });
      this.warningAlert.push(...warn);

      var info = this.allUnResolvedAlerts.filter(item => {
        return item.Severity === 50 && item.EquipmentId === equip.EquipmentId;
      });
      this.infoAlert.push(...info);

      var noAlrt = this.allUnResolvedAlerts.filter(item => {
        return item.Severity === 0 && item.EquipmentId === equip.EquipmentId;
      });
      this.noAlert.push(...noAlrt);
    });
    this.activeAlerts = { criticalAlert: this.criticalAlert, warningAlert: this.warningAlert, infoAlert: this.infoAlert, noAlert: this.noAlert };

  }


  addTile(event: any): void {
    if (this.addTileMenuItems && this.addTileMenuItems.length) {
      this.isShowAddTileMenu = true;
      this.setMenuPosition(event, 'addtilemenucontainer', 122, 63);
    }
  }

  public outSidecontextMenuHandler(event: any) {
    this.isShowContextMenu = true;
    this.isOutSidecontextMenu = true;
    this.setMenuPosition(event, 'menucontainer', 0, 63);
  }

  public contextMenuHandler(event: any, comp: any): void {
    this.isShowContextMenu = true;
    this.isOutSidecontextMenu = false;
    this.selectedComponent = comp;
    this.setMenuPosition(event, 'menucontainer', 0, 63);
    event.stopPropagation();
  }
  public selectMenuItem(item, lbl) {
    this.isShowContextMenu = false;
    if (item !== DashboardMenuEnum.RESET && item.menuLabel === DashboardMenuEnum.REMOVE_FROM_DASHBOARD) {
      var indx = this.allDashboardItems.findIndex(itm => {
        return itm.ref_component === this.selectedComponent.ref_component;
      });

      if (indx !== -1) {
        this.allDashboardItems.splice(indx, 1);
        this.setDashboardItemsLocal();
        this.addTileMenuItems.push({ menuLabel: this.selectedComponent.ref_component, subMenuLabel: this.selectedComponent.ref_data });
        this.dashboardScroll(0, '', -100);
      }
    }
    if (lbl === DashboardMenuEnum.ADD_TITLE) {
      this.addTileMenuItem(item);
    }
  }
  public isActive(item) {
    // return this.selected === item;
  }

  private removeMenuItem(item): void {
    var idx = this.addTileMenuItems.findIndex(menuItem => {
      return menuItem.menuLabel === item.menuLabel;
    });
    this.addTileMenuItems.splice(idx, 1);
  }

  private getIndex(Arr, item, lbl1, lbl2): number {
    var indx = Arr.findIndex(obj => {
      return obj[lbl2] === item[lbl1];
    });
    return indx;
  }

  public addTileMenuItem(item) {
    this.isShowAddTileMenu = false;
    var dashboardTile = ServicesConstants.DashboardTiles.findIndex(tileName => {
      return tileName == item.menuLabel;
    });
    if (this.getIndex(this.allDashboardItems, item, DashboardMenuEnum.MENU_LABEL, DashboardMenuEnum.REF_COMPONENT) === -1 && dashboardTile !== -1) {
      this.setDashboardItems(item.menuLabel, item.subMenuLabel);
      this.removeMenuItem(item);
    }
    this.dashboardScroll(0, '', 100);
  }

  private setMenuPosition(event: any, className: string, fromTop: number, fromLeft: number): void {
    setTimeout(() => {
      let menucontainer = <HTMLElement>document.getElementsByClassName(className)[0];
      if (menucontainer) {
        menucontainer.setAttribute('style', '');
        menucontainer.style.top = (parseInt(event.clientY) - 122) + 'px';
        menucontainer.style.left = (parseInt(event.clientX) - 63) + 'px';
        menucontainer.style.display = "block";
      }
    }, 5);
  }

  public editDashboard(event: any): void {
    this.isEditDashboard = true;
  }

  public saveDashboard(event: any): void {
    this.isEditDashboard = false;
  }

  public cancelDashboard(event: any): void {
    this.isEditDashboard = false;
  }
  private dashboardScroll(topValue: number, scrollDown: string, domHeight: number): void {
    let dashboardshcardDiv = <HTMLElement>document.getElementById('dashboardshcard');
    let dashboardshcardOutDiv = <HTMLElement>document.getElementById('dashboardshcardOutDiv');
    let dashboardUpArrow = <HTMLElement>document.getElementById('dashboardUpArrow');
    let dashboardDownArrow = <HTMLElement>document.getElementById('dashboardDownArrow');
    if (topValue !== 0 && scrollDown !== '') {
      dashboardshcardDiv.scrollBy({ top: topValue, left: 0, behavior: 'smooth' });
    }

    if (dashboardshcardDiv.scrollHeight + domHeight > dashboardshcardOutDiv.scrollHeight) {
      if (scrollDown === 'scrollDown') {
        if (dashboardshcardDiv.scrollTop == 0) {
          dashboardDownArrow.style.display = 'none';
          dashboardUpArrow.style.display = 'block';
        } else {
          dashboardUpArrow.style.display = 'block';
          dashboardDownArrow.style.display = 'block';
        }
      }
      if (scrollDown === 'scrollUp') {
        if (dashboardshcardDiv.scrollHeight === (dashboardshcardOutDiv.offsetHeight + dashboardshcardDiv.scrollTop)) {
          dashboardUpArrow.style.display = 'none';
          dashboardDownArrow.style.display = 'block';
        } else {
          dashboardUpArrow.style.display = 'block';
          dashboardDownArrow.style.display = 'block';
        }
      }
      if (scrollDown === '') {
        dashboardshcardDiv.scrollTop = 0;
        dashboardUpArrow.style.display = 'block';
        dashboardDownArrow.style.display = 'none';
      }
    } else {
      dashboardUpArrow.style.display = 'none';
      dashboardDownArrow.style.display = 'none';
    }
  }

  public scrollWinDown(event: any): void {
    this.dashboardScroll(-200, 'scrollDown', 0);
  }
  public scrollWinUp(event: any): void {
    this.dashboardScroll(200, 'scrollUp', 0);
  }

  public onMousewheel(event: any): void {

    if (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) > 0) {
      this.dashboardScroll(-200, 'scrollDown', 0);
    } else if (Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail))) < 0) {
      this.dashboardScroll(200, 'scrollUp', 0);
    }
  }

}






