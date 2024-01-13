import {ArrowDropDown, ArrowDropUp, Clear} from '@mui/icons-material';
import {useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {useSelector} from 'react-redux';
import './style.css';

export function CategoriesFilter(props) {
    const {category, setCategory, name, setName} = props;
    const [show, setShow] = useState(true);
    const categories = useSelector(state => state.categories);

    const categoriesRender = () => {
        return(categories.map(category =>
            <div onClick={e => setCategory(category._id)} key={category._id} className={'category cursor-pointer'}>
                {category.name}
            </div>)
        );
    }

    return(<div className={'me-4'} style={{height: 'min-content'}}>
        <TextField sx={{background: 'white'}} onChange={e => setName(e.target.value)} label='Search' size='small' />
        <div className={'border mt-3'}>
            <div className={'d-flex bg-green px-5 py-2'}>
                <label className={'text-white'}><b>Categories</b></label>
                <div onClick={e => setShow(!show)} className={'cursor-pointer'}>
                    {(!show) ? <ArrowDropUp className={'text-white'} /> : <ArrowDropDown className={'text-white'} />}
                </div>
            </div>
            {show && <div className={'bg-white text-center p-2'}>
                {categoriesRender()}
            </div>}
        </div>
        {(name || category) && <div style={{fontSize: '0.75rem'}} className={'mt-3 border bg-white text-center p-2'}>
            {name && <div style={{justifyContent: 'center'}} className={'d-flex'}>
                <div className={'d-block my-auto'}>
                    Name contains <b>{name}</b>
                </div>
                <IconButton color='error'>
                    <Clear onClick={e => setName('')} />
                </IconButton>
            </div>}
            {category && <div style={{justifyContent: 'center'}} className={'d-flex'}>
                <div className={'d-block my-auto'}>
                    Category is <b>{categories.filter(c => c._id === category)[0]?.name}</b>
                </div>
                <IconButton color='error'>
                    <Clear onClick={e => setCategory('')} />
                </IconButton>
            </div>}
        </div>}
    </div>);
}
