import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getPlaylists, getPlaylistsBySearch } from '../../actions/playlists';
import Pagination from '../Pagination';
import Playlists from '../Playlists/Playlists';
import Form from '../Form/Form';

import useStyles from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const TracksView = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const classes = useStyles();
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getPlaylists());
  }, [currentId, dispatch]);


  const searchPlaylist = () => {
    if (search.trim()) {
      dispatch(getPlaylistsBySearch(search))

      history.push(`/playlists/search/${search || 'none'}`)
    } else {
      history.push('/')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPlaylist();
    }
  }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Playlists setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search Playlists' fullWidth value={search} onKeyDown={handleKeyPress} onChange={(e) => {setSearch(e.target.value)}}/>
              <Button onClick={searchPlaylist} className={classes.searchButton} variant = "contained" color='primary'>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page = {page}/>
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>  )
}

export default TracksView