import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist, getMyPlaylists } from '../../actions/playlists';


import useStyles from './styles'

const Paginate = ({page}) => {
    const { numberOfPages} = useSelector((state) => state.playlists)
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        console.log(user?.result?._id)
        if(page) dispatch(getMyPlaylists(page, user?.result?._id));
    }, [page])

    return (
        <Pagination 
            classes={{ ul: classes.ul}} 
            count = {numberOfPages} 
            page={Number(page) || 1} 
            variant="outlined" 
            color="primary" 
            renderItem ={(item) => (
                <PaginationItem {...item} component={Link} to={`/myPlaylists?page=${item.page}`} />
            )}
        />
    )
}
export default Paginate;