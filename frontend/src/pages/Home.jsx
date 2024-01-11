import {Navbar, CategoriesFilter, Recipes} from '../components';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

function Home() {
    const recipes = useSelector(state => state.recipes);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        let _recipes = [...recipes];
        if(name) _recipes = _recipes.filter(r => r.name.includes(name));
        if(category) _recipes = _recipes.filter(r => r.category === category);
        setFilteredRecipes(_recipes);
    }, [name, category]);

    return(<section>
        <Navbar />
        <div className={'mt-4 container d-flex'}>
            <CategoriesFilter category={category} setCategory={setCategory} name={name} setName={setName} />
            <div className={'mt-3'}>
                <Recipes recipes={filteredRecipes} />
            </div>
        </div>
    </section>)
}

export default Home;
