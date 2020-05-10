import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as ingresoEgresoActions from './ingreso-egreso.actions';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const initialState: IngresoEgresoState = { items: [] };

const _ingresoEgresoReducer = createReducer(initialState,
    on(ingresoEgresoActions.setIngresoEgreso, (state, { items }) => ({
        ...state, items: [...items]
    })),
    on(ingresoEgresoActions.unsetIngresoEgreso, state => ({ ...state, items: [] })));


export function ingresoEgresoReducer(state: IngresoEgresoState, action: Action) {
    return _ingresoEgresoReducer(state, action)
}