import { Action } from '@ngrx/store'
import { ManageIntegrationItem } from './../models/manage-integration-item'
import * as IntegrationActions from './../actions/integrations.actions'

const initialState: Array<ManageIntegrationItem> = [];

export function IntegrationItemReducer(state: any[] = initialState, action: IntegrationActions.Actions) {
    let integrationItem: ManageIntegrationItem;
    let index: number;
    switch (action.type) {
        case IntegrationActions.ADD_MANAGE_INTEGRATION_ITEM:
            state.push(action.payload);
            return state;
        case IntegrationActions.REMOVE_MANAGE_INTEGRATION_ITEM:
            integrationItem = state.find(integrationItem => integrationItem.Id == action.payload);
            index = state.indexOf(integrationItem);
            state.splice(index, 1)
            return state;
        case IntegrationActions.EMPTY_MANAGE_INTEGRATION_ITEM:
            state.splice(0, state.length);
            return state;
        case IntegrationActions.UPDATE_EXT_SYS_CONFIG:
            state.find(extsys => extsys.Id == action.payload['UpdateExternalSystemResult'].Id).Status = action.payload['UpdateExternalSystemResult'].Status;
            return state;
        case IntegrationActions.EXT_SYS_SORT:
            state = action.payload;
            return state;

        default:
            return state;
    }
}