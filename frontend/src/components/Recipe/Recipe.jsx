import {Card, CardHeader, CardMedia, CardActions, IconButton} from '@mui/material';
import {Edit, Delete, Favorite, Clear, Info} from '@mui/icons-material';
import './style.css';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Api from '../../data/api';
import {addFavorite, removeFavorite} from '../../redux/slices/favorites';
import {removeRecipe} from '../../redux/slices/recipes';
import {addMenu, removeMenu} from '../../redux/slices/menus';
import {isEqual, pick} from 'lodash-es';

export function Recipe(props) {
    /* The menu prop is passed only from the menu page to handle menus */
    const {recipe, path, menu} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth, users, menus, favorites} = useSelector(state =>
        pick(state, ['auth', 'users', 'menus', 'favorites']), isEqual
    );
    const isFavorite = favorites.map(f => f.recipe).includes(recipe._id);

    const info = () => {
        navigate(`/recipe?id=${recipe._id}`)
    }
    const handleFavorite = async() => {
        if(isFavorite) {
            await removeFromFavorite();
        } else {
            const response = await Api.get(`favorites/${recipe._id}`);
            if(response.code !== 200) return;
            dispatch(addFavorite({_id: new Date(), user: auth._id, recipe: recipe._id}));
        }
    }
    const removeFromFavorite = async () => {
        const response = await Api.delete(`favorites/${recipe._id}`);
        if(response.code !== 200) return;
        dispatch(removeFavorite(recipe));
    }
    const editRecipe = () => {
        navigate(`/editRecipe?id=${recipe._id}`)
    }
    const deleteRecipe = async () => {
        const response = await Api.delete(`recipes/${recipe._id}`);
        if(response.code !== 200) return;
        dispatch(removeRecipe(recipe));
    }
    const removeFromMenu = async () => {
        const newMenu = {...menus.filter(m => m._id === menu)[0]};
        newMenu.recipes = newMenu.recipes.filter(r => r !== recipe._id)
        const response = await Api.patch(`menus/${newMenu._id}`, newMenu);
        if(response.code !== 200) return;
        // Since the ID is the same as the oldMenu I can use the new one for deletion purpose.
        dispatch(removeMenu(newMenu));
        dispatch(addMenu(newMenu));
    }

    return (<Card sx={{maxWidth: 275, margin: '10px'}}>
        <CardHeader sx={{'& .MuiCardHeader-content': {display: 'block', overflow: 'hidden'}}}
                    titleTypographyProps={{fontSize: '1.2rem', noWrap: true, textOverflow: 'ellipsis'}}
                    title={recipe.name}
                    subheaderTypographyProps={{fontSize: '0.9rem'}}
                    subheader={users.filter(u => u._id === recipe.author)[0]?.username}/>
        <CardMedia component='img' height='194' image={recipe.image} alt={recipe.name} />
        <CardActions disableSpacing>
            <IconButton color={'primary'} onClick={info}>
                <Info />
            </IconButton>
            {auth && <section>
                {(path === '/home') && <IconButton color={isFavorite ? 'error' : 'primary'} onClick={handleFavorite}>
                    <Favorite />
                </IconButton>}
                {(path === '/favorites') && <IconButton color='error' onClick={removeFromFavorite}>
                    <Clear />
                </IconButton>}
                {(path === '/myRecipes') && <IconButton color='primary' onClick={editRecipe}>
                    <Edit />
                </IconButton>}
                {(path === '/myRecipes') && <IconButton color='error' onClick={deleteRecipe}>
                    <Delete />
                </IconButton>}
                {(menu && path === '/menu') && <IconButton color='error' onClick={removeFromMenu}>
                    <Clear />
                </IconButton>}
            </section>}
        </CardActions>
    </Card>);
}
