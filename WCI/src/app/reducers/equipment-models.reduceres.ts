import { Action } from '@ngrx/store'
import { EquipmentModel } from './../models/equipment-model'
import * as EquipmentModelActions from './../actions/equipment-model.actions'

const initialState: Array<EquipmentModel> = [];

export function EquipmentModelReducer(state: any[] = initialState, action: EquipmentModelActions.Actions) {
    let equipmentModel: EquipmentModel;
    let index: number;
    switch (action.type) {
        case EquipmentModelActions.ADD_EQUIPMENTMODEL:
            state.push(action.payload);
            return state;
        case EquipmentModelActions.REMOVE_EQUIPMENTMODEL:
            equipmentModel = state.find(equipmentModel => equipmentModel.Id == action.payload);
            index = state.indexOf(equipmentModel);
            state.splice(index, 1)
            return state;
        case EquipmentModelActions.EMPTY_EQUIPMENTMODEL:
            state.splice(0, state.length);
            return state;
        default:
            return state;
    }
}