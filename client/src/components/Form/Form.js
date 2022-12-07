import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPlaylist, updatePlaylist } from '../../actions/playlists';

const Form = ({ currentId, setCurrentId }) => {
  const [playlistData, setPlaylistData] = useState({ playlist_name: '', description: ''});
  const playlist = useSelector((state) => (currentId ? state.playlists.playlists.find((message) => message.playlist_name === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  

  useEffect(() => {
    if (playlist) {
      console.log(playlist)
      setPlaylistData(playlist)
    };
  }, [playlist]);

  const clear = () => {
    setCurrentId(0);
    setPlaylistData({ playlist_name: '', description: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPlaylist({... playlistData, name: user?.result?.name}));
      clear();
    } else {
      dispatch(updatePlaylist(currentId, {... playlistData, name: user?.result?.name}));
      clear();
    }
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align = 'center'>
          Sign in to create and review playlists.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${playlist.playlist_name}"` : 'Create a Playlist'}</Typography>
        <TextField name="playlist_name" variant="outlined" label="Playlist Name" fullWidth value={playlistData.playlist_name} onChange={(e) => setPlaylistData({ ...playlistData, playlist_name: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth value={playlistData.description} onChange={(e) => setPlaylistData({ ...playlistData, description: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
