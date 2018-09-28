import { Action } from '@ngrx/store'
import { AutoFilterEvent } from './../models/autofilterevent';
import * as AutoFilterActions from './../actions/autofilterevents.actions';

const initialState: Array<any> = [];

export function AutoFilterEventsReducer(state: any[] = initialState, action: AutoFilterActions.Actions) {
    let index: number;
    switch (action.type) {
        case AutoFilterActions.AUTOFILTEREVENT_ADD:
            state.push(action.payload);
            return state;

        case AutoFilterActions.EMPTY_AUTOFILTEREVENT:
            state.splice(0, state.length);
            return state;

        case AutoFilterActions.AUTOFILTEREVENT_UPDATE:
            let alert = state.find(alert => alert.Id == action.payload.UpdateInstrumentEventResult.Id);
            index = state.indexOf(alert);
            state[index].FilterState = alert.FilterState ? 1 : 0;
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_NAME:
            state.sort(function (event1: any, event2: any): number {
                var textNameA = event1.DisplayName.toUpperCase();
                var textNameB = event2.DisplayName.toUpperCase();
                if (action.payload) {
                    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                } else {
                    return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_SHOWHIDE:
            state.sort(function (event1: any, event2: any): number {
                var textNameA = event1.FilterState;
                var textNameB = event2.FilterState;
                if (action.payload) {
                    return (textNameA < textNameB) ? 1 : -1;
                } else {
                    return (textNameA > textNameB) ? 1 : -1;
                }
            });
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_TYPE:
            if (state !== null && typeof (state) != 'undefined') {
                state.sort(function (event1: any, event2: any): number {
                    var textNameA = event1.Severity;
                    var textNameB = event2.Severity;
                    if (action.payload) {
                        return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                    } else {
                        return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                    }
                });
            }
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_EVENTCODE:
            state.sort(function (event1: any, event2: any): number {
                var textNameA = event1.Code.toUpperCase();
                var textNameB = event2.Code.toUpperCase();
                if (action.payload) {
                    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                } else {
                    return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_MESSAGE:
            state.sort(function (event1: any, event2: any): number {
                var textNameA = event1.Message.toUpperCase();
                var textNameB = event2.Message.toUpperCase();
                if (action.payload) {
                    return (textNameA < textNameB) ? -1 : (textNameA > textNameB) ? 1 : 0;
                } else {
                    return (textNameA > textNameB) ? -1 : (textNameA < textNameB) ? 1 : 0;
                }
            });
            return state;

        case AutoFilterActions.SORT_AUTOFILTEREVENT_ACTIVE:
            if (state !== null && typeof (state) != 'undefined') {
                state.sort(function (event1: any, event2: any): number {
                    var textNameA = event1.FilterState;
                    var textNameB = event2.FilterState;
                    if (action.payload) {
                        return (textNameA < textNameB) ? 1 : -1;
                    } else {
                        return (textNameA > textNameB) ? 1 : -1;
                    }
                });
            }
            return state;

        default:
            return state;
    }
}