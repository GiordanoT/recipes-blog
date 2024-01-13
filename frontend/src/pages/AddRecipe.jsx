import {Navbar} from '../components';
import {useSelector} from 'react-redux';
import Error from './Error';
import {RecipeForm} from '../components';

function AddRecipePage() {
    /* Global State */
    const auth = useSelector(state => state.auth);

    if(!auth) return(<Error />);
    return(<section>
        <Navbar />
        <RecipeForm recipe={null} />
    </section>);
}

export default AddRecipePage;
