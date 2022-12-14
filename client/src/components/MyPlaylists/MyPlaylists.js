import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Playlist from './MyPlaylist/MyPlaylist';
import useStyles from './styles';

const MyPlaylists = ({ setCurrentId }) => {
  const {playlists} = useSelector((state) => state.playlists);
  const classes = useStyles();


  return (
    !playlists?.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {playlists.map((playlist) => (
          <Grid key={playlist.playlist_name} item xs={12} sm={6} md={6} lg={3}>
            <Playlist playlist={playlist} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default MyPlaylists;
