import {useState} from 'react';
import {Info, Favorite, Close} from '@mui/icons-material';
import './style.css';

export function Recipe(props) {
    const [show, setShow] = useState(false);
    const {recipe} = props;

    return(<div onMouseEnter={e => setShow(true)} onMouseLeave={e => setShow(false)} className={'w-auto d-block col-xl-3 col-lg-4 col-md-5 col-sm-6 col-xs-6 m-1'}>
        {show && <div className={'icons p-1 mx-5 mt-2 d-flex rounded'}>
            <div className={'icon rounded'}><Info /></div>
            <div className={'ms-1 icon rounded'}><Favorite /></div>
            <div className={'ms-1 icon rounded'}><Close /></div>
        </div>}
        <img className={'d-block mx-auto'} alt={'Image'} height={300} width={200} src={recipe.image} />
        <label style={{fontSize: '1.2rem'}} className={'d-block text-center'}><b>{recipe.name}</b></label>
    </div>)
}
