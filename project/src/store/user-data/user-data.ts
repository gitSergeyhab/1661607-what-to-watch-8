import { createReducer } from '@reduxjs/toolkit';
import { requireLogin, requireLogout } from '../action';


const initialState = {
  authorizationStatus: true,
  isAuthVerified: false,
};

export const userData = createReducer(initialState, (builder) => {
  builder
    .addCase(requireLogin, (state) => {state.authorizationStatus = true; state.isAuthVerified = true;})
    .addCase(requireLogout, (state) => {state.authorizationStatus = false; state.isAuthVerified = true;});
});
