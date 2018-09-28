import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Store } from "@ngrx/store";
import { AppState } from "../../../app.state";
import * as UserActions from  "../../../actions/users.actions";
import { Site } from "../../../models/site";
import { SiteService } from "../../../services/site.service";

@Component({
  selector: 'app-managesites',
  templateUrl: './managesites.component.html',
  styleUrls: ['./managesites.component.css']
})
export class ManagesitesComponent implements OnInit, AfterViewInit {
  @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("siteControl") siteControl: ElementRef;
  @ViewChild("newSiteControl") newSiteControl: ElementRef;
  @ViewChild("ipAddControl") ipAddControl: ElementRef;
  @ViewChild("portControl") portControl: ElementRef;
  @ViewChild("manageSitesModal") manageSitesModal: ElementRef
  siteForm: FormGroup;
  sites: Site[];
  isNewSite: boolean = false;
  selectedSite: Site;
  canDelete: boolean = false;
  selectedSiteIndex: number;

  constructor(private siteService: SiteService, private store: Store<AppState>,private authService: AuthService, private router: Router) {
    this.selectedSite = new Site(0, "", "", 2514);
    this.sites = this.siteService.getSites();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.manageSitesModal.nativeElement.shadowRoot.children[1].firstElementChild.remove(); 
  }

  public addSite(event: any): void {
    this.selectedSite.id = this.siteService.addSite(this.selectedSite.name, this.selectedSite.ipAddress, this.selectedSite.port);
    this.sites.push(this.selectedSite);
    this.isNewSite = false;
    this.canDelete = true;
  }

  public deleteSite(event: any): void{
    this.sites = this.siteService.removeSite(this.selectedSite.id);
    if(this.sites.length > 0){
      this.selectedSite = Object.assign(this.selectedSite, this.sites[0]);
    }else{
      this.selectedSite = new Site(-1,"","",2514);
    }
  }

  public cancelSite(event: any): void{
    this.onCancel.emit();
  }

  public selectSite(index: any): void {
    this.selectedSiteIndex = index;
    if (this.selectedSiteIndex != -1) {
        this.selectedSite = Object.assign(this.selectedSite,this.sites[this.selectedSiteIndex]);
        this.canDelete = true;
        this.isNewSite = false;
    } else {
      this.selectedSite = new Site(-1,"","",2514);
      this.isNewSite = true;
      this.canDelete = false;
    }
  }

  public isSiteFormValid(): boolean{
    if((this.selectedSite.name != "" && this.selectedSite.name != null) && 
    (this.selectedSite.ipAddress != "" && this.selectedSite.ipAddress != null)
    && (this.selectedSite.port  != 0 && this.selectedSite.port  != null) && this.isNewSite ){
      return true;
    }
    return false;
  } 
}
