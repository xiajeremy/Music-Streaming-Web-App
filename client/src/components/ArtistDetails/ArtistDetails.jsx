import React, {useEffect} from 'react'
import {Paper, Typography, CircularProgress, Divider} from '@material-ui/core'
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {getPlaylist} from '../../actions/playlists'
import useStyles from './styles'

const ArtistDetails = () => {
    const { playlist, playlists, isLoading } = useSelector((state) => state.playlists);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getPlaylist(id));
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
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong> Reviews </strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            </div>
        </div>
    )
}

export default ArtistDetails;