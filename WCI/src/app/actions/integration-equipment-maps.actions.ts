import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { IntegrationEquipmentMap } from './../models/integration-equipment-map';

export const ADD_INTEGRATION_EQUIPMENT_MAP      = '[INTEGRATIONEQUIPMENTMAP] Add'
export const UPDATE_INTEGRATION_EQUIPMENT_MAPS       = '[INTEGRATIONEQUIPMENTMAP] Update'
export const EMPTY_INTEGRATION_EQUIPMENT_MAPS       = '[INTEGRATIONEQUIPMENTMAP] Empty'

export class AddIntegrationEquipmentMap implements Action {
    readonly type = ADD_INTEGRATION_EQUIPMENT_MAP
    constructor(public payload: IntegrationEquipmentMap) {}
}

export class UpdateIntegrationEquipmentMaps implements Action {
    readonly type = UPDATE_INTEGRATION_EQUIPMENT_MAPS
    constructor(public payload: Array<IntegrationEquipmentMap>) {}
}

export class Empty implements Action {
    readonly type = EMPTY_INTEGRATION_EQUIPMENT_MAPS

    constructor() {}
}

export type Actions =  AddIntegrationEquipmentMap | UpdateIntegrationEquipmentMaps  | Empty 


