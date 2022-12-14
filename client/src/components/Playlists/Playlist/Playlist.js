import React , {useState} from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { likePlaylist, deletePlaylist } from '../../../actions/playlists';
import useStyles from './styles';

const Playlist = ({ playlist, setCurrentId }) => {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const openPlaylist = () => history.push(`/playlists/${playlist.playlist_name}`)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePlaylist(playlist.playlist_name));
    setOpen(false);
  };
  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openPlaylist}>
        <div className={classes.media}>
        </div>
        <div className={classes.overlay}>
          <Typography variant="h6">{playlist.name}</Typography>
          <Typography variant="body2">{playlist.last_edit.slice(0, 16).replace(/T/, " ")}</Typography>
        </div>
        {(user?.result?.sub === playlist?.creator || user?.result?._id === playlist?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(playlist.playlist_name);
            }}
            >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        )}
        <div className={classes.details}>
          
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{playlist.playlist_name}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Description: {playlist.description}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Number of Tracks: {playlist.tracks_amount}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Playtime: {playlist.playtime}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled = {!user?.result} onClick={() => dispatch(likePlaylist(playlist.playlist_name))}>
          <ThumbUpAltIcon fontSize="small" /> Add Review
        </Button>
        {(user?.result?.sub === playlist?.creator || user?.result?._id === playlist?.creator) && (
          <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
              <DeleteIcon fontSize="small" /> Delete
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this playlist?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action is irreversable.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          
        )}
        
      </CardActions>
    </Card>
  );
};

export default Playlist;
