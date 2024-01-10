import {Button} from '@mui/material';
import {ArrowLeft, ArrowRight} from '@mui/icons-material';

export function Pager(props) {
    const {entriesForPage, page, setPage, entries} = props;
    const lastPage = Math.ceil(entries / entriesForPage) - 1;


    return(<div className={'w-100 d-flex p-1 rounded my-3'}>
        <Button disabled={page <= 0} variant={'contained'} className={'me-auto'}
                onClick={e => setPage(page - 1)}>
            <ArrowLeft />
        </Button>
        <Button disabled={page >= lastPage} variant={'contained'} className={'btn btn-light d-block ms-auto'}
                onClick={e => setPage(page + 1)}>
            <ArrowRight />
        </Button>
    </div>)
}
