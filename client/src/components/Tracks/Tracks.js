import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Track from './Track/Track';
import useStyles from './styles';

const Tracks = ({ setCurrentId }) => {
  const {tracks} = useSelector((state) => state.tracks);
  const classes = useStyles();

  return (
    !tracks?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {tracks.map((track) => (
          <Grid key={track.track_id} item xs={12} sm={6} md={6} lg={3}>
            <Track track={track}  setCurrentId={setCurrentId}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Tracks;
