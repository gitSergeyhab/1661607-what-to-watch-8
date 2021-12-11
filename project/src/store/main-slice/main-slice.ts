import { createSlice } from '@reduxjs/toolkit';
import { getGenreList } from '../../util/util';


type InitialState = {genres: string[]}

const initialState: InitialState = {genres: []};


export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setGenres(state, action) {state.genres = getGenreList(action.payload);},
  },
});

export const {setGenres} = mainSlice.actions;
