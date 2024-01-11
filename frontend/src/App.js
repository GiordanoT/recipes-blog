import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Api from './data/api';
import {useDispatch, useSelector} from 'react-redux';
import {resetCategories, setCategories} from "./redux/slices/categories";
import {resetRecipes, setRecipes} from "./redux/slices/recipes";
import {resetUsers, setUsers} from "./redux/slices/users";
import Error from './pages/Error';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyRecipes from "./pages/MyRecipes";
import Favorites from "./pages/Favorites";
import AddRecipe from "./pages/AddRecipe";
import {CircularProgress} from "@mui/material";

function App() {
  const user = useSelector(state => state.auth);
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
      <Route path={''} element={<Home />} />
      <Route path={'home'} element={<Home />} />
      <Route path={'login'} element={<Login />} />
      <Route path={'register'} element={<Register />} />
      <Route path={'myRecipes'} element={<MyRecipes />} />
      <Route path={'favorites'} element={<Favorites />} />
      <Route path={'addRecipe'} element={<AddRecipe />} />
      <Route path={'*'} element={<Error />} />
    </Routes>
  </BrowserRouter>);
}

export default App;
