import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
   name: 'users',
   initialState: [],
   reducers: {
       setUsers(state, action) {
           return action.payload;
       },
       resetUsers() {
           return [];
       }
   }
});

export const {setUsers, resetUsers} = usersSlice.actions;
