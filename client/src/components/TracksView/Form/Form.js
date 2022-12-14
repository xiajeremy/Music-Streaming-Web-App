import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { updatePlaylist, getMyPlaylists } from '../../../actions/playlists';

const Form = ({ currentId, setCurrentId }) => {
  const [playlistData, setPlaylistData] = useState({ playlist_name: ''});
  const track = useSelector((state) => (currentId ? state.tracks.tracks.find((message) => message.track_id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const {playlists} = useSelector((state) => state.playlists);


  useEffect(() => {
    dispatch(getMyPlaylists(0, user?.result?._id));
  }, [currentId, dispatch]);

  const clear = () => {
    setCurrentId(null);
    // setPlaylistData({ playlist_name: '', description: '' });
  };

  const handleSubmit = async (e) => {
    if(playlistData.playlist_name){
      e.preventDefault();
      dispatch(updatePlaylist(playlistData.playlist_name , {add_track: currentId, name: user?.result?.name}));
    } else {
      console.log("no playlist name")
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
      {(currentId) && (
        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">Add {track.track_title} to a Playlist</Typography>
          {/* <TextField name="playlist_name" variant="outlined" label="Playlist Name" fullWidth value={playlistData.playlist_name} onChange={(e) => setPlaylistData({ ...playlistData, playlist_name: e.target.value })} />
          <TextField name="add_track" variant="outlined" label="Track" fullWidth value={playlistData.description} onChange={(e) => setPlaylistData({ ...playlistData, description: e.target.value })} /> */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Playlist</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={playlistData}
              label="Playlist"
              onChange={(e) => setPlaylistData({playlist_name: e.target.value})}
            >
              {playlists.map((playlist) =>
                <MenuItem value={playlist.playlist_name}>{playlist.playlist_name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
        </form>
      )}
    </Paper>
  );
};

export default Form;
