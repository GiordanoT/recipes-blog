import {createSlice} from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
   name: 'favorites',
   initialState: [],
   reducers: {
       setFavorites(state, action) {
           return action.payload;
       },
       resetFavorites() {
           return [];
       }
   }
});

export const {setFavorites, resetFavorites} = favoritesSlice.actions;
