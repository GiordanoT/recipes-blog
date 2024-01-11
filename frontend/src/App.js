import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Api from './data/api';
import {useDispatch} from 'react-redux';
import {resetCategories, setCategories} from "./redux/slices/categories";
import {resetRecipes, setRecipes} from "./redux/slices/recipes";
import {resetUsers, setUsers} from "./redux/slices/users";
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MyRecipesPage from "./pages/MyRecipes";
import FavoritesPage from "./pages/Favorites";
import AddRecipePage from "./pages/AddRecipe";
import EditRecipePage from "./pages/EditRecipe";
import RecipePage from "./pages/Recipe";
import {CircularProgress} from "@mui/material";
import MyMenusPage from "./pages/MyMenus";
import MenuPage from "./pages/Menu";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function() {
      /* Categories */
      let response = await Api.get('categories');
      if(response.code !== 200) return;
      dispatch(resetCategories());
      dispatch(setCategories(response.data));
      /* Recipes */
      response = await Api.get('recipes');
      if(response.code !== 200) return;
      dispatch(resetRecipes());
      dispatch(setRecipes(response.data));
      /* Users */
      response = await Api.get('users');
      if(response.code !== 200) return;
      dispatch(resetUsers());
      dispatch(setUsers(response.data));
      /* Loading Done */
      setLoading(false);
    })()
  }, []);

  if(loading) return(<div className={'d-block text-center mt-3'}><CircularProgress /></div>)
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
