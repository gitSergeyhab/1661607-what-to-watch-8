import { createReducer } from '@reduxjs/toolkit';
import { requireLogin, requireLogout } from '../action';


const initialState = {authorizationStatus: true};

export const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireLogin, (state) => {state.authorizationStatus = true;})
    .addCase(requireLogout, (state) => {state.authorizationStatus = false;});
});
