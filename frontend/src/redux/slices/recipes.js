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
   }
});

export const {setRecipes, resetRecipes, addRecipe} = recipesSlice.actions;
