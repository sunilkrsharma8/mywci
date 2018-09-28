import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Alert } from './../models/alert';

export const ADD_ALERT   = '[ACTIVE_ALERT] Add'
export const EMPTY_ALERT = '[ACTIVE_ALERT] Empty'
export const UPDATE_ALERT = '[ACTIVE_ALERT] Update'

export class AddAlert implements Action {
    readonly type = ADD_ALERT

    constructor(public payload: Alert) {}
}


export class Empty implements Action {
    readonly type = EMPTY_ALERT

    constructor() {}
}

export class UpdateAlert implements Action {
    readonly type = UPDATE_ALERT

    constructor(public payload: Alert) {}
}

export type Actions = AddAlert | Empty | UpdateAlert