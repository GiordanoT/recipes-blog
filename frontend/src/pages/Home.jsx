import {Navbar, CategoriesFilter, Recipes} from '../components';
import {useState} from 'react';
import {useSelector} from "react-redux";

function Home() {
    const recipes = useSelector(state => state.recipes);
    const _recipes = recipes.filter(recipe => recipe);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');

    return(<div>
        <Navbar />
        <section className={'mt-4 container d-flex'}>
            <CategoriesFilter setCategory={setCategory} setName={setName} />
            <div className={''}>
                <div className={'mt-3'}></div>
                <Recipes recipes={_recipes} />
            </div>
        </section>
    </div>)
}

export default Home;
