import { Action } from '@ngrx/store'
import { CustomTileItem } from './../models/customtile-item'
import * as CustomTileActions from './../actions/customtile.actions'

const initialState: Array<CustomTileItem> = [];

export function CustomTileItemReducer(state: any[] = initialState, action: CustomTileActions.Actions) {
    let customtileItem: CustomTileItem;
    let index: number;
    switch (action.type) {
        case CustomTileActions.ADD_CUSTOMTILE:
            state.push(action.payload);
            return state;
        case CustomTileActions.REMOVE_CUSTOMTILE:
            customtileItem = state.find(customtileItem => customtileItem.Id == action.payload);
            index = state.indexOf(customtileItem);
            state.splice(index, 1)
            return state;
        case CustomTileActions.EMPTY_CUSTOMTILE:
            state.splice(0, state.length);
            return state;
        case CustomTileActions.DATA_SORT:
            state = action.payload;
            return state;
        default:
            return state;
    }
}