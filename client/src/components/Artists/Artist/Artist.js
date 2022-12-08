import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const Artist = ({ artist }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));



  return (
    <Card className={classes.card}>
      <ButtonBase className={classes.cardAction}>
        <div className={classes.media}>
        </div>
        <div className={classes.overlay}>
          <Typography variant="h6">{artist.artist_name}</Typography>
          {/* <Typography variant="body2">{artist.date_recorded.slice(0, 16).replace(/T/, " ")}</Typography> */}
        </div>
  
        <div className={classes.details}>
          
        </div>
        <CardContent>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        {/* ADD TRACK TO PLAYLIST HERE 
        <Button size="small" color="primary" disabled = {!user?.result} onClick={() => dispatch(likeArtist(artist.artist_id))}>
          <ThumbUpAltIcon fontSize="small" /> Add Review
        </Button>
        */}
      </CardActions>
    </Card>
  );
};

export default Artist;
