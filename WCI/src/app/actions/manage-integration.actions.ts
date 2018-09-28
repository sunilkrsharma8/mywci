import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { ManageIntegrationItem } from './../models/manage-integration-item';


export const ADD_MANAGE_INTEGRATION_ITEM       = '[MANAGEINTEGRATIONITEM] Add'
export const REMOVE_MANAGE_INTEGRATION_ITEM     = '[MANAGEINTEGRATIONITEM] Remove'
export const EMPTY_MANAGE_INTEGRATION_ITEM = '[MANAGEINTEGRATIONITEM] Empty'

export class AddManageIntegrationItem implements Action {
    readonly type = ADD_MANAGE_INTEGRATION_ITEM

    constructor(public payload: ManageIntegrationItem) {}
}

export class RemoveManageIntegrationItem implements Action{
    readonly type = REMOVE_MANAGE_INTEGRATION_ITEM

    constructor(public payload: number){}
}

export class Empty implements Action {
    readonly type = EMPTY_MANAGE_INTEGRATION_ITEM

    constructor() {}
}

export type Actions = AddManageIntegrationItem | RemoveManageIntegrationItem | Empty