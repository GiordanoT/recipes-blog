import {useSelector} from 'react-redux';
import Error from './Error';
import {Navbar, Recipes} from '../components';

function MyRecipes() {
    const user = useSelector(state => state.auth);
    const recipes = useSelector(state => state.recipes);
    if(!user) return(<Error />);
    return(<section>
        <Navbar />
        <div className={'container mt-4'}>
            <Recipes recipes={recipes.filter(r => r.author === user._id)} />
        </div>
    </section>);
}

export default MyRecipes;
