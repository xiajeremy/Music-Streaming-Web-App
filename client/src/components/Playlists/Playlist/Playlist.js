import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';

import { likePlaylist, deletePlaylist } from '../../../actions/playlists';
import useStyles from './styles';

const Playlist = ({ playlist, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} title = {playlist.playlist_name} />
      <div className={classes.overlay}>
        <Typography variant="h6">{playlist.name}</Typography>
        <Typography variant="body2">{playlist.last_edit}</Typography>
      </div>
      {(user?.result?.sub === playlist?.creator || user?.result?._id === playlist?.creator) && (
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(playlist.playlist_name)}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{playlist.playlist_name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{playlist.description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled = {!user?.result} onClick={() => dispatch(likePlaylist(playlist.playlist_name))}>
          <ThumbUpAltIcon fontSize="small" /> Add Review
        </Button>
        {(user?.result?.sub === playlist?.creator || user?.result?._id === playlist?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePlaylist(playlist.playlist_name))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Playlist;
