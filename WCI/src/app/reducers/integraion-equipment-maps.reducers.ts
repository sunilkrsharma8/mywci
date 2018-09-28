import { Action } from '@ngrx/store'
import { IntegrationEquipmentMap } from './../models/integration-equipment-map'
import * as IntegrationEquipmentMapsActions from './../actions/integration-equipment-maps.actions'

const initialState: Array<IntegrationEquipmentMap> = [];

export function IntegrationEquipmentMapsReducer(state: any[] = initialState, action: IntegrationEquipmentMapsActions.Actions) {
    let integrationEquipmentMap: IntegrationEquipmentMap;
    let index: number;
    switch (action.type) {
        case IntegrationEquipmentMapsActions.ADD_INTEGRATION_EQUIPMENT_MAP:
            state.push(action.payload);
            return state;
        case IntegrationEquipmentMapsActions.UPDATE_INTEGRATION_EQUIPMENT_MAPS:
            state; //= action.payload;
            return state;
        case IntegrationEquipmentMapsActions.EMPTY_INTEGRATION_EQUIPMENT_MAPS:
            state.splice(0, state.length);
            return state;
        default:
            return state;
    }
}