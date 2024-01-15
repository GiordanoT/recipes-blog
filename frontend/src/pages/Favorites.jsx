import {Banner, Navbar, Recipes} from '../components';
import {useSelector} from 'react-redux';
import Error from './Error';
import {isEqual, pick} from 'lodash-es';

function FavoritesPage() {
    /* Global State */
    const {auth, favorites, recipes} = useSelector(state =>
        pick(state, ['auth', 'favorites', 'recipes']), isEqual
    );

    if(!auth) return(<Error />);
    return(<section>
        <Navbar />
        <Banner title={'favorites'} />
        <div className={'container mt-3'}>
            <Recipes recipes={recipes.filter(r => favorites.map(f => f.recipe).includes(r._id))} />
        </div>
    </section>)
}

export default FavoritesPage;
