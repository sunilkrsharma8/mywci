import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { AlertRule } from './../models/alertrule';

export const ADD_ALERTRULE       = '[ALERTRULE] Add'
export const ADD_ALERTRULE_BYINDEX       = '[ALERTRULE] AddByIndex'
export const REMOVE_ALERTRULE    = '[ALERTRULE] Remove'
export const REMOVE_ALERTRULE_BYINDEX    = '[ALERTRULE] RemoveByIndex'
export const UPDATE_ALERTRULE    = '[ALERTRULE] Update'
export const UPDATE_ALERTRULE_DESCRIPTION = '[ALERTRULE] UpdateDescription'
export const SORT_ALERTRULE_DESCRIPTION_NAME = '[ALERTRULE] SortByDescriptionName'
export const SORT_ALERTRULE_NAME = '[ALERTRULE] SortByName'
export const SORT_ALERTRULE_ENABLED = '[ALERTRULE] SortByEnabled'
export const EMPTY_ALERTRULE = '[ALERTRULE] Empty'

export class AddRule implements Action {
    readonly type = ADD_ALERTRULE

    constructor(public payload: AlertRule) {}
}

export class AddRuleByIndex implements Action {
    readonly type = ADD_ALERTRULE_BYINDEX

    constructor(public payload: {index:number, rule: AlertRule}) {}
}

export class RemoveRule implements Action {
    readonly type = REMOVE_ALERTRULE

    constructor(public payload: number) {}
}

export class RemoveRuleByIndex implements Action {
    readonly type = REMOVE_ALERTRULE_BYINDEX

    constructor(public payload: number) {}
}

export class UpdateRule implements Action {
    readonly type = UPDATE_ALERTRULE

    constructor(public payload: AlertRule) {}
}

export class UpdateRuleDescription implements Action {
    readonly type = UPDATE_ALERTRULE_DESCRIPTION

    constructor(public payload: AlertRule) {}
}

export class SortRuleByDescriptionName implements Action {
    readonly type = SORT_ALERTRULE_DESCRIPTION_NAME

    constructor(public payload: boolean) {}
}

export class SortRuleByName implements Action {
    readonly type = SORT_ALERTRULE_NAME

    constructor(public payload: boolean) {}
}

export class SortRuleByEnabled implements Action {
    readonly type = SORT_ALERTRULE_ENABLED

    constructor(public payload: boolean) {}
}

export class Empty implements Action {
    readonly type = EMPTY_ALERTRULE

    constructor() {}
}

export type Actions = AddRule | RemoveRule | RemoveRuleByIndex | AddRuleByIndex | UpdateRule | UpdateRuleDescription | SortRuleByDescriptionName | SortRuleByName | SortRuleByEnabled | Empty