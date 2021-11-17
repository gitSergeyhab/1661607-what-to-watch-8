import { State } from '../../types/types';
import { ReducerName } from '../root-reducer';


export const getAuthStatus = (state: State): boolean => state[ReducerName.UserData].authorizationStatus;
export const getAuthVerifiedStatus = (state: State): boolean => state[ReducerName.UserData].isAuthVerified;

