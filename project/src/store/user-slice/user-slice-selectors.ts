import { State } from '../../types/types';
import { userSlice } from './user-slice';

export const getAuthStatus = (state: State): boolean => state[userSlice.name].authorizationStatus;
export const getAuthVerifiedStatus = (state: State): boolean => state[userSlice.name].isAuthVerified;
