import { NavData } from './models/navdata';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolymerModule } from '@codebakery/origami';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../guards";
import { StoreModule } from '@ngrx/store';
import { AlertRuleReducer } from './reducers/alertrules.reducers';
import { UserReducer } from './reducers/users.reducers'
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects/router.effects';
import { UserEffects } from './effects/users.effects';
import { IntegrationItemReducer } from './reducers/integrations.reducers';
import { InstrumentItemReducer } from './reducers/instruments.reducers';
import { IntegrationEquipmentMapsReducer } from './reducers/integraion-equipment-maps.reducers';
import { SampleRuleReducer } from './reducers/samplerules.reducers';
import { AutoFilterEventsReducer } from './reducers/autofilterevents.reducers';
import { EquipmentModelReducer } from './reducers/equipment-models.reduceres';
import { ZoneReducer } from './reducers/zones.reducers';
import { UnResolvedAlertReducer } from './reducers/unresolvedalert.reducers';
import { ResolvedAlertReducer } from './reducers/resolvedalert.reducers';
import { AngularSplitModule } from 'angular-split';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { CannedCommentsReducer } from './reducers/cannedcomments.reducers';
import { CustomTileItemReducer } from './reducers/customtile.reducers';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';



import { SettingsComponent } from './containers/settings/settings.component';
import { AnalyticsComponent } from './containers/analytics/analytics.component';
import { RemoteControlComponent } from './containers/remotecontrol/remotecontrol.component';
import { InventoryComponent } from './containers/inventory/inventory.component';
import { PrioritySamplesComponent } from './containers/prioritysamples/prioritysamples.component';
import { HomeComponent } from './containers/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AppComponent } from './app.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { IntegrationsComponent } from './components/integrations/integrations.component';
import { LoginComponent } from './containers/login/login.component';
import { ZonedesignerComponent } from './components/zonedesigner/zonedesigner.component';
import { CannedcommentsComponent } from './components/cannedcomments/cannedcomments.component';
import { RulesComponent } from './components/rules/rules.component';
import { UsermanagementComponent } from './components/usermanagement/usermanagement.component';
import { SystemComponent } from './components/system/system.component';
import { AlertDataService, RuleDataService, IntgrationDataService, AuthService, UserService, SiteService, DataService, InstrumentDataService, ZoneDataService, DashboardBroadcastService, CustomTileDataService, CannedCommentsDataService, RenderThreeJSObj, ObjectCreationService, RenderZoneDesigner } from "./services";
import { ConsumableinventorylevelComponent } from './components/rulenaturallanguage/consumableinventorylevel/consumableinventorylevel.component';
import { ReagentinventorylevelComponent } from './components/rulenaturallanguage/reagentinventorylevel/reagentinventorylevel.component';
import { CalibrationexpirationComponent } from './components/rulenaturallanguage/calibrationexpiration/calibrationexpiration.component';
import { ReagentexpirationComponent } from './components/rulenaturallanguage/reagentexpiration/reagentexpiration.component';
import { UserdefinedComponent } from './components/rulenaturallanguage/userdefined/userdefined.component';
import { InstrumenteventComponent } from './components/rulenaturallanguage/instrumentevent/instrumentevent.component';
import { CommunicationescalationComponent } from './components/rulenaturallanguage/communicationescalation/communicationescalation.component';
import { SystemescalationComponent } from './components/rulenaturallanguage/systemescalation/systemescalation.component';
import { AssetconfiguratorComponent } from './components/ruleconfigurationmodal/assetconfigurator/assetconfigurator.component';
import { TitleconfiguratorComponent } from './components/ruleconfigurationmodal/titleconfigurator/titleconfigurator.component';
import { EnableconfiguratorComponent } from './components/ruleconfigurationmodal/enableconfigurator/enableconfigurator.component';
import { AlertconfiguratorComponent } from './components/ruleconfigurationmodal/alertconfigurator/alertconfigurator.component';
import { EmailconfiguratorComponent } from './components/ruleconfigurationmodal/emailconfigurator/emailconfigurator.component';
import { EscalationresolutionmgmtComponent } from './components/rulenaturallanguage/escalationresolutionmgmt/escalationresolutionmgmt.component';
import { SharedruleparamsComponent } from './components/rulenaturallanguage/sharedruleparams/sharedruleparams.component';
import { InstrumentconfiguratorComponent } from './components/ruleconfigurationmodal/instrumentconfigurator/instrumentconfigurator.component';
import { EventsconfiguratorComponent } from './components/ruleconfigurationmodal/eventsconfigurator/eventsconfigurator.component';
import { SeverityconfiguratorComponent } from './components/ruleconfigurationmodal/severityconfigurator/severityconfigurator.component';
import { AlertboxComponent } from './components/ruleconfigurationmodal/messagebox/alertbox/alertbox.component';
import { DatetimeconfiguratorComponent } from './components/ruleconfigurationmodal/datetimeconfigurator/datetimeconfigurator.component';
import { InformationboxComponent } from './components/ruleconfigurationmodal/messagebox/informationbox/informationbox.component';

import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DescriptionconfiguratorComponent } from './components/ruleconfigurationmodal/descriptionconfigurator/descriptionconfigurator.component';
import { OccurrencepatternconfiguratorComponent } from './components/ruleconfigurationmodal/occurrencepatternconfigurator/occurrencepatternconfigurator.component';

import { AlertsComponent } from './components/rules/alerts/alerts.component';
import { SamplesComponent } from './components/rules/samples/samples.component';
import { AutofilterComponent } from './components/rules/autofilter/autofilter.component';
import { TurnaroundtimeComponent } from './components/rulenaturallanguage/turnaroundtime/turnaroundtime.component';
import { DurationconfiguratorComponent } from './components/ruleconfigurationmodal/durationconfigurator/durationconfigurator.component';
import { GlobalrulesettingsconfiguratorComponent } from './components/ruleconfigurationmodal/globalrulesettingsconfigurator/globalrulesettingsconfigurator.component';
import { ManageintegrationComponent } from './components/integrations/manageintegration/manageintegration.component';
import { GlobaldataroutersettingsconfiguratorComponent } from './components/integrations/globaldataroutersettingsconfigurator/globaldataroutersettingsconfigurator.component';
import { InstrumentmapComponent } from './components/integrations/instrumentmap/instrumentmap.component';
import { ExpansionOverviewComponent } from './components/expansion-overview/expansion-overview.component';
import { ManageIntegrationItemComponent } from './components/integrations/manageintegration/manage-integration-item/manage-integration-item.component';
import { InstrumentItemComponent } from './components/instruments/instrument-item/instrument-item.component';
import { ManagesitesComponent } from './containers/login/managesites/managesites.component';
import { ThreedviewComponent } from './components/threedview/threedview.component';
import { ActivealertsComponent } from './components/activealerts/activealerts.component';
import { ActiveAlertTileComponent } from './components/dashboard/active-alert-tile/active-alert-tile.component';
import { CannedcommentItemComponent } from './components/cannedcomments/cannedcomment-item/cannedcomment-item.component';
import { MiscellaneousComponent } from './components/system/miscellaneous/miscellaneous.component';
import { PurgueComponent } from './components/system/purgue/purgue.component';
import { RecentauditlogComponent } from './components/system/recentauditlog/recentauditlog.component';
import { SystemanalyticsComponent } from './components/system/systemanalytics/systemanalytics.component';
import { SystemsamplesComponent } from './components/system/systemsamples/systemsamples.component';
import { UpdateComponent } from './components/system/update/update.component';
import { CustomtilesComponent } from './components/system/customtiles/customtiles.component';
import { NotificationsComponent } from './components/system/notifications/notifications.component';
import { CustomtilesItemComponent } from './components/system/customtiles/customtiles-item/customtiles-item.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/(main:login)',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    outlet: 'main'
  },
  {
    path: 'home',
    canDeactivate: [CanDeactivateGuard],
    component: HomeComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Home',
      routeId: 'Home'
    }),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/(main:home/(home:3dview))',
        pathMatch: 'full',
      },
      {
        path: '3dview',
        canDeactivate: [CanDeactivateGuard],
        component: ThreedviewComponent,
        outlet: 'home',
        data: new NavData({
          title: '3D View',
          routeId: '3DView'
        })
      },
      {
        path: 'activealerts',
        canDeactivate: [CanDeactivateGuard],
        component: ActivealertsComponent,
        outlet: 'home',
        data: new NavData({
          title: 'Active Alerts',
          routeId: 'ActiveAlerts'
        })
      }
    ]
  },
  {
    path: 'prioritysamples',
    canDeactivate: [CanDeactivateGuard],
    component: PrioritySamplesComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Priority Samples',
      routeId: 'PrioritySamples'
    }),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventory',
    canDeactivate: [CanDeactivateGuard],
    component: InventoryComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Inventory',
      routeId: 'Inventory'
    }),
    canActivate: [AuthGuard]
  },
  {
    path: 'remotecontrol',
    canDeactivate: [CanDeactivateGuard],
    component: RemoteControlComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Remote Control',
      routeId: 'RemoteControl'
    }),
    canActivate: [AuthGuard]
  },
  {
    path: 'analytics',
    canDeactivate: [CanDeactivateGuard],
    component: AnalyticsComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Analytics',
      routeId: 'Analytics'
    }),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    canDeactivate: [CanDeactivateGuard],
    component: SettingsComponent,
    outlet: 'main',
    data: new NavData({
      title: 'Settings',
      routeId: 'Settings'
    }),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/(main:settings/(settings:instruments))',
      },
      {
        path: 'instruments',
        canDeactivate: [CanDeactivateGuard],
        component: InstrumentsComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'Instruments',
          routeId: 'SettingsInstruments'
        }),
        canActivate: [AuthGuard], 
      },
      {
        path: 'zonedesigner',
        canDeactivate: [CanDeactivateGuard],
        component: ZonedesignerComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'Zone Designer',
          routeId: 'SettingsZoneDesigner'
        }),
        canActivate: [AuthGuard],
      },
      {
        path: 'cannedcomments',
        canDeactivate: [CanDeactivateGuard],
        component: CannedcommentsComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'Canned Comments',
          routeId: 'SettingsCannedComments'
        })
      },
      {
        path: 'rules',
        component: RulesComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'settings',
        data: new NavData({
          title: 'Rules',
          routeId: 'SettingsRules'
        }),
        children: [
          {
            path: '',
            redirectTo: '/(main:settings/(settings:rules/(rules:sample)))',
            pathMatch: 'full',
          },
          {
            path: 'sample',
            canDeactivate: [CanDeactivateGuard],
            pathMatch: 'full',
            component: SamplesComponent,
            outlet: 'rules',
            data: new NavData({
              title: 'Samples',
              routeId: 'SettingsRulesSamples'
            })
          },
          {
            path: 'alerts',
            canDeactivate: [CanDeactivateGuard],
            component: AlertsComponent,
            outlet: 'rules',
            data: new NavData({
              title: 'Alerts',
              routeId: 'SettingsRulesAlerts'
            }),
            children: [

            ]
          },
          {
            path: 'auto-filter',
            canDeactivate: [CanDeactivateGuard],
            component: AutofilterComponent,
            outlet: 'rules',
            data: new NavData({
              title: 'Auto Filter',
              routeId: 'SettingsRulesAutoFilter'
            })
          }
        ]
      },
      {
        path: 'integrations',
        canDeactivate: [CanDeactivateGuard],
        component: IntegrationsComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'Integrations',
          routeId: 'SettingsIntegrations'
        }),
        children: [
          {
            path: '',
            redirectTo: '/(main:settings/(settings:integrations/(integrations:manageintegrations)))',
            pathMatch: 'full',
          },
          {
            path: 'manageintegrations',
            component: ManageintegrationComponent,
            outlet: 'integrations',
            data: new NavData({
              title: 'Manage Integrations',
              routeId: 'integrationsMI'
            }),
            children: []
          },
          {
            path: 'dms',
            canDeactivate: [CanDeactivateGuard],
            component: AlertsComponent,
            outlet: 'integrations',
            data: new NavData({
              title: 'DMS',
              routeId: 'integrationsDMS'
            })
            ,
            children: [
              {
                path: 'dmscommunication',
                canDeactivate: [CanDeactivateGuard],
                component: AlertsComponent,
                outlet: 'dms',
                data: new NavData({
                  title: 'Communication',
                  routeId: 'integrationsdmscommunication'
                })
              },
              {
                path: 'dmsinstrumentmap',
                canDeactivate: [CanDeactivateGuard],
                component: AlertsComponent,
                outlet: 'dms',
                data: new NavData({
                  title: 'Instrument Map',
                  routeId: 'integrationsdmsinstrumentmap'
                })
              }
            ]
          },
          {
            path: 'lcm',
            component: AutofilterComponent,
            canDeactivate: [CanDeactivateGuard],
            outlet: 'integrations',
            data: new NavData({
              title: 'LCM',
              routeId: 'integrationsLCM'
            }),
            children: []
          },
          {
            path: 'centrallink',
            canDeactivate: [CanDeactivateGuard],
            component: AutofilterComponent,
            outlet: 'integrations',
            data: new NavData({
              title: 'CentralLink',
              routeId: 'integrationsCL'
            }),
            children: []
          }
        ]
      },
      {
        path: 'usermanagement',
        component: UsermanagementComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'User Management',
          routeId: 'SettingsUserManagement'
        })
      },
      {
        path: 'system',
        canDeactivate: [CanDeactivateGuard],
        component: SystemComponent,
        outlet: 'settings',
        data: new NavData({
          title: 'System',
          routeId: 'SettingsSystem'
        }),
        children: [
          {
            path: '',
            redirectTo: '/(main:settings/(settings:system/(system:notifications)))',
            pathMatch: 'full',
          },
          {
            path: 'notifications',
            canDeactivate: [CanDeactivateGuard],
            pathMatch: 'full',
            component: NotificationsComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Notifications',
              routeId: 'SettingsSystemNotifications'
            })
          },
          {
            path: 'miscellaneous',
            canDeactivate: [CanDeactivateGuard],
            component: MiscellaneousComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Miscellaneous',
              routeId: 'SettingsSystemMiscellaneous'
            })
          },
          {
            path: 'systemanalytix',
            canDeactivate: [CanDeactivateGuard],
            component: SystemanalyticsComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Analytics',
              routeId: 'SettingsSystemAnalytics'
            })
          },
          {
            path: 'purgue',
            canDeactivate: [CanDeactivateGuard],
            component: PurgueComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Purge',
              routeId: 'SettingsSystemsPurgue'
            })
          },
          {
            path: 'systemsamples',
            canDeactivate: [CanDeactivateGuard],
            component: SystemsamplesComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Samples',
              routeId: 'SettingsSystemSamples'
            })
          },
          {
            path: 'update',
            canDeactivate: [CanDeactivateGuard],
            component: UpdateComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Update',
              routeId: 'SettingsSystemUpdate'
            })
          },
          {
            path: 'custometiles',
            canDeactivate: [CanDeactivateGuard],
            component: CustomtilesComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Custom Tiles',
              routeId: 'SettingsSystemCustomeTiles'
            })
          },
          {
            path: 'recentauditlog',
            canDeactivate: [CanDeactivateGuard],
            component: RecentauditlogComponent,
            outlet: 'system',
            data: new NavData({
              title: 'Recent Audit Log',
              routeId: 'SettingsSystemRecentAuditLog'
            })
          }
        ]
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/(main:home)'
  }
];

@NgModule({
  exports: [
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []

})
export class MaterialModule { }
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PrioritySamplesComponent,
    InventoryComponent,
    RemoteControlComponent,
    AnalyticsComponent,
    SettingsComponent,
    DashboardComponent,
    InstrumentsComponent,
    IntegrationsComponent,
    LoginComponent,
    ZonedesignerComponent,
    CannedcommentsComponent,
    RulesComponent,
    UsermanagementComponent,
    SystemComponent,
    ConsumableinventorylevelComponent,
    ReagentinventorylevelComponent,
    CalibrationexpirationComponent,
    ReagentexpirationComponent,
    UserdefinedComponent,
    InstrumenteventComponent,
    CommunicationescalationComponent,
    SystemescalationComponent,
    AssetconfiguratorComponent,
    TitleconfiguratorComponent,
    EnableconfiguratorComponent,
    AlertconfiguratorComponent,
    EmailconfiguratorComponent,
    EscalationresolutionmgmtComponent,
    SharedruleparamsComponent,
    InstrumentconfiguratorComponent,
    EventsconfiguratorComponent,
    SeverityconfiguratorComponent,
    AlertboxComponent,
    DatetimeconfiguratorComponent,
    DescriptionconfiguratorComponent,
    OccurrencepatternconfiguratorComponent,
    SamplesComponent,
    AlertsComponent,
    AutofilterComponent,
    TurnaroundtimeComponent,
    DurationconfiguratorComponent,
    GlobalrulesettingsconfiguratorComponent,
    ManageintegrationComponent,
    GlobaldataroutersettingsconfiguratorComponent,
    InformationboxComponent,
    InstrumentmapComponent,
    ExpansionOverviewComponent,
    ManageIntegrationItemComponent,
    InstrumentItemComponent,
    ManagesitesComponent,
    ActivealertsComponent,
    ThreedviewComponent,
    ActiveAlertTileComponent,
    CannedcommentItemComponent,
    NotificationsComponent,
    MiscellaneousComponent,
    UpdateComponent,
    SystemanalyticsComponent,
    SystemsamplesComponent,
    PurgueComponent,
    RecentauditlogComponent,
    CustomtilesComponent,
    CustomtilesItemComponent,
    SpinnerComponent,
    ColorPickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PolymerModule.forRoot(),
    RouterModule.forRoot(
      routes,
      { enableTracing: true }
    ),
    NgbModule.forRoot(),
    StoreModule.forRoot({
      alertrule: AlertRuleReducer,
      authenticate: UserReducer,
      manageIntegrationItem: IntegrationItemReducer,
      instrumentItem: InstrumentItemReducer,
      integrationEquipmentMaps: IntegrationEquipmentMapsReducer,
      samplerule: SampleRuleReducer,
      autofilterevents: AutoFilterEventsReducer,
      equipmentModel: EquipmentModelReducer,
      zone: ZoneReducer,
      unresolvedalert: UnResolvedAlertReducer,
      resolvedalert: ResolvedAlertReducer,
      noteTemplate: CannedCommentsReducer,
      customTileItem: CustomTileItemReducer
    }),
    EffectsModule.forRoot([RouterEffects, UserEffects]),
    AngularSplitModule,
    DragulaModule,
  ],
  providers: [UserService, AuthService, AuthGuard, RuleDataService, CanDeactivateGuard, IntgrationDataService, SiteService, DataService, AlertDataService, InstrumentDataService, ZoneDataService, DashboardBroadcastService, CustomTileDataService, CannedCommentsDataService, RenderThreeJSObj, ObjectCreationService, RenderZoneDesigner],
  entryComponents: [AppComponent, ExpansionOverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
