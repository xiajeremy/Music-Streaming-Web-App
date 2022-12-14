import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Track = ({ track, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));

  const openTrack = () => window.open(`https://www.youtube.com/results?search_query=${track.track_title}`, '_blank')

  

  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction} onClick={openTrack}>
        <div className={classes.media}>
        </div>
        <div className={classes.overlay}>
          <Typography variant="h6">{track.artist_name}</Typography>
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
          <Typography variant="body2" color="textSecondary" component="p">{track.album_title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{track.duration}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* ADD TRACK TO PLAYLIST HERE 
        <Button size="small" color="primary" disabled = {!user?.result} onClick={() => dispatch(likeTrack(track.track_id))}>
          <ThumbUpAltIcon fontSize="small" /> Add Review
        </Button>
        */}
      </CardActions>
    </Card>
  );
};

export default Track;
