import {RecipeForm, Banner, Navbar} from '../components';
import {useSelector} from 'react-redux';
import Error from './Error';

function AddRecipePage() {
    /* Global State */
    const auth = useSelector(state => state.auth);

    if(!auth) return(<Error />);
    return(<section>
        <Navbar />
        <Banner title={'add recipe'} />
        <RecipeForm recipe={null} />
    </section>);
}

export default AddRecipePage;
