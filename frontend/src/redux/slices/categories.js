import {createSlice} from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState: [],
   reducers: {
       setCategories(state, action) {
           state.push(...action.payload);
       },
       resetCategories() {
           return [];
       }
   }
});

export const {setCategories, resetCategories} = categoriesSlice.actions;
