import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { ManageIntegrationItem } from './../models/manage-integration-item';

export const ADD_MANAGE_INTEGRATION_ITEM       = '[MANAGEINTEGRATIONITEM] Add'
export const REMOVE_MANAGE_INTEGRATION_ITEM     = '[MANAGEINTEGRATIONITEM] Remove'
export const EMPTY_MANAGE_INTEGRATION_ITEM = '[MANAGEINTEGRATIONITEM] Empty'
export const UPDATE_EXT_SYS_CONFIG = '[MANAGEINTEGRATIONITEM] UpdateSysConfig'
export const EXT_SYS_SORT = '[MANAGEINTEGRATIONITEM] ExtSysSort'

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
export class UpdateSysConfig implements Action {
    readonly type = UPDATE_EXT_SYS_CONFIG

    constructor(public payload: ManageIntegrationItem) {}
}
export class ExtSysSort implements Action {
    readonly type = EXT_SYS_SORT
    constructor(public payload: Array<ManageIntegrationItem>) {}
}

export type Actions = AddManageIntegrationItem | RemoveManageIntegrationItem | Empty | UpdateSysConfig | ExtSysSort