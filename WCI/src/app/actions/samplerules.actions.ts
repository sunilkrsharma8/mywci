import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { SampleRule } from './../models/samplerule';

export const ADD_SAMPLERULE       = '[SAMPLERULE] Add'
export const ADD_SAMPLERULE_BYINDEX       = '[SAMPLERULE] AddByIndex'
export const REMOVE_SAMPLERULE    = '[SAMPLERULE] Remove'
export const REMOVE_SAMPLERULE_BYINDEX    = '[SAMPLERULE] RemoveByIndex'
export const UPDATE_SAMPLERULE    = '[SAMPLERULE] Update'
export const UPDATE_SAMPLERULE_DESCRIPTION = '[SAMPLERULE] UpdateDescription'
export const SORT_SAMPLERULE_DESCRIPTION_NAME = '[SAMPLERULE] SortByDescriptionName'
export const SORT_SAMPLERULE_NAME = '[SAMPLERULE] SortByName'
export const SORT_SAMPLERULE_ENABLED = '[SAMPLERULE] SortByEnabled'
export const EMPTY_SAMPLERULE = '[SAMPLERULE] Empty'

export class AddSampleRule implements Action {
    readonly type = ADD_SAMPLERULE

    constructor(public payload: SampleRule) {}
}

export class AddSampleRuleByIndex implements Action {
    readonly type = ADD_SAMPLERULE_BYINDEX

    constructor(public payload: {index:number, rule: SampleRule}) {}
}

export class RemoveSampleRule implements Action {
    readonly type = REMOVE_SAMPLERULE

    constructor(public payload: number) {}
}

export class RemoveSampleRuleByIndex implements Action {
    readonly type = REMOVE_SAMPLERULE_BYINDEX

    constructor(public payload: number) {}
}

export class UpdateSampleRule implements Action {
    readonly type = UPDATE_SAMPLERULE

    constructor(public payload: SampleRule) {}
}

export class UpdateSampleRuleDescription implements Action {
    readonly type = UPDATE_SAMPLERULE_DESCRIPTION

    constructor(public payload: SampleRule) {}
}

export class SortSampleRuleByDescriptionName implements Action {
    readonly type = SORT_SAMPLERULE_DESCRIPTION_NAME

    constructor(public payload: boolean) {}
}

export class SortSampleRuleByName implements Action {
    readonly type = SORT_SAMPLERULE_NAME

    constructor(public payload: boolean) {}
}

export class SortSampleRuleByEnabled implements Action {
    readonly type = SORT_SAMPLERULE_ENABLED

    constructor(public payload: boolean) {}
}

export class EmptySample implements Action {
    readonly type = EMPTY_SAMPLERULE

    constructor() {}
}

export type Actions = AddSampleRule | RemoveSampleRule | RemoveSampleRuleByIndex | AddSampleRuleByIndex | UpdateSampleRule | UpdateSampleRuleDescription | SortSampleRuleByDescriptionName | SortSampleRuleByName | SortSampleRuleByEnabled | EmptySample