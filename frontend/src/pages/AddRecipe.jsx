import {Navbar} from "../components";
import {Button, FormControl, TextField, Select, MenuItem, TextareaAutosize, IconButton} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Clear, Add} from "@mui/icons-material";
import Api from "../data/api";
import {addRecipe} from "../redux/slices/recipes";
import {useNavigate} from "react-router-dom";
import Error from "./Error";

function AddRecipe() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth);
    const categories = useSelector(state => state.categories);
    const [name, setName] = useState('');
    const [category, setCategory] = useState(categories[0]._id);
    const [ingredients, setIngredients] = useState([]);
    const [duration, setDuration] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(false)


    const handle = async() => {
        console.log({
            name, category, ingredients, duration, description, image
        })
        if(!name || !category || !ingredients || !duration || duration <= 0 || !description || !image) {
            setError(true);
            return;
        }
        for(const ingredient of ingredients)
            if(!ingredient) {
                setError(true);
                return;
            }
        const response = await Api.post('recipes', {
            name, category, ingredients, duration, description, image
        });
        if(response.code !== 200) {
            setError(true);
            return;
        }
        dispatch(addRecipe(response.data));
        navigate('/home');
    }

    if(!user) return(<Error />);
    return(<section>
        <Navbar />
        <div className={'container my-3'}>
            <div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
                <label className={'d-block mx-auto'}><b>ADD RECIPE</b></label>
                <hr />
                {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
                    <b>Invalid Data</b>
                </label>}
                <FormControl>
                    <TextField required={true} className={'m-2'} type={'text'} onChange={e => setName(e.target.value)}
                               label='Name' size='small' />
                    <Select className={'m-2'} value={category} onChange={e => setCategory(e.target.value)}
                            label='Category' size='small'>
                        {categories.map(c => <MenuItem value={c._id}>{c.name}</MenuItem>)}
                    </Select>
                    <TextField required={true} className={'m-2'} type={'number'} onChange={e => setDuration(e.target.value)}
                               label='Duration' size='small' />
                    <TextField required={true} className={'m-2'} type={'text'} onChange={e => setDescription(e.target.value)}
                               label='Description' size='small' multiline={true} />
                    <TextField required={true} className={'m-2'} type={'text'} onChange={e => setImage(e.target.value)}
                               label='Image' size='small' multiline={true} />
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
        </div>
    </section>);
}

export default AddRecipe;
