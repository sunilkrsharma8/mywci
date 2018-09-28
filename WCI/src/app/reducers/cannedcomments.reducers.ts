import { Action } from '@ngrx/store'
import { NoteTemplate } from './../models/notetemplate'
import * as CannedCommentsActions from './../actions/cannedcomments.actions'

const initialState: Array<NoteTemplate> = [];

export function CannedCommentsReducer(state: any[] = initialState, action: CannedCommentsActions.Actions) {
    let noteTemplate: NoteTemplate;
    let index: number;
    switch (action.type) {
        case CannedCommentsActions.ADD_CANNED_COMMENTS:
            state.push(action.payload);
            return state;
        case CannedCommentsActions.REMOVE_CANNED_COMMENTS:
        noteTemplate = state.find(noteTemplate => noteTemplate.Id == action.payload);
            index = state.indexOf(noteTemplate);
            state.splice(index, 1)
            return state;
        case CannedCommentsActions.EMPTY_CANNED_COMMENTS:
            state.splice(0, state.length);
            return state;
        case CannedCommentsActions.UPDATE_CANNED_COMMENTS:
            noteTemplate = state.find(noteTemplate => noteTemplate.Id == action.payload.Id);
            index = state.indexOf(noteTemplate);
            state[index] = action.payload;
            return state;

        case CannedCommentsActions.CANNED_COMMENTS_SORT:
            state = action.payload;
            return state;

        default:
            return state;
    }
}