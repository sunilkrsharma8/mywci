import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { NoteTemplate } from './../models/notetemplate';

export const ADD_CANNED_COMMENTS       = '[NOTETEMPLATE] Add'
export const REMOVE_CANNED_COMMENTS    = '[NOTETEMPLATE] Remove'
export const EMPTY_CANNED_COMMENTS = '[NOTETEMPLATE] Empty'
export const UPDATE_CANNED_COMMENTS = '[NOTETEMPLATE] Update'
export const CANNED_COMMENTS_SORT = '[NOTETEMPLATE] Sort'

export class AddCannedComment implements Action {
    readonly type = ADD_CANNED_COMMENTS

    constructor(public payload: NoteTemplate) {}
}

export class RemoveCannedComment implements Action{
    readonly type = REMOVE_CANNED_COMMENTS

    constructor(public payload: number){}
}

export class Empty implements Action {
    readonly type = EMPTY_CANNED_COMMENTS

    constructor() {}
}
export class UpdateCannedComment implements Action {
    readonly type = UPDATE_CANNED_COMMENTS

    constructor(public payload: NoteTemplate) {}
}
export class CannedCommentSort implements Action {
    readonly type = CANNED_COMMENTS_SORT
    constructor(public payload: Array<NoteTemplate>) {}
}

export type Actions = AddCannedComment | RemoveCannedComment | Empty | UpdateCannedComment | CannedCommentSort