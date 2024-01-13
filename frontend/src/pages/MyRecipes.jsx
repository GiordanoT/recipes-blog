import {useSelector} from 'react-redux';
import Error from './Error';
import {Navbar, Recipes} from '../components';
import {isEqual, pick} from 'lodash-es';

function MyRecipesPage() {
    /* Global State */
    const {auth, recipes} = useSelector(state =>
        pick(state, ['auth', 'recipes']), isEqual
    );

    if(!auth) return(<Error />);
    return(<section>
        <Navbar />
        <div className={'container mt-4'}>
            <Recipes recipes={recipes.filter(r => r.author === auth._id)} />
        </div>
    </section>);
}

export default MyRecipesPage;
