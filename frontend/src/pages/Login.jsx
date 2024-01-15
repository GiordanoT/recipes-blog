import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import Storage from '../data/storage';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../redux/slices/auth';
import {useNavigate} from 'react-router-dom';
import {resetFavorites, setFavorites} from '../redux/slices/favorites';
import {resetMenus, setMenus} from '../redux/slices/menus';
import {Banner, Navbar} from '../components';
import {AuthApi, FavoritesApi, MenusApi} from '../api';
import ErrorPage from './Error';

function LoginPage() {
    /* Global State */
    const dispatch = useDispatch();
    const auth = useSelector((state => state.auth));

    /* Local State */
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submit = async(e) => {
        e.preventDefault(); // Preventing page refresh.
        /* Handling the login request */
        const response = await AuthApi.login(email, password);
        if(response.code !== 200) {setError(true); return;}
        const auth = response.data;
        dispatch(login(auth));
        const responses = await Promise.all([
            FavoritesApi.getAll(),
            MenusApi.getAll()
        ]);
        const favorites = responses[0]; const menus = responses[1];
        if(favorites.code === 200 && menus.code === 200) {
            /* Favorites */
            dispatch(resetFavorites());
            dispatch(setFavorites(favorites.data));
            /* Menus */
            dispatch(resetMenus());
            dispatch(setMenus(menus.data));
        }
        /* Saving the session in the localstorage */
        Storage.write('auth', auth);
        /* Router */
        navigate('/home');
    }

    if(auth) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <Banner title={'login'} />
        <div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
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
        </div>
    </section>);
}

export default LoginPage;
