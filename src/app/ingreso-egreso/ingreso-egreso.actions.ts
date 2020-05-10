import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unsetIngresoEgreso = createAction('[IngresoEgreso] unset IngresoEgreso');

export const setIngresoEgreso = createAction(
    '[IngresoEgreso] set IngresoEgreso',
    props<{ items: IngresoEgreso[] }>()
);
