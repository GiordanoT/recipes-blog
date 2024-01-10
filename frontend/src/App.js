import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import {useEffect, useState} from 'react';
import Api from './data/api';
import {useDispatch} from 'react-redux';
import Login from "./pages/Login";
import Register from "./pages/Register";
import {setCategories, resetCategories} from "./redux/slices/categories";
import {setRecipes, resetRecipes} from "./redux/slices/recipes";

function App() {
  const dispatch = useDispatch();

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
    })()
  }, []);

  return(<BrowserRouter>
    <Routes>
      <Route path={''} element={<Home />} />
      <Route path={'home'} element={<Home />} />
      <Route path={'login'} element={<Login />} />
      <Route path={'register'} element={<Register />} />
      <Route path={'*'} element={<div>404 Not Found!</div>} />
    </Routes>
  </BrowserRouter>);
}

export default App;
