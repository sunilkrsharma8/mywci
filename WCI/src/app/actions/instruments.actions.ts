import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { InstrumentItem } from './../models/instrument-item';


export const ADD_INSTRUMENT       = '[INSTRUMENTITEM] Add'
export const REMOVE_INSTRUMENT     = '[INSTRUMENTITEM] Remove'
export const EMPTY_INSTRUMENT = '[INSTRUMENTITEM] Empty'
export const DATA_SORT = '[INSTRUMENTITEM] dataSort'


export class AddInstrument implements Action {
    readonly type = ADD_INSTRUMENT

    constructor(public payload: InstrumentItem) {}
}

export class RemoveInstrument implements Action{
    readonly type = REMOVE_INSTRUMENT

    constructor(public payload: number){}
}

export class Empty implements Action {
    readonly type = EMPTY_INSTRUMENT

    constructor() {}
}

export class dataSort implements Action {
    readonly type = DATA_SORT
    constructor(public payload: Array<InstrumentItem>) {}
}



export type Actions = AddInstrument | RemoveInstrument | Empty | dataSort


