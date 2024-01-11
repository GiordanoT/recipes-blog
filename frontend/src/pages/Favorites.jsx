import {Navbar, Recipes} from "../components";
import {useSelector} from "react-redux";
import Error from "./Error";

function FavoritesPage() {
    const user = useSelector(state => state.auth);
    const favorites = useSelector(state => state.favorites);
    const recipes = useSelector(state => state.recipes);
    if(!user) return(<Error />);
    return(<section>
        <Navbar />
        <div className={'container mt-3'}>
            <Recipes recipes={recipes.filter(r => favorites.map(f => f.recipe).includes(r._id))} />
        </div>
    </section>)
}

export default FavoritesPage;
