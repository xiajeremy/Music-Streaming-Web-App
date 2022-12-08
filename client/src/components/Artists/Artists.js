import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Artist from './Artist/Artist';
import useStyles from './styles';

const Artists = () => {
  const {artists} = useSelector((state) => state.artists);
  const classes = useStyles();

  return (
    !artists?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {artists.map((artist) => (
          <Grid key={artist.artist_id} item xs={12} sm={6} md={6} lg={3}>
            <Artist artist={artist}  />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Artists;
