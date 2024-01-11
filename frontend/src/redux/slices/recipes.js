import {createSlice} from '@reduxjs/toolkit';

export const recipesSlice = createSlice({
   name: 'recipes',
   initialState: [],
   reducers: {
       setRecipes(state, action) {
           return action.payload;
       },
       resetRecipes() {
           return [];
       },
       addRecipe(state, action) {
           state.push(action.payload);
       },
       removeRecipe(state, action) {
           return state.filter(r => r._id !== action.payload._id);
       }
   }
});

export const {setRecipes, resetRecipes, addRecipe, removeRecipe} = recipesSlice.actions;
