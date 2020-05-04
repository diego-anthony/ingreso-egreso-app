import { UiState, uiReducer } from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
export interface AppState{
    ui:UiState,
    auth:AuthState
}

export const appReducer:ActionReducerMap<AppState> = {
    ui:uiReducer,
    auth:authReducer
}