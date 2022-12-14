import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { getMyPlaylists } from '../../actions/playlists';
import Pagination from '../Pagination/PaginationMyPlaylist';
import MyPlaylists from '../MyPlaylists/MyPlaylists';
import Form from '../Form/Form';

import useStyles from './styles';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Profile = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    let userID;
    if(user?.result?._id){
        userID = user?.result?._id;
    } else {
        userID = user?.result?.sub;
    }
    dispatch(getMyPlaylists(page, userID));
  }, [currentId, dispatch]);


  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <MyPlaylists setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page = {page}/>
              </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>  )
}

export default Profile