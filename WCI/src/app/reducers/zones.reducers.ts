import { Action } from '@ngrx/store'
import { Zone } from './../models/zone'
import * as ZonesActions from './../actions/zones.actions'

const initialState: Array<Zone> = [];

export function ZoneReducer(state: any[] = initialState, action: ZonesActions.Actions) {
    let zone: Zone;
    let index: number;
    switch (action.type) {
        case ZonesActions.ADD_ZONE:
            state.push(action.payload);
            return state;
        case ZonesActions.REMOVE_ZONE:
            zone = state.find(zone => zone.Id == action.payload);
            index = state.indexOf(zone);
            state.splice(index, 1)
            return state;
        case ZonesActions.EMPTY_ZONE:
            state.splice(0, state.length);
            return state;
        default:
            return state;
    }
}