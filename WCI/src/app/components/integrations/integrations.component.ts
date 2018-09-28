import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsComponent } from '../../components/rules/alerts/alerts.component';
import { NavData } from '../../models/navdata';
import { IntgrationDataService } from '../../services/integration.data.service';
import { ManageintegrationComponent } from './../integrations/manageintegration/manageintegration.component';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.state';
import * as IntegrationActions from './../../actions/integrations.actions';
import { ManageIntegrationItem } from './../../models/manage-integration-item';

@Component({
  selector: 'app-integration',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  @ViewChild("chbxdmsCommEnabled") chbxdmsCommEnabled: ElementRef
  @ViewChild("chbxdmsCommDisabled") chbxdmsCommDisabled: ElementRef
  @ViewChild("chbxlcmCommEnabled") chbxlcmCommEnabled: ElementRef
  @ViewChild("chbxlcmCommDisabled") chbxlcmCommDisabled: ElementRef
  @ViewChild("chbxclCommEnabled") chbxclCommEnabled: ElementRef
  @ViewChild("chbxclCommDisabled") chbxclCommDisabled: ElementRef
  @ViewChild("manageintegrationComp") manageintegrationComp: ManageintegrationComponent;
  @ViewChild("manageIntegrationTab") manageIntegrationTab: ElementRef
  @ViewChild("dMSSysNameCommunication") dMSSysNameCommunication: ElementRef
  @ViewChild("dMSSysNameInstrumentMap") dMSSysNameInstrumentMap: ElementRef
  @ViewChild("lCMSysNameCommunication") lCMSysNameCommunication: ElementRef
  @ViewChild("CLSysNameCommunication") CLSysNameCommunication: ElementRef

  public navRoutes: Array<Route>;
  selectedRow: number = 0;
  integrationDataService: IntgrationDataService;
  extSystems: Observable<ManageIntegrationItem[]>;
  extSystemsData: Array<any>;
  subRoutes: Array<any> = [];
  selectedMenu: number = 1;
  dmsCommEnabled: boolean = false;
  lcmCommEnabled: boolean = false;
  clCommEnabled: boolean = false;
  DMSCommchannel: string;
  LCMCommchannel: string;
  CLCommchannel: string;
  DMSCharEncoding: string
  DMSSysName: string;
  LCMSysName: string;
  CLSysName: string;
  duplicateData: any;
  isIntegrationShowAlertBox: boolean;
  modelHeaderContent: string = "Really Lose Changes?";
  modelBodyContent: string = "Completing this action will cause you to lose any unsaved changes. Are you sure you want to continue?";
  discardTarget: any;
  targetUrl: any;
  isIntegrationDiscardPopup: boolean;
  isActiveDefaultTab: boolean = true;
  activeTab: string;

  constructor(private router: Router, private parentRoute: ActivatedRoute, integrationDataService: IntgrationDataService, private store: Store<AppState>) {
    this.navRoutes = new Array<Route>();
    this.integrationDataService = integrationDataService;
    this.extSystems = store.select('manageIntegrationItem');

    this.integrationDataService.getExtSystems().then((data) => {

      this.store.dispatch(new IntegrationActions.Empty());
      data.forEach(element => {
        this.store.dispatch(new IntegrationActions.AddManageIntegrationItem(element));
      });

      this.populateRoutes();
      this.extSystems.subscribe(extSystems => {
        this.dmsCommEnabled = extSystems.find(extsys => extsys.Type == 6).Status == 0 ? false : true;
        this.lcmCommEnabled = extSystems.find(extsys => extsys.Type == 1).Status == 0 ? false : true;
        this.clCommEnabled = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Status == 0 ? false : true : false;
        this.DMSCommchannel = extSystems.find(extsys => extsys.Type == 6).Channel;
        this.LCMCommchannel = extSystems.find(extsys => extsys.Type == 1).Channel;
        this.CLCommchannel = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Channel : "";
        this.DMSCharEncoding = extSystems.find(extsys => extsys.Type == 6).CharacterEncoding;
        this.DMSSysName = extSystems.find(extsys => extsys.Type == 6).Name;
        this.LCMSysName = extSystems.find(extsys => extsys.Type == 1).Name;
        this.CLSysName = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Name : "";
        this.extSystemsData = extSystems;
      });
      this.makeDuplicateCopy();
    });
  }

  ngOnInit() {
  }

  populateRoutes() {
    this.parentRoute.routeConfig.children.forEach(route => {
      if (route.data && route.data.title) {
        this.extSystems.subscribe(extSystems => {
          if (route.data.routeId == "integrationsMI" || extSystems.find(extsys => extsys.Name == route.data.title))
            this.navRoutes.push(route);
        });
        this.updateExtSystemsData();
      }
    });
  }

  public handleMenuClick(menuName: string, menuValue: number): void {

    if (this.selectedMenu != menuValue) {
      if (this.selectedMenu == 1) {
        if (!this.manageintegrationComp.expansionOverviewComp.compareRecordAndSetTargetUrl()) {
          this.setDiscardtarget(menuName);
          this.isActiveDefaultTab = false;
          this.activeTab = menuName;
        } else {
          this.changeSelectMenu(menuName);
        }
      } else if (this.isSameToDuplicateCopy()) {
        this.setDiscardtarget(menuName);
        this.isIntegrationShowAlertBox = true;
      } else {
        this.changeSelectMenu(menuName);
      }
    }

  }

  private setDiscardtarget(menuName) {
    if (menuName == "manageIntegration") {
      this.discardTarget = this.manageIntegrationTab;
    } else if (menuName == "dmsComm") {
      this.discardTarget = this.dMSSysNameCommunication;
    } else if (menuName == "dmsInstrumentMap") {
      this.discardTarget = this.dMSSysNameInstrumentMap;
    } else if (menuName == "lcmComm") {
      this.discardTarget = this.lCMSysNameCommunication;
    } else if (menuName == "clComm") {
      this.discardTarget = this.CLSysNameCommunication;
    }
  }

  private changeSelectMenu(menuName): void {
    if (menuName == "manageIntegration") {
      this.selectedMenu = 1;
    } else if (menuName == "dmsComm") {
      this.selectedMenu = 2;
    } else if (menuName == "dmsInstrumentMap") {
      this.selectedMenu = 3;
    } else if (menuName == "lcmComm") {
      this.selectedMenu = 4;
    } else if (menuName == "clComm") {
      this.selectedMenu = 5;
    }
  }

  public saveExtSysConfig(event: any): void {
    this.extSystems.subscribe(extSystems => {
      if (this.selectedMenu == 2) {
        let dmsExtSys = extSystems.find(extsys => extsys.Type == 6);
        if (this.dmsCommEnabled && this.chbxdmsCommEnabled.nativeElement.hasAttribute("active")) {
          dmsExtSys.Status = 1;
        } else if (this.dmsCommEnabled && !this.chbxdmsCommEnabled.nativeElement.hasAttribute("active")) {
          dmsExtSys.Status = 0;
        } else if (!this.dmsCommEnabled && this.chbxdmsCommDisabled.nativeElement.hasAttribute("active")) {
          dmsExtSys.Status = 1;
        } else if (!this.dmsCommEnabled && !this.chbxdmsCommDisabled.nativeElement.hasAttribute("active")) {
          dmsExtSys.Status = 0;
        }
        this.integrationDataService.updateExtSystems({ "externalSystem": dmsExtSys }).then((data) => {
        });
      } else if (this.selectedMenu == 4) {
        let lcmExtSys = extSystems.find(extsys => extsys.Type == 1);
        if (this.lcmCommEnabled && this.chbxlcmCommEnabled.nativeElement.hasAttribute("active")) {
          lcmExtSys.Status = 1;
        } else if (this.lcmCommEnabled && !this.chbxlcmCommEnabled.nativeElement.hasAttribute("active")) {
          lcmExtSys.Status = 0;
        } else if (!this.lcmCommEnabled && this.chbxlcmCommDisabled.nativeElement.hasAttribute("active")) {
          lcmExtSys.Status = 1;
        } else if (!this.lcmCommEnabled && !this.chbxlcmCommDisabled.nativeElement.hasAttribute("active")) {
          lcmExtSys.Status = 0;
        }
        this.integrationDataService.updateExtSystems({ "externalSystem": lcmExtSys }).then((data) => {
        });
      } else if (this.selectedMenu == 5) {
        let clExtSys = extSystems.find(extsys => extsys.Type == 3);
        if (this.clCommEnabled && this.chbxclCommEnabled.nativeElement.hasAttribute("active")) {
          clExtSys.Status = 1;
        } else if (this.clCommEnabled && !this.chbxclCommEnabled.nativeElement.hasAttribute("active")) {
          clExtSys.Status = 0;
        } else if (!this.clCommEnabled && this.chbxclCommDisabled.nativeElement.hasAttribute("active")) {
          clExtSys.Status = 1;
        } else if (!this.clCommEnabled && !this.chbxclCommDisabled.nativeElement.hasAttribute("active")) {
          clExtSys.Status = 0;
        }
        this.integrationDataService.updateExtSystems({ "externalSystem": clExtSys }).then((data) => {
        });
      }
    });
    this.updateExtSystemsData();
    this.makeDuplicateCopy();
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.manageintegrationComp && this.manageintegrationComp.expansionOverviewComp) {
      var isDeactivate = this.manageintegrationComp.expansionOverviewComp.compareRecordAndSetTargetUrl();
      return isDeactivate;
    }
    if(this.isSameToDuplicateCopy()){
      if (localStorage.targetLink && JSON.parse(localStorage.targetLink).url) {
            this.isIntegrationShowAlertBox = true;
            this.targetUrl = JSON.parse(localStorage.targetLink).url;
            this.isIntegrationDiscardPopup = false;
          }
          return false;
    }
    return true;
  }

  updateCentralLink() {
    this.extSystems.subscribe(extSystems => {
      this.clCommEnabled = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Status == 0 ? false : true : false;
      this.CLCommchannel = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Channel : "";
      this.CLSysName = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Name : "";
    });
    this.updateExtSystemsData();
  }

  deleteCentralLink() {
    this.extSystems.subscribe(extSystems => {
      this.clCommEnabled = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Status == 0 ? false : true : false;
      this.CLCommchannel = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Channel : "";
      this.CLSysName = extSystems.find(extsys => extsys.Type == 3) ? extSystems.find(extsys => extsys.Type == 3).Name : "";
    });
    this.updateExtSystemsData();
  }

  updateExtSystemsData(): void {
    this.extSystems.subscribe(extSystems => {
      this.extSystemsData = extSystems;
    });
  }
  private makeDuplicateCopy(): void {
    this.duplicateData = {
      'dmsCommEnabled': JSON.parse(JSON.stringify(this.dmsCommEnabled)),
      'lcmCommEnabled': JSON.parse(JSON.stringify(this.lcmCommEnabled)),
      'clCommEnabled': JSON.parse(JSON.stringify(this.clCommEnabled)),
      'extSystemsData': JSON.parse(JSON.stringify(this.extSystemsData))
    };
  }

  private isSameToDuplicateCopy(): boolean {
    if (this.duplicateData) {
      if (this.duplicateData.dmsCommEnabled == this.dmsCommEnabled && this.duplicateData.lcmCommEnabled == this.lcmCommEnabled && this.duplicateData.clCommEnabled == this.clCommEnabled) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  public popupDiscardChanges(): void {
    if (this.duplicateData) {
      this.dmsCommEnabled = this.duplicateData.dmsCommEnabled;
      this.lcmCommEnabled = this.duplicateData.lcmCommEnabled;
      this.clCommEnabled = this.duplicateData.clCommEnabled;
      this.isIntegrationShowAlertBox = false;
      this.isIntegrationDiscardPopup = true;
      
      if(this.discardTarget){
        this.discardTarget.nativeElement.click();
      } else{
        if(this.targetUrl){
          this.router.navigateByUrl(this.targetUrl);
        }
      }
      this.targetUrl = null;
    }

  }

  public popupCancelEvent(): void {
    this.isIntegrationShowAlertBox = false;
    this.isIntegrationDiscardPopup = true;
    this.targetUrl = null;
  }

}



