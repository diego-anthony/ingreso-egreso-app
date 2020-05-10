import { UiState, uiReducer } from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AuthState, authReducer } from './auth/auth.reducer';
import { IngresoEgresoState, ingresoEgresoReducer } from './ingreso-egreso/ingreso-egreso.reducer';
export interface AppState{
    ui:UiState,
    auth:AuthState,
    ingresoEgreso:IngresoEgresoState
}

export const appReducer:ActionReducerMap<AppState> = {
    ui:uiReducer,
    auth:authReducer,
    ingresoEgreso:ingresoEgresoReducer,
}