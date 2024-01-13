import {Navbar} from '../components';
import {Button, Card, CardActions, CardContent, IconButton, Typography} from '@mui/material';
import {Info, Delete} from '@mui/icons-material';
import Api from '../data/api';
import {useDispatch, useSelector} from 'react-redux';
import ErrorPage from './Error';
import {addMenu, removeMenu} from '../redux/slices/menus';
import {useNavigate} from 'react-router-dom';
import {isEqual, pick} from 'lodash-es';

function MyMenusPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth, menus} = useSelector(state =>
        pick(state, ['auth', 'menus']), isEqual
    );

    const createMenu = async() => {
        const response = await Api.post('menus', {name: 'Untitled Menu'});
        if(response.code !== 200) return;
        dispatch(addMenu(response.data));
    }

    const deleteMenu = async(menu) => {
        const response = await Api.delete(`menus/${menu._id}`);
        if(response.code !== 200) return;
        dispatch(removeMenu(menu));
    }

    const menusRender = () => {
        return(menus.map(menu => <Card className={'m-2'} key={menu._id} sx={{maxWidth: 300}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
                    Menu ({menu.recipes.length} recipes)
                </Typography>
                <Typography variant='h5' component='div'>
                    {menu.name}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton color={'primary'} size='small' onClick={e => navigate(`/menu?id=${menu._id}`)}>
                    <Info />
                </IconButton>
                <IconButton color={'error'} size='small' onClick={async() => await deleteMenu(menu)}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>));
    }

    if(!auth) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <div className={'container mt-3'}>
            <div className={'d-flex'}>
                <Button variant={'contained'} className={'ms-auto'} onClick={createMenu}>Create Menu</Button>
            </div>
            <div className={'row'}>
                {menusRender()}
            </div>
        </div>
    </section>)
}

export default MyMenusPage;
