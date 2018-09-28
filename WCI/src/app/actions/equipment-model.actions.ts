import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { EquipmentModel } from './../models/equipment-model';

export const ADD_EQUIPMENTMODEL = '[EquipmentModel] Add'
export const REMOVE_EQUIPMENTMODEL = '[EquipmentModel] Remove'
export const EMPTY_EQUIPMENTMODEL = '[EquipmentModel] Empty'


export class AddEquipmentModel implements Action {
    readonly type = ADD_EQUIPMENTMODEL

    constructor(public payload: EquipmentModel) { }
}

export class RemoveEquipmentModel implements Action {
    readonly type = REMOVE_EQUIPMENTMODEL

    constructor(public payload: number) { }
}

export class Empty implements Action {
    readonly type = EMPTY_EQUIPMENTMODEL

    constructor() { }
}

export type Actions = AddEquipmentModel | RemoveEquipmentModel | Empty


