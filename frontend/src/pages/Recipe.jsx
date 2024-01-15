import useQuery from '../hooks/useQuery';
import {Banner, Navbar} from '../components';
import ErrorPage from './Error';
import {useDispatch, useSelector} from 'react-redux';
import {MenuItem, Select, IconButton} from '@mui/material';
import {Add, Favorite} from '@mui/icons-material';
import {useState} from 'react';
import {addFavorite, removeFavorite} from '../redux/slices/favorites';
import {addMenu, removeMenu} from '../redux/slices/menus';
import {isEqual, pick} from 'lodash-es';
import {FavoritesApi, MenusApi} from '../api';

function RecipePage() {
    /* Global State */
    const dispatch = useDispatch();
    const {auth, recipes, users, categories, menus, favorites} = useSelector(state =>
        pick(state, ['auth', 'recipes', 'users', 'categories', 'menus', 'favorites']), isEqual
    );
    /* Local State */
    const [menu, setMenu] = useState(menus[0]?._id); // Retrieving the first menu for the Select.
    const query = useQuery();
    const id = query.get('id');
    const recipe = recipes.filter(r => r._id === id)[0]; // Retrieving recipe.
    const isFavorite = favorites.map(f => f.recipe).includes(recipe?._id); // Checking if the recipe is in favorites.

    const handleFavorite = async() => {
        if(isFavorite) {
            const response = await FavoritesApi.remove(recipe);
            if(response.code !== 200) return;
            dispatch(removeFavorite(recipe));
        } else {
            const response = await FavoritesApi.add(recipe);
            if(response.code !== 200) return;
            dispatch(addFavorite({_id: Date.now(), user: auth._id, recipe: recipe._id}));
        }
    }

    const addToMenu = async() => {
        const newMenu = {...menus.filter(m => m._id === menu)[0]}; // Retrieving the menu by ID.
        if(newMenu?.recipes.includes(recipe._id)) {alert('The Recipe Is Already in The Menu'); return;}
        newMenu.recipes = [...newMenu.recipes, recipe._id]; // Adding the recipe to the menu.
        const response = await MenusApi.edit(newMenu._id, newMenu);
        if(response.code !== 200) return;
        /* Since the ID is the same as the oldMenu, the new one can be used for deletion purpose. */
        dispatch(removeMenu(newMenu));
        dispatch(addMenu(newMenu));
        alert('Recipe Added in The Menu');
    }

    if(!id || !recipe) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <Banner title={'recipe'} />
        <div className={'container mt-4'}>
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
                    {auth && <div className={'d-flex mt-3'}>
                        <Select className={'bg-white'} value={menu} onChange={e => setMenu(e.target.value)}
                                size='small'>
                            {menus.map(m => <MenuItem key={m._id} value={m._id}>{m.name}</MenuItem>)}
                        </Select>
                        <IconButton color={'success'} className={''} variant={'contained'} size={'small'}
                                    onClick={addToMenu}>
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
            <label className={'mb-3'}>{recipe.description}</label>
        </div>
    </section>)
}

export default RecipePage;
