import {Button, FormControl, IconButton, MenuItem, Select, TextField} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Add, Clear} from "@mui/icons-material";
import Api from "../../data/api";
import {addRecipe, removeRecipe} from "../../redux/slices/recipes";
import {useNavigate} from "react-router-dom";

export function RecipeForm(props) {
    const {recipe} = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector(state => state.categories);
    const [name, setName] = useState(recipe?.name || '');
    const [category, setCategory] = useState(recipe?.category || categories[0]._id);
    const [ingredients, setIngredients] = useState(recipe?.ingredients || []);
    const [duration, setDuration] = useState(recipe?.duration || 0);
    const [description, setDescription] = useState(recipe?.description || '');
    const [image, setImage] = useState(recipe?.image || '');
    const [error, setError] = useState(false);


    const handle = async() => {
        if(!name || !category || ingredients.length <= 0 || !duration || duration <= 0 || !description || !image) {
            setError(true);
            return;
        }
        for(const ingredient of ingredients) {
            if (!ingredient) {
                setError(true);
                return;
            }
        }
        const obj = {name, category, ingredients, duration, description, image};
        const response = (recipe) ? await Api.patch(`recipes/${recipe._id}`, obj) : await Api.post('recipes', obj);
        if(response.code !== 200) {
            setError(true);
            return;
        }
        if(recipe) {
            // The patch return only Ok or Not Ok so this trick is needed.
            const newRecipe = {...recipe, ...obj};
            dispatch(removeRecipe(recipe));
            dispatch(addRecipe(newRecipe));
        }
        else dispatch(addRecipe(response.data));
        navigate(`/recipe?id=${recipe?._id || response.data._id}`);
    }

    return(<div className={'container my-3'}>
        <div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
            <label className={'d-block mx-auto'}><b>{recipe ? 'EDIT RECIPE' : 'ADD RECIPE'}</b></label>
            <hr />
            {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
                <b>Invalid Data</b>
            </label>}
            <FormControl>
                <TextField required={true} className={'m-2'} type={'text'} onChange={e => setName(e.target.value)}
                           value={name} label='Name' size='small' />
                <Select className={'m-2'} value={category} onChange={e => setCategory(e.target.value)}
                        size='small'>
                    {categories.map(c => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </Select>
                <TextField required={true} className={'m-2'} type={'number'} onChange={e => setDuration(e.target.value)}
                           value={duration} label='Duration' size='small' />
                <TextField required={true} className={'m-2'} type={'text'} onChange={e => setDescription(e.target.value)}
                           value={description} label='Description' size='small' multiline={true} />
                <TextField required={true} className={'m-2'} type={'text'} onChange={e => setImage(e.target.value)}
                           value={image} label='Image' size='small' multiline={true} />
                <hr />
                <div className={'d-flex mb-2'}>
                    <b style={{fontSize: '0.95rem'}} className={'d-block my-auto'}>INGREDIENTS</b>
                    <IconButton color={'success'} className={'ms-auto'} onClick={e => setIngredients([...ingredients, ''])}>
                        <Add />
                    </IconButton>
                </div>
                {ingredients.map((ingredient, index) => <div className={'d-flex mx-auto'} key={index}>
                    <TextField label='Ingredient' size='small' required={true} className={'m-2'} type={'text'} value={ingredient} onChange={e => {
                        const _ingredients = [...ingredients];
                        _ingredients[index] = e.target.value;
                        setIngredients(_ingredients);
                    }} />
                    <IconButton className={'my-auto'} color={'error'} onClick={e => {
                        const _ingredients = ingredients.filter((v, i) => i !== index);
                        setIngredients(_ingredients);
                    }}>
                        <Clear />
                    </IconButton>
                </div>)}
                <Button variant={'contained'} className={'mt-3'} onClick={handle}>Send</Button>
            </FormControl>
        </div>
    </div>);
}
