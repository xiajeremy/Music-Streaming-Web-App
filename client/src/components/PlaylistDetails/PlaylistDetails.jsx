import React, {useState, useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import CommentSection from './CommentSection';
import {getPlaylist} from '../../actions/playlists'
import { getMyTracks } from '../../actions/tracks';

import useStyles from './styles'

import Tracks from '../Tracks/Tracks'

const PlaylistDetails = () => {
    const { playlist, playlists, isLoading } = useSelector((state) => state.playlists);
    const [currentId, setCurrentId] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPlaylist(id));
        dispatch(getMyTracks(id));

    }, [id]);

    if(!playlist) return null;

    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    return(
        <div className={classes.card}>
            <div className={classes.section}>
            <Typography variant="h3" component="h2">{playlist.playlist_name}</Typography>
            <Typography gutterBottom variant="body1" component="p">{playlist.description}</Typography>
            <Typography variant="h6">Created by: {playlist.name}</Typography>
            <Typography variant="body1">{playlist.last_edit.slice(0, 16).replace(/T/, " ")}</Typography>
            <Typography variant="body1">Playtime: {playlist.playtime}</Typography>
            <Grid item xs={12} sm={6} md={9}>
                <Tracks setCurrentId={setCurrentId} />
            </Grid>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection playlist={playlist} />
            <Divider style={{ margin: '20px 0' }} />
            </div>
        </div>
    )
}

export default PlaylistDetails;