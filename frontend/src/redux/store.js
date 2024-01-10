import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './slices/user';
import {categoriesSlice} from './slices/categories';
import {recipesSlice} from './slices/recipes';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        categories: categoriesSlice.reducer,
        recipes: recipesSlice.reducer
    }
});
