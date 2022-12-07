import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails'
import Tracks from './components/Tracks/Tracks'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component = {() => <Redirect to="/playlists" />} />
          <Route path="/playlists" exact component = {Home} />
          <Route path="/playlists/search/:searchQuery" exact component = {Home} />
          <Route path="/playlists/search" exact component = {Home} />
          <Route path="/playlists/:id" component = {PlaylistDetails} />
          <Route path="/auth" exact component = {() => (!user? <Auth /> : <Redirect to ='/playlists' /> )} />
          <Route path="/tracks" exact component = {Tracks} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
