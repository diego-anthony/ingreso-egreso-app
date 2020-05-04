import { createReducer, on, State, Action } from '@ngrx/store';
import { startLoading, stopLoading } from './ui.actions';

export interface UiState {
    isLoading: boolean
}

const initialState: UiState = { isLoading: false };

const _uiReducer = createReducer(initialState,
    on(startLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false })));

export function uiReducer(state:UiState, action:Action){
    return _uiReducer(state, action);
}