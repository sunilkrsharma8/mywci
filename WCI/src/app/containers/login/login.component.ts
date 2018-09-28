import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import * as UserActions from "../../actions/users.actions";
import { Site } from "../../models/site";
import { User } from "../../models/user";
import { SiteService } from "../../services/site.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild("mysites") mysites: ElementRef;
  // @ViewChild("usernameControl") usernameControl: any;;
  @ViewChild("mypwd") mypwd: ElementRef;
  @ViewChild("userLoginModal") userLoginModal: ElementRef;
  isShowManageSites: boolean = false;
  sites: Site[];
  user: User;
  selectedSite: Site;
  error: Observable<string>;

  constructor(public siteService: SiteService, private store: Store<AppState>, private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.sites = this.siteService.getSites();
    this.user = new User("","","");
    if(this.sites.length > 0){
      this.user.site = this.sites[0].name;
      this.selectedSite = this.sites[0];
    }else{
      this.selectedSite = new Site(-1,"","",-1);
    }
  }

  ngOnInit() {
    // subscribe to success
    this.store.select("authenticate")
      .subscribe(authentication => {
        this.error = authentication.error;
        if(authentication.authenticated){
          this.router.navigateByUrl('/(main:home/(home:3dview))');
        }
      });
  }

  ngAfterViewInit() {
    //to be removed after SHUI control for password is available
    if(this.mypwd.nativeElement.shadowRoot  && this.userLoginModal.nativeElement.shadowRoot && this.mypwd.nativeElement.shadowRoot.children && this.userLoginModal.nativeElement.shadowRoot.children){
      this.mypwd.nativeElement.shadowRoot.children[1].firstElementChild.setAttribute("type", "password");
      this.userLoginModal.nativeElement.shadowRoot.children[1].firstElementChild.remove(); 
    }
  }

  public signIn(): void {
     
    // trim values
    this.user.username.trim();
    this.user.password.trim();

    // dispatch AuthenticationAction and pass in payload
    this.store.dispatch(new UserActions.AuthenticateAction(this.user));
  }

  public showManageSites(event: any): void {
    this.isShowManageSites = true;
  }

  public cancelSiteManagement(): void {
    this.isShowManageSites = false;
  }

  public selectSite(site: Site): void {
    this.user.site = site.name;
  }

  public isSiteFormValid(): boolean{
    if((this.user.username != "" && this.user.username != null) && 
    (this.user.password != "" && this.user.password != null)
    && (this.user.site  != "" && this.user.site  != null)){
      return true;
    }
    return false;
  }
}
