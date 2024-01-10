import {Recipe} from '../Recipe/Recipe';
import {useState} from "react";
import {Pager} from "../Pager/Pager";

export function Recipes(props) {
    const {recipes} = props;
    const [page, setPage] = useState(0);
    const entriesForPage = 8;
    return(<div className={'d-block'}>
        <div className={'row'}>
            {recipes.slice(page * entriesForPage, page * entriesForPage + entriesForPage).map(recipe =>
                <Recipe key={recipe._id} recipe={recipe} />
            )}
        </div>
        <Pager entriesForPage={entriesForPage} page={page} setPage={setPage} entries={recipes.length} />
    </div>)
}
