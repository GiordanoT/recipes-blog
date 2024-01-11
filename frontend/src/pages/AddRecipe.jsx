import {Navbar} from "../components";
import {useSelector} from "react-redux";
import Error from "./Error";
import {RecipeForm} from "../components";

function AddRecipePage() {
    const user = useSelector(state => state.auth);

    if(!user) return(<Error />);
    return(<section>
        <Navbar />
        <RecipeForm recipe={null} />
    </section>);
}

export default AddRecipePage;
