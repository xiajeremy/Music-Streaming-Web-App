import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist, getPlaylists } from '../../actions/playlists';


import useStyles from './styles'

const Paginate = ({page}) => {
    const { numberOfPages} = useSelector((state) => state.playlists)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(page) dispatch(getPlaylists(page));
    }, [page])

    return (
        <Pagination 
            classes={{ ul: classes.ul}} 
            count = {numberOfPages} 
            page={Number(page) || 1} 
            variant="outlined" 
            color="primary" 
            renderItem ={(item) => (
                <PaginationItem {...item} component={Link} to={`/playlists?page=${item.page}`} />
            )}
        />
    )
}
export default Paginate;