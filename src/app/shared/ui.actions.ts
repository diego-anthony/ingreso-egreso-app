import { createAction } from '@ngrx/store';

export const startLoading = createAction('[Loading] start');

export const stopLoading = createAction('[Loading] stop');