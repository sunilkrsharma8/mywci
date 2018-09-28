import { Action } from '@ngrx/store'
import { InstrumentItem } from './../models/instrument-item'
import * as InstrumentsActions from './../actions/instruments.actions'

const initialState: Array<InstrumentItem> = [];

export function InstrumentItemReducer(state: any[] = initialState, action: InstrumentsActions.Actions) {
    let instrumentItem: InstrumentItem;
    let index: number;
    switch (action.type) {
        case InstrumentsActions.ADD_INSTRUMENT:
            state.push(action.payload);
            return state;
        case InstrumentsActions.REMOVE_INSTRUMENT:
            instrumentItem = state.find(instrumentItem => instrumentItem.Id == action.payload);
            index = state.indexOf(instrumentItem);
            state.splice(index, 1)
            return state;
        case InstrumentsActions.EMPTY_INSTRUMENT:
            state.splice(0, state.length);
            return state;
        case InstrumentsActions.DATA_SORT:
            state = action.payload;
            return state;
        default:
            return state;
    }
}