import {TextField, Button} from '@mui/material';
import {useState} from 'react';
import Api from '../data/api';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/user';
import {useNavigate} from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handle = async() => {
        const response = await Api.post('auth/login', {email, password});
        if(response.code === 200) {
            const user = response.data;
            dispatch(login({id: user._id, username: user.username, password: user.password}));
            navigate('/home');
        } else setError(true);
    }

    return(<div className={'p-3'}>
        <div onClick={e => navigate('/register')}>Go to Register</div>
        {error && <div>Invalid Data</div>}
        <TextField type={'email'} onChange={e => setEmail(e.target.value)} label='Email' size='small' />
        <TextField type={'password'} onChange={e => setPassword(e.target.value)} label='Password' size='small' />
        <Button variant={'contained'} onClick={handle}>Login</Button>
    </div>)
}

export default Login;
