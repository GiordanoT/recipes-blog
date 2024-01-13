import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import Api from '../data/api';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/auth';
import {useNavigate} from 'react-router-dom';
import {resetFavorites, setFavorites} from '../redux/slices/favorites';
import {resetMenus, setMenus} from '../redux/slices/menus';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submit = async(e) => {
        e.preventDefault();
        const response = await Api.post('auth/login', {email, password});
        if(response.code !== 200) {setError(true); return;}
        dispatch(login(response.data));
        /* Loading Favorites */
        const favorites = await Api.get('favorites');
        if(favorites.code === 200) {
            dispatch(resetFavorites());
            dispatch(setFavorites(favorites.data));
        }
        /* Loading Menus */
        const menus = await Api.get('menus');
        if(menus.code === 200) {
            dispatch(resetMenus());
            dispatch(setMenus(menus.data));
        }
        navigate('/home');
    }

    return(<div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
        <label className={'d-block mx-auto'}><b>LOGIN</b></label>
        <hr />
        {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
            <b>Invalid Data !!</b>
        </label>}
        <form onSubmit={submit}>
            <TextField required={true} className={'m-2 w-fill'} type={'email'} label='Email' size='small'
                       onChange={e => setEmail(e.target.value)} />
            <TextField required={true} className={'m-2 w-fill'} type={'password'} label='Password' size='small'
                       onChange={e => setPassword(e.target.value)} />
            <Button type={'submit'} variant={'contained'} className={'mt-1 d-block mx-auto w-fill'}>Login</Button>
        </form>
        <label style={{fontSize: '0.9rem'}} className={'mt-2 d-block mx-auto'}>
            Dont'have an account? <b className={'cursor-pointer'} onClick={e => navigate('/register')}>click here</b>
        </label>
    </div>);
}

export default LoginPage;
