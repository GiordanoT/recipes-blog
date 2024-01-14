import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import Api from '../data/api';
import {useDispatch} from 'react-redux';
import {login} from '../redux/slices/auth';
import {useNavigate} from 'react-router-dom';
import Storage from '../data/storage';
import {Navbar} from '../components';

function RegisterPage() {
    /* Global State */
    const dispatch = useDispatch();

    /* Local State */
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const submit = async(e) => {
        e.preventDefault(); // Preventing page refresh.
        /* Handling the register request */
        const response = await Api.post('auth/register', {email, username, password});
        if(response.code === 200) {
            const auth = response.data;
            dispatch(login(auth));
            /* Saving the session in the localstorage */
            Storage.write('auth', auth);
            navigate('/home');
        } else setError(true);
    }

    return(<section>
        <Navbar />
        <div style={{width: '25em'}} className={'p-3 bg-white card mx-auto mt-5'}>
            <label className={'d-block mx-auto'}><b>REGISTER</b></label>
            <hr />
            {error && <label className={'text-danger d-block mx-auto'} style={{fontSize: '0.9rem'}}>
                <b>Invalid Data !!</b>
            </label>}
            <form onSubmit={submit}>
                <TextField required={true} className={'m-2 w-fill'} type={'text'} label='Username' size='small'
                           onChange={e => setUsername(e.target.value)} />
                <TextField required={true} className={'m-2 w-fill'} type={'email'} label='Email' size='small'
                           onChange={e => setEmail(e.target.value)} />
                <TextField required={true} className={'m-2 w-fill'} type={'password'} label='Password' size='small'
                           onChange={e => setPassword(e.target.value)} />
                <Button type={'submit'} variant={'contained'} className={'mt-1 d-block mx-auto w-fill'}>Register</Button>
            </form>
            <label style={{fontSize: '0.9rem'}} className={'mt-2 d-block mx-auto'}>
                Already have an account? <b className={'cursor-pointer'} onClick={e => navigate('/login')}>click here</b>
            </label>
        </div>
    </section>);
}

export default RegisterPage;
