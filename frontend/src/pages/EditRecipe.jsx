import {Navbar} from '../components';
import {useSelector} from 'react-redux';
import ErrorPage from './Error';
import {RecipeForm} from '../components';
import useQuery from '../hooks/useQuery';
import {pick, isEqual} from 'lodash-es';

function EditRecipePage() {
    const {auth, recipes} = useSelector(state =>
        pick(state, ['auth', 'recipes']), isEqual
    );
    const query = useQuery();
    const id = query.get('id');
    if(!auth || !id) return(<ErrorPage />);
    const recipe = recipes.filter(r => r._id === id)[0];
    if(!recipe) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <RecipeForm recipe={recipe} />
    </section>);
}

export default EditRecipePage;
