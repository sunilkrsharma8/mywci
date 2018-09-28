import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/services';
import {observeOn} from "rxjs/operator/observeOn";
import { Store } from "@ngrx/store";
import { AppState } from "../app/app.state";
import * as RouterActions from '../app/actions/router.actions';

@Injectable()
export class AuthGuard implements CanActivate  {
    constructor (private store: Store<AppState>,private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        // get observable
        const authenticate = this.store.select('authenticate');

        // redirect to sign in page if user is not authenticated
        authenticate.subscribe(authenticate => {
        if (!authenticate.authenticated) {
            this.store.dispatch(new RouterActions.Go({
                path: '/(main:login)',
                query: { page: 1 },
                extras: { replaceUrl: false }
            }));
            return false;
        }else{
           return true;
        }
        });

        return true;
    }

}