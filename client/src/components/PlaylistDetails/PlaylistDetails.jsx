import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import CommentSection from './CommentSection';
import {getPlaylist} from '../../actions/playlists'
import useStyles from './styles'

const PlaylistDetails = () => {
    const { playlist, playlists, isLoading } = useSelector((state) => state.playlists);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPlaylist(id));
    }, [id]);

    return(
        <div className={classes.card}>
            <div className={classes.section}>
            <Typography variant="h3" component="h2">{playlist.title}</Typography>
            <Typography gutterBottom variant="body1" component="p">{playlist.description}</Typography>
            <Typography variant="h6">Created by: {playlist.name}</Typography>
            <Typography variant="body1">{playlist.last_edit.slice(0, 16).replace(/T/, " ")}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection playlist={playlist} />
            <Divider style={{ margin: '20px 0' }} />
            </div>
        </div>
    )
}

export default PlaylistDetails;