import {createSlice} from '@reduxjs/toolkit';

export const menusSlice = createSlice({
   name: 'menus',
   initialState: [],
   reducers: {
       setMenus(state, action) {
           return action.payload;
       },
       resetMenus() {
           return [];
       },
       addMenu(state, action) {
           state.push(action.payload);
       },
       removeMenu(state, action) {
           return state.filter(m => m._id !== action.payload._id);
       }
   }
});

export const {setMenus, resetMenus, addMenu, removeMenu} = menusSlice.actions;
