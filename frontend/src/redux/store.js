import {configureStore} from '@reduxjs/toolkit';
import {authSlice} from './slices/auth';
import {categoriesSlice} from './slices/categories';
import {recipesSlice} from './slices/recipes';
import {usersSlice} from './slices/users';
import {favoritesSlice} from './slices/favorites';
import {menusSlice} from './slices/menus';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        categories: categoriesSlice.reducer,
        recipes: recipesSlice.reducer,
        users: usersSlice.reducer,
        favorites: favoritesSlice.reducer,
        menus: menusSlice.reducer
    }
});
