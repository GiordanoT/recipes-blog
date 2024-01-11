import {TextField, Button, FormControl} from '@mui/material';
import {useState} from 'react';
import Api from '../data/api';
import {useDispatch} from "react-redux";
import {login} from '../redux/slices/auth';
import {useNavigate} from "react-router-dom";
import {resetFavorites, setFavorites} from "../redux/slices/favorites";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handle = async() => {
        const response = await Api.post('auth/register', {email, username, password});
        if(response.code === 200) {
            dispatch(login(response.data));
            /* Loading Favorites */
            const favorites = await Api.get('favorites');
            if(favorites.code === 200) {
                dispatch(resetFavorites());
                dispatch(setFavorites(favorites.data));
            }
            navigate('/home');
        } else setError(true);
    }

    return(<div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
        <label className={'d-block mx-auto'}><b>REGISTER</b></label>
        <hr />
        {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
            <b>Invalid Data</b>
        </label>}
        <FormControl>
            <TextField required={true} className={'m-2'} type={'text'} onChange={e => setUsername(e.target.value)} label='Username' size='small' />
            <TextField required={true} className={'m-2'} type={'email'} onChange={e => setEmail(e.target.value)} label='Email' size='small' />
            <TextField required={true} className={'m-2'} type={'password'} onChange={e => setPassword(e.target.value)} label='Password' size='small' />
            <Button variant={'contained'} className={'mt-1'} onClick={handle}>Register</Button>
        </FormControl>
        <label style={{fontSize: '0.9rem'}} className={'mt-2 d-block mx-auto'}>
            Already have an account? <b className={'cursor-pointer'} onClick={e => navigate('/login')}>click here</b>
        </label>
    </div>);
}

export default Register
