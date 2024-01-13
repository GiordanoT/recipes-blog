import {Recipe} from '../Recipe/Recipe';
import {useState} from 'react';
import Pagination from '@mui/material/Pagination';
import {useLocation} from 'react-router-dom';

export function Recipes(props) {
    const {recipes, menu} = props;
    const location = useLocation();
    const [page, setPage] = useState(1);
    const entriesForPage = 9;

    const recipesRender = () => {
        /* Retrieving recipes for specific page and Render */
        return(recipes
            .slice((page - 1) * entriesForPage, (page - 1) * entriesForPage + entriesForPage)
            .map(recipe => <Recipe key={recipe._id} recipe={recipe} path={location.pathname} menu={menu} />)
        );
    }

    if(recipes.length <= 0)
        return(<div className={'bg-white p-3 rounded'}>There are <b>NO</b> recipes here.</div>);

    return(<div className={'d-block'}>
        <div className={'row'}>
            {recipesRender()}
        </div>
        <Pagination
            count={Math.ceil(recipes.length / entriesForPage)} sx={{marginY: '30px'}}
            onChange={(e, v) => setPage(v)} color='primary' page={page}
        />
    </div>)
}
