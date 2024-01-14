import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {MenuRounded} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import Api from '../../data/api';
import {logout} from '../../redux/slices/auth';
import Storage from '../../data/storage';

export function Navbar() {
    /* Global State */
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    /* Local State */
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null); // MUI Handler for menu (NAV)
    const [anchorElUser, setAnchorElUser] = useState(null); // MUI Handler for menu (USER)
    let pages; let settings;
    if(auth) {
        pages = ['home', 'add Recipe', 'my Recipes', 'my Menus', 'favorites'];
        settings = ['logout'];
    } else {
        pages = ['home'];
        settings = ['login', 'register'];
    }

    const handleOpenNavMenu = e => setAnchorElNav(e.currentTarget); // MUI Handler for menu (NAV)
    const handleOpenUserMenu = e => setAnchorElUser(e.currentTarget); // MUI Handler for menu (USER)
    const handleCloseNavMenu = () => setAnchorElNav(null); // MUI Handler for menu (NAV)
    const handleCloseUserMenu = () => setAnchorElUser(null); // MUI Handler for menu (USER)

    const desktopMenuRender = () => {
        return(pages.map(page =>
            <Button sx={{my: 2, color: 'black', display: 'block'}} key={page}
                    onClick={e => {
                        handleCloseNavMenu();
                        navigate('/' + page.replace(' ', ''));
                    }}
            >
                {page}
            </Button>
        ));
    }

    const mobileMenuRender = () => {
        return(pages.map(page => <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Typography onClick={e => navigate('/' + page.replace(' ', ''))}
                        textAlign='center'>
                {page[0].toUpperCase() + page.substring(1)}
            </Typography>
        </MenuItem>));
    }

    const settingsRender = () => {
        return(settings.map(setting =>
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign='center' onClick={async() => {
                    if(setting === 'logout') {
                        await Api.get('auth/logout');
                        dispatch(logout());
                        /* Removing the session in the localstorage */
                        Storage.reset();
                        navigate('/home');
                    } else navigate('/' + setting);
                }}>{setting[0].toUpperCase() + setting.substring(1)}</Typography>
            </MenuItem>)
        );
    }

    return (<AppBar sx={{background: 'whitesmoke'}} position='static'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters={true}>
                <Typography variant='h6' noWrap component='a'
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <img src={'images/logo.png'} alt={'Logo'} />
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton size='large' aria-controls='menu-appbar' aria-haspopup='true'
                                onClick={handleOpenNavMenu}>
                        <MenuRounded sx={{color: 'black'}} />
                    </IconButton>
                    <Menu id='menu-appbar' anchorEl={anchorElNav}
                          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} keepMounted={true}
                          transformOrigin={{vertical: 'top', horizontal: 'left'}} open={Boolean(anchorElNav)}
                          onClose={handleCloseNavMenu} sx={{display: {xs: 'block', md: 'none'}}}>
                        {mobileMenuRender()}
                    </Menu>
                </Box>
                <Typography variant='h5' noWrap={true} component='a'
                            sx={{mr: 2, display: {xs: 'flex', md: 'none'}, flexGrow: 1}}>
                    <img src={'images/logo.png'} alt={'Logo'} />
                </Typography>
                <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                    {desktopMenuRender()}
                </Box>

                <Box sx={{flexGrow: 0}}>
                    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                        <Avatar alt='Avatar' sx={{background: '#7FAD39'}} />
                    </IconButton>
                    <Menu sx={{mt: '45px'}} anchorEl={anchorElUser}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}} keepMounted={true}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}} open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>
                        {settingsRender()}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
}
