import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import './style.css';
import {useSelector} from "react-redux";

export function Recipe(props) {
    const {recipe} = props;
    const users = useSelector(state => state.users);

    return (<Card sx={{maxWidth: 275, margin: '10px'}}>
        <CardHeader sx={{'& .MuiCardHeader-content': {display: 'block', overflow: 'hidden'}}}
                    titleTypographyProps={{fontSize: '1.2rem', noWrap: true, textOverflow: 'ellipsis'}}
                    title={recipe.name}
                    subheaderTypographyProps={{fontSize: '0.9rem'}}
                    subheader={users.filter(u => u._id === recipe.author)[0]?.username}/>
        <CardMedia component='img' height='194' image={recipe.image} alt={recipe.name} />
        <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label='share'>
                <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>);
}
