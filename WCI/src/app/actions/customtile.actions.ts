import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { CustomTileItem } from './../models/customtile-item';


export const ADD_CUSTOMTILE      = '[CUSTOMTILEITEM] Add'
export const REMOVE_CUSTOMTILE     = '[CUSTOMTILEITEM] Remove'
export const EMPTY_CUSTOMTILE = '[CUSTOMTILEITEM] Empty'
export const DATA_SORT = '[CUSTOMTILEITEM] dataSort'


export class AddCustomTile implements Action {
    readonly type = ADD_CUSTOMTILE

    constructor(public payload: CustomTileItem) {}
}

export class RemoveCustomTile implements Action{
    readonly type = REMOVE_CUSTOMTILE

    constructor(public payload: number){}
}

export class Empty implements Action {
    readonly type = EMPTY_CUSTOMTILE

    constructor() {}
}

export class dataSort implements Action {
    readonly type = DATA_SORT
    constructor(public payload: Array<CustomTileItem>) {}
}



export type Actions = AddCustomTile | RemoveCustomTile | Empty | dataSort


