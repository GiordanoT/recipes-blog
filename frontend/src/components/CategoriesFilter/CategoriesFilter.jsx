import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
import {useState} from 'react';
import {TextField} from '@mui/material';
import {useSelector} from 'react-redux';
import './style.css';

export function CategoriesFilter(props) {
    const {setCategory, setName} = props;
    const [show, setShow] = useState(true);
    const categories = useSelector(state => state.categories);

    return(<div className={'me-2'} style={{height: 'min-content'}}>
        <TextField onChange={e => setName(e.target.value)} label='Search' size='small' />
        <div className={'border mt-3'}>
            <div className={'d-flex bg-green px-5 py-2'}>
                <label className={'text-white'}><b>Categories</b></label>
                <div onClick={e => setShow(!show)} className={'cursor-pointer'}>
                    {(!show) ? <ArrowDropUp className={'text-white'} /> : <ArrowDropDown className={'text-white'} />}
                </div>
            </div>
            {show && <div className={'text-center p-2'}>
                {categories.map(category => <div onClick={e => setCategory(category._id)} key={category._id} className={'category cursor-pointer'}>
                    {category.name}
                </div>)}
            </div>}
        </div>
    </div>);
}
