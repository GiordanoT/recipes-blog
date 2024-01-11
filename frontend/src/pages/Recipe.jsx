import useQuery from "../hooks/useQuery";
import {Navbar} from "../components";
import ErrorPage from "./Error";
import {useDispatch, useSelector} from "react-redux";
import {MenuItem, Select, IconButton} from "@mui/material";
import {Add, Favorite} from "@mui/icons-material";
import {useState} from "react";
import Api from "../data/api";
import {addFavorite, removeFavorite} from "../redux/slices/favorites";
import {addMenu, removeMenu} from "../redux/slices/menus";

function RecipePage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const recipes = useSelector(state => state.recipes);
    const users = useSelector(state => state.users);
    const categories = useSelector(state => state.categories);
    const menus = useSelector(state => state.menus);
    const favorites = useSelector(state => state.favorites);
    const [menu, setMenu] = useState(menus[0]?._id);
    const query = useQuery();
    const id = query.get('id');
    if(!id) return(<ErrorPage />);
    const recipe = recipes.filter(r => r._id === id)[0];
    const isFavorite = favorites.map(f => f.recipe).includes(recipe._id);

    const handleFavorite = async() => {
        if(isFavorite) {
            const response = await Api.delete(`favorites/${recipe._id}`);
            if(response.code !== 200) return;
            dispatch(removeFavorite(recipe));
        } else {
            const response = await Api.get(`favorites/${recipe._id}`);
            if(response.code !== 200) return;
            dispatch(addFavorite({_id: new Date(), user: user._id, recipe: recipe._id}));
        }
    }

    const handleMenu = async() => {
        const newMenu = {...menus.filter(m => m._id === menu)[0]};
        if(newMenu?.recipes.includes(recipe._id)) {alert('The Recipe Is Already in The Menu'); return;}
        newMenu.recipes = [...newMenu.recipes, recipe._id];
        const response = await Api.patch(`menus/${newMenu._id}`, newMenu);
        if(response.code !== 200) return;
        // Since the ID is the same as the oldMenu I can use the new one for deletion purpose.
        dispatch(removeMenu(newMenu));
        dispatch(addMenu(newMenu));
        alert('Recipe Added in The Menu');
    }


    if(!recipe) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <div className={'container mt-3'}>
            <div className={'row'}>
                <img className={'col-6'} src={recipe.image} alt={recipe.name} />
                <div className={'col-6'}>
                    <h3>{recipe.name}</h3>
                    <hr />
                    <label>Author: <b>{users.filter(u => u._id === recipe.author)[0]?.username}</b></label> <br />
                    <label>Category: <b>{categories.filter(c => c._id === recipe.category)[0]?.name}</b></label> <br />
                    <label>Duration: <b>{recipe.duration}</b> minutes</label> <br />
                    <div>Ingredients: <br />{recipe.ingredients.map((ingredient, index) => <label className={'ms-2'} key={index}>
                        •<b>{ingredient}</b>
                    </label>)}</div>
                    {user && <div className={'d-flex mt-2'}>
                        <Select className={'m-2'} value={menu} onChange={e => setMenu(e.target.value)}
                                size='small'>
                            {menus.map(m => <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>)}
                        </Select>
                        <IconButton color={'success'} className={''} variant={'contained'} size={'small'}
                                    onClick={handleMenu}>
                            <Add />
                        </IconButton>
                        <IconButton color={isFavorite ? 'error' : 'primary'} className={''}
                                    variant={'contained'} size={'small'} onClick={handleFavorite}>
                            <Favorite />
                        </IconButton>
                    </div>}
                </div>
            </div>
            <h4 className={'mt-3'}>Procedure</h4>
            <label>{recipe.description}</label>
        </div>
    </section>)
}

export default RecipePage;
