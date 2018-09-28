import { Action } from '@ngrx/store'
import { Alert } from './../models/alert'
import * as AlertActions from './../actions/resolvedalerts.actions'

const initialState: Array<Alert> = [];

export function ResolvedAlertReducer(state: any[] = initialState, action: AlertActions.Actions) {
    let index: number;
    switch(action.type) {
        case AlertActions.ADD_ALERT:
            state.push(action.payload);
            return state;
        case AlertActions.EMPTY_ALERT:
            state.splice(0,state.length);
            return state;
        case AlertActions.UPDATE_ALERT:
            let alert = state.find(alert => alert.Id == action.payload.Id);
            index = state.indexOf(alert);
            state[index].Notes = action.payload.Notes;
            return state;
        default:
            return state;
    }
}