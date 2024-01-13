import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Api from './data/api';
import {useDispatch} from 'react-redux';
import {resetCategories, setCategories} from './redux/slices/categories';
import {resetRecipes, setRecipes} from './redux/slices/recipes';
import {resetUsers, setUsers} from './redux/slices/users';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MyRecipesPage from './pages/MyRecipes';
import FavoritesPage from './pages/Favorites';
import AddRecipePage from './pages/AddRecipe';
import EditRecipePage from './pages/EditRecipe';
import RecipePage from './pages/Recipe';
import {CircularProgress} from '@mui/material';
import MyMenusPage from './pages/MyMenus';
import MenuPage from './pages/Menu';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /* Use Effect Once */
  useEffect(() => {
    (async function() {
      /* Retrieving resources from the server */
      const responses = await Promise.all([
        Api.get('categories'),
        Api.get('recipes'),
        Api.get('users')
      ]);
      const categories = responses[0]; const recipes = responses[1]; const users = responses[2];
      if(categories.code !== 200 || recipes.code !== 200 || users.code !== 200) {
        setError(true);
        return;
      }
      /* Categories */
      dispatch(resetCategories());
      dispatch(setCategories(categories.data));
      /* Recipes */
      dispatch(resetRecipes());
      dispatch(setRecipes(recipes.data));
      /* Users */
      dispatch(resetUsers());
      dispatch(setUsers(users.data));
      /* Loading Done */
      setLoading(false);
    })()
  }, []);

  if(error) return(<div className={'d-block text-center m-3 p-2 bg-white border rounded'}>
    <b className={'text-danger'}>Error:</b> Cannot retrieve data from the server, retry refreshing the page...
  </div>);
  if(loading) return(<div className={'d-block text-center mt-3'}><CircularProgress /></div>);
  return(<BrowserRouter>
    <Routes>
      <Route path={''} element={<HomePage />} />
      <Route path={'home'} element={<HomePage />} />
      <Route path={'login'} element={<LoginPage />} />
      <Route path={'register'} element={<RegisterPage />} />
      <Route path={'myRecipes'} element={<MyRecipesPage />} />
      <Route path={'favorites'} element={<FavoritesPage />} />
      <Route path={'addRecipe'} element={<AddRecipePage />} />
      <Route path={'recipe'} element={<RecipePage />} />
      <Route path={'editRecipe'} element={<EditRecipePage />} />
      <Route path={'myMenus'} element={<MyMenusPage />} />
      <Route path={'menu'} element={<MenuPage />} />
      <Route path={'*'} element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>);
}

export default App;
