import { Router } from '@angular/router';
import {Injectable, EventEmitter} from '@angular/core';
import {User} from "../models/user";
import {Output} from "@angular/core";

@Injectable()
export class AuthService {
    private isAuth = false;
    private signedInUser: User;
    @Output() newUser = new EventEmitter<string>();

    constructor(private router: Router) {}

    signinUser(user: User) {
        this.isAuth = true;
        this.signedInUser = user;
        this.newUser.emit(user.username);
    }

    currentUsername(): string {
        return this.signedInUser.username;
    }

    isAuthenticated() {
        return this.isAuth;
    }

    logout() {
        this.isAuth = false;
        this.router.navigate(['/login']);
    }
}