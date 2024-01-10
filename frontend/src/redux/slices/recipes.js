import {createSlice} from '@reduxjs/toolkit';

export const recipesSlice = createSlice({
   name: 'recipes',
   initialState: [],
   reducers: {
       setRecipes(state, action) {
           state.push(...action.payload);
       },
       resetRecipes() {
           return [];
       }
   }
});

export const {setRecipes, resetRecipes} = recipesSlice.actions;
