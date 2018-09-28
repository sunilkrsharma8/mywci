import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { AutoFilterEvent } from './../models/autofilterevent';

export const AUTOFILTEREVENT_ADD = '[AUTOFILTEREVENT] Add'
export const AUTOFILTEREVENT_UPDATE = '[AUTOFILTEREVENT] Update'
export const SORT_AUTOFILTEREVENT_SHOWHIDE = '[AUTOFILTEREVENT] SortByShowHide'
export const SORT_AUTOFILTEREVENT_NAME = '[AUTOFILTEREVENT] SortByName'
export const SORT_AUTOFILTEREVENT_MESSAGE = '[AUTOFILTEREVENT] SortByMessage'
export const SORT_AUTOFILTEREVENT_EVENTCODE = '[AUTOFILTEREVENT] SortByEventCode'
export const SORT_AUTOFILTEREVENT_TYPE = '[AUTOFILTEREVENT] SortByType'
export const SORT_AUTOFILTEREVENT_ACTIVE = '[AUTOFILTEREVENT] SortByActive'
export const EMPTY_AUTOFILTEREVENT = '[AUTOFILTEREVENT] Empty'

export class AddEvent implements Action {
    readonly type = AUTOFILTEREVENT_ADD
    constructor(public payload: AutoFilterEvent) { }
}

export class UpdateEvent implements Action {
    readonly type = AUTOFILTEREVENT_UPDATE
    constructor(public payload: any) { }
}

export class SortByShowHide implements Action {
    readonly type = SORT_AUTOFILTEREVENT_SHOWHIDE
    constructor(public payload: boolean) { }
}

export class SortEventByName implements Action {
    readonly type = SORT_AUTOFILTEREVENT_NAME
    constructor(public payload: boolean) { }
}

export class SortEventByMessage implements Action {
    readonly type = SORT_AUTOFILTEREVENT_MESSAGE
    constructor(public payload: boolean) { }
}

export class SortByEventCode implements Action {
    readonly type = SORT_AUTOFILTEREVENT_EVENTCODE
    constructor(public payload: boolean) { }
}

export class SortByType implements Action {
    readonly type = SORT_AUTOFILTEREVENT_TYPE
    constructor(public payload: boolean) { }
}

export class SortByActive implements Action {
    readonly type = SORT_AUTOFILTEREVENT_ACTIVE
    constructor(public payload: boolean) { }
}

export class Empty implements Action {
    readonly type = EMPTY_AUTOFILTEREVENT
    constructor() { }
}

export type Actions = AddEvent | UpdateEvent | SortByShowHide | SortEventByName | SortEventByMessage | SortByEventCode | SortByType | SortByActive | Empty