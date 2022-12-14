import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getTracks, getTracksBySearch } from '../../actions/tracks';
import Pagination from '../Pagination/PaginationTrack';
import Tracks from '../Tracks/Tracks';
import Form from './Form/Form';

import useStyles from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const TracksView = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));


  useEffect(() => {
    dispatch(getTracks());
  }, [currentId, dispatch]);


  const searchTrack = () => {
    if (search.trim()) {
      dispatch(getTracksBySearch(search))

      history.push(`/tracks/search/${search || 'none'}`)
    } else {
      history.push('/')
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchTrack();
    }
  }

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Tracks setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search Tracks' fullWidth value={search} onKeyDown={handleKeyPress} onChange={(e) => {setSearch(e.target.value)}}/>
              <Button onClick={searchTrack} className={classes.searchButton} variant = "contained" color='primary'>
                Search
              </Button>
            </AppBar>
            {(user?.result?.name) && (
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            )}
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page = {page}/>
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>  )
}

export default TracksView