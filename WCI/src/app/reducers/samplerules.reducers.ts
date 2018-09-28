import { Action } from '@ngrx/store'
import { SampleRule } from './../models/samplerule'
import * as SampleRuleActions from './../actions/samplerules.actions'

const initialState: Array<any> = [];

export function SampleRuleReducer(state: any[] = initialState, action: SampleRuleActions.Actions) {
    let rule: SampleRule;
    let index: number;
    switch (action.type) {
        case SampleRuleActions.ADD_SAMPLERULE:
            state.push(action.payload);
            return state;
        case SampleRuleActions.ADD_SAMPLERULE_BYINDEX:
            state.splice(action.payload.index, 0, action.payload.rule);
            return state;
        case SampleRuleActions.REMOVE_SAMPLERULE:
            rule = state.find(rule => rule.Id == action.payload);
            let index = state.indexOf(rule);
            state.splice(index, 1)
            return state;
        case SampleRuleActions.REMOVE_SAMPLERULE_BYINDEX:
            state.splice(action.payload, 1)
            return state;
        case SampleRuleActions.EMPTY_SAMPLERULE:
            state.splice(0, state.length);
            return state;
        case SampleRuleActions.UPDATE_SAMPLERULE:
            rule = state.find(rule => rule.Id == 0);
            index = state.indexOf(rule);
            state[index] = action.payload;
            return state;
        case SampleRuleActions.UPDATE_SAMPLERULE_DESCRIPTION:
            rule = state.find(rule => rule.Id == action.payload.Id);
            index = state.indexOf(rule);
            state[index] = action.payload;
            return state;
        case SampleRuleActions.SORT_SAMPLERULE_DESCRIPTION_NAME:
            state.sort(function (rule1: any, rule2: any): number {
                var textDescriptionA = rule1.TypeDescription.toUpperCase();
                var textDescriptionB = rule2.TypeDescription.toUpperCase();
                var textNameA = rule1.Name.toUpperCase();
                var textNameB = rule2.Name.toUpperCase();
                if (action.payload == true) {
                    return (textDescriptionA < textDescriptionB) ? -1 : (textDescriptionA > textDescriptionB) ? 1 : 0 || (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                } else {
                    return (textDescriptionA > textDescriptionB) ? -1 : (textDescriptionA < textDescriptionB) ? 1 : 0 || (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
            return state;
          case SampleRuleActions.SORT_SAMPLERULE_NAME:
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
          case SampleRuleActions.SORT_SAMPLERULE_ENABLED:
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