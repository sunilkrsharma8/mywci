import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Zone } from './../models/zone';

export const ADD_ZONE = '[ZONE] Add'
export const REMOVE_ZONE = '[ZONE] Remove'
export const EMPTY_ZONE = '[ZONE] Empty'


export class AddZone implements Action {
    readonly type = ADD_ZONE

    constructor(public payload: Zone) { }
}

export class RemoveZone implements Action {
    readonly type = REMOVE_ZONE

    constructor(public payload: number) { }
}

export class Empty implements Action {
    readonly type = EMPTY_ZONE

    constructor() { }
}

export type Actions = AddZone | RemoveZone | Empty


