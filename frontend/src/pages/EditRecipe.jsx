import {Navbar} from "../components";
import {useSelector} from "react-redux";
import ErrorPage from "./Error";
import {RecipeForm} from "../components";
import useQuery from "../hooks/useQuery";

function EditRecipePage() {
    const user = useSelector(state => state.auth);
    const recipes = useSelector(state => state.recipes);
    const query = useQuery();
    const id = query.get('id');
    if(!user || !id) return(<ErrorPage />);
    const recipe = recipes.filter(r => r._id === id)[0];
    if(!recipe) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <RecipeForm recipe={recipe} />
    </section>);
}

export default EditRecipePage;
