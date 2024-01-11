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
       },
       addFavorite(state, action) {
           state.push(action.payload);
       },
       removeFavorite(state, action) {
            return state.filter(f => f.recipe !== action.payload._id);
       }
   }
});

export const {setFavorites, resetFavorites, addFavorite, removeFavorite} = favoritesSlice.actions;
