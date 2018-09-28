import { Action } from '@ngrx/store'
import { ManageIntegrationItem } from './../models/manage-integration-item'
import * as ManageIntegrationActions from './../actions/manage-integration.actions'

const initialState: Array<ManageIntegrationItem> = [];

export function ManageIntegrationItemReducer(state: any[] = initialState, action: ManageIntegrationActions.Actions) {
    let integrationItem: ManageIntegrationItem;
    let index: number;
    switch (action.type) {
        case ManageIntegrationActions.ADD_MANAGE_INTEGRATION_ITEM:
            state.push(action.payload);
            return state;
        case ManageIntegrationActions.REMOVE_MANAGE_INTEGRATION_ITEM:
            integrationItem = state.find(integrationItem => integrationItem.Id == action.payload);
            index = state.indexOf(integrationItem);
            state.splice(index, 1)
            return state;
        case ManageIntegrationActions.EMPTY_MANAGE_INTEGRATION_ITEM:
            state.splice(0, state.length);
            return state;
        default:
            return state;
    }
}