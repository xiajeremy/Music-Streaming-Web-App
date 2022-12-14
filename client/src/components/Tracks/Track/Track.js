import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updatePlaylist} from '../../../actions/playlists';

import useStyles from './styles';

const Track = ({ track, setCurrentId,}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const openTrack = () => window.open(`https://www.youtube.com/results?search_query=${track.track_title}`, '_blank')

  const handleClickOpen = () => {
    dispatch(updatePlaylist(history.location.pathname.slice(11) , {remove_track: track.track_id, name: user?.result?.name}));
    
  }

  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openTrack}>
        <div className={classes.media}>
        </div>
        <div className={classes.overlay}>
          <Typography variant="h6">Artist: {track.artist_name}</Typography>
          {/* <Typography variant="body2">{track.date_recorded.slice(0, 16).replace(/T/, " ")}</Typography> */}
        </div>
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(track.track_id);
              console.log(track.track_id)
            }}
            >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
        
  
        <div className={classes.details}>
          
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{track.track_title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">Album: {track.album_title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">Duration: {track.track_duration}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* {((user?.result?.sub === playlist?.creator || user?.result?._id === playlist?.creator)) && ( */}
        {(history.location.pathname.includes("/playlists/")) && (

          <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
              <DeleteIcon fontSize="small" />Remove
            </Button>
          </div>
          
        )}
      </CardActions>
    </Card>
  );
};

export default Track;
