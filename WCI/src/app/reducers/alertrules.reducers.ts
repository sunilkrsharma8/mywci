import { Action } from '@ngrx/store'
import { AlertRule } from './../models/alertrule'
import * as AlertRuleActions from './../actions/alertrules.actions'

const initialState: Array<AlertRule> = [];

export function AlertRuleReducer(state: any[] = initialState, action: AlertRuleActions.Actions) {
    let rule: AlertRule;
    let index: number;
    switch(action.type) {
        case AlertRuleActions.ADD_ALERTRULE:
            //return [...state, action.payload];
            state.push(action.payload);
            return state;
        case AlertRuleActions.ADD_ALERTRULE_BYINDEX:
            state.splice(action.payload.index, 0, action.payload.rule);
            return state;
        case AlertRuleActions.REMOVE_ALERTRULE:
            rule = state.find(rule => rule.Id == action.payload);
            let index = state.indexOf(rule);
            state.splice(index, 1)
            return state;
        case AlertRuleActions.REMOVE_ALERTRULE_BYINDEX:
            state.splice(action.payload, 1)
            return state;
        case AlertRuleActions.EMPTY_ALERTRULE:
            state.splice(0,state.length);
            return state;
        case AlertRuleActions.UPDATE_ALERTRULE:
            rule = state.find(rule => rule.Id == 0);
            index = state.indexOf(rule);
            state[index] = action.payload;
            return state;
        case AlertRuleActions.UPDATE_ALERTRULE_DESCRIPTION:
            rule = state.find(rule => rule.Id == action.payload.Id);
            index = state.indexOf(rule);
            state[index] = action.payload;
            return state;
        case AlertRuleActions.SORT_ALERTRULE_DESCRIPTION_NAME:
            state.sort(function(rule1: any, rule2: any):number {
                var textDescriptionA = rule1.TypeDescription.toUpperCase();
                var textDescriptionB = rule2.TypeDescription.toUpperCase();
                var textNameA = rule1.Name.toUpperCase();
                var textNameB = rule2.Name.toUpperCase();
                if(action.payload == true){
                return (textDescriptionA < textDescriptionB) ? -1 : (textDescriptionA > textDescriptionB) ? 1 : 0 || (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                }else{
                return (textDescriptionA > textDescriptionB) ? -1 : (textDescriptionA < textDescriptionB) ? 1 : 0 || (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
            return state;
        case AlertRuleActions.SORT_ALERTRULE_NAME:
            state.sort(function(rule1: any, rule2: any):number {
                var textNameA = rule1.Name.toUpperCase();
                var textNameB = rule2.Name.toUpperCase();
                if(action.payload == true){
                    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                }else{
                    return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
           return state;
        case AlertRuleActions.SORT_ALERTRULE_ENABLED:
            state.sort(function(rule1: any, rule2: any):number {
                var textNameA = rule1.Enabled ? 1 : 0;
                var textNameB = rule2.Enabled ? 1 : 0;
                if(action.payload == true){
                    return (textNameA < textNameB) ? 1 : -1;
                }else{
                    return (textNameA > textNameB) ? 1 : -1;
                }
            });
           return state;
        default:
            return state;
    }
}