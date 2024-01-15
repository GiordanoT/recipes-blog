import {Button, IconButton, MenuItem, Select, TextField} from '@mui/material';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Add, Clear} from '@mui/icons-material';
import {addRecipe, removeRecipe} from '../../redux/slices/recipes';
import {useNavigate} from 'react-router-dom';
import {RecipesApi} from '../../api';

export function RecipeForm(props) {
    /* Global State */
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    /* Local State */
    const navigate = useNavigate();
    const {recipe} = props; // If a recipe is received as prop it's an EDIT otherwise it's an ADD.
    const [name, setName] = useState(recipe?.name || '');
    const [category, setCategory] = useState(recipe?.category || categories[0]._id);
    const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
    const [duration, setDuration] = useState(recipe?.duration || '');
    const [description, setDescription] = useState(recipe?.description || '');
    const [image, setImage] = useState(recipe?.image || '');
    const [error, setError] = useState(false);

    const ingredientsRender = () => {
        return(ingredients.map((ingredient, index) => <div className={'d-flex mx-auto'} key={index}>
            <TextField required={true} className={'m-2 w-fill'} type={'text'} value={ingredient}
                       label='Ingredient' size='small'  onChange={e => {
                            const _ingredients = [...ingredients];
                            _ingredients[index] = e.target.value;
                            setIngredients(_ingredients);
                        }}
            />
            <IconButton className={'my-auto'} color={'error'} onClick={e => {
                const _ingredients = ingredients.filter((v, i) => i !== index);
                setIngredients(_ingredients);
            }}>
                <Clear />
            </IconButton>
        </div>));
    }

    const submit = async(e) => {
        e.preventDefault(); // Preventing page refresh.
        /* Checking if ingredients are present */
        if(ingredients.length <= 0) {
            setError(true);
            return;
        }
        const obj = {name, category, ingredients, duration, description, image};
        /* Handling Edit/Add based on the recipe prop */
        const response = (recipe) ? await RecipesApi.edit(recipe._id, obj) : await RecipesApi.create(obj);
        if(response.code !== 200) {
            setError(true);
            return;
        }
        if(recipe) {
            /* The patch return only Ok or Not Ok so this trick is needed */
            const newRecipe = {...recipe, ...obj};
            dispatch(removeRecipe(recipe));
            dispatch(addRecipe(newRecipe));
        }
        else dispatch(addRecipe(response.data));
        /* Two cases: Edit || Add */
        navigate(`/recipe?id=${recipe?._id || response.data._id}`);
    }

    return(<div className={'container my-3'}>
        <div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
            <label className={'d-block mx-auto'}><b>{recipe ? 'EDIT RECIPE' : 'ADD RECIPE'}</b></label>
            <hr />
            {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
                <b>Invalid Data</b>
            </label>}
            <form onSubmit={submit}>
                <TextField required={true} className={'m-2 w-fill'} type={'text'} value={name}
                           onChange={e => setName(e.target.value)} label='Name' size='small' />
                <Select className={'m-2 w-fill'} value={category} onChange={e => setCategory(e.target.value)}
                        size='small'>
                    {categories.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </Select>
                <TextField required={true} className={'m-2 w-fill'} type={'number'} value={duration}
                           onChange={e => setDuration(e.target.value)} label='Duration' size='small' />
                <TextField required={true} className={'m-2 w-fill'} type={'text'} value={description} multiline={true} rows={15}
                           onChange={e => setDescription(e.target.value)} label='Description' size='small' />
                <TextField required={true} className={'m-2 w-fill'} type={'text'} value={image} multiline={true} rows={4}
                           onChange={e => setImage(e.target.value)} label='Image' size='small' />
                <hr />
                <div className={'d-flex mb-2'}>
                    <b style={{fontSize: '0.95rem'}} className={'d-block my-auto'}>INGREDIENTS</b>
                    <IconButton color={'success'} className={'ms-auto'} onClick={e => setIngredients([...ingredients, ''])}>
                        <Add />
                    </IconButton>
                </div>
                {ingredientsRender()}
                <Button type={'submit'} variant={'contained'} className={'mt-3 d-block mx-auto w-fill'}>
                    Send
                </Button>
            </form>
        </div>
    </div>);
}
