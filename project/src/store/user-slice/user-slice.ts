import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  authorizationStatus: true,
  isAuthVerified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state) {state.authorizationStatus = true; state.isAuthVerified = true;},
    logout(state) {state.authorizationStatus = false; state.isAuthVerified = true;},
  },
});

export const {login, logout} = userSlice.actions;
