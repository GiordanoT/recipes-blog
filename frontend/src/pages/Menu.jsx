import {Navbar, Recipes} from "../components";
import {useDispatch, useSelector} from "react-redux";
import useQuery from "../hooks/useQuery";
import ErrorPage from "./Error";
import {TextField} from "@mui/material";
import Api from "../data/api";
import {addMenu, removeMenu} from "../redux/slices/menus";
import {useState} from "react";

function MenuPage() {
    const dispatch = useDispatch();
    const menus = useSelector(state => state.menus);
    const recipes = useSelector(state => state.recipes);
    const query = useQuery();
    const id = query.get('id');
    const menu = menus.filter(m => m._id === id)[0];
    const [name, setName] = useState(menu?.name);

    const editMenu = async(e) => {
        const newName = e.target.value;
        setName(newName);
        const newMenu = {...menu, name: newName};
        const response = await Api.patch(`menus/${menu._id}`, newMenu);
        if(response.code !== 200) return;
        dispatch(removeMenu(newMenu));
        dispatch(addMenu(newMenu));
    }

    if(!id) return(<ErrorPage />);
    if(!menu) return(<ErrorPage />);
    return(<section>
        <Navbar />
        <div className={'container mt-4'}>
            <div className={'d-flex'}>
                <TextField onChange={editMenu} className={'ms-auto bg-white'} value={name} size={'small'} label={`Menu's name`} />
            </div>
            <div className={'mt-3'}></div>
            <Recipes menu={menu._id} recipes={recipes.filter(r => menu.recipes.includes(r._id))} />
        </div>
    </section>)
}

export default MenuPage;
