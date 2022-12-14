import React from 'react';
import { Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import PlaylistDetails from './components/PlaylistDetails/PlaylistDetails'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import privacyPolicy from './components/PrivacyPolicy/privacyPolicy'; 
// import TracksView from './components/TracksView/TracksView';
// import ArtistsView from './components/ArtistsView/ArtistsView';
// import ArtistDetails from './components/ArtistsDetails/ArtistsDetails';
// import TrackDetails from './components/TracksDetails/TracksDetails';
import TracksView from './components/TracksView/TracksView';
import ArtistsView from './components/ArtistsView/ArtistsView';
import Profile from './components/Profile/Profile';



const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component = {() => <Redirect to="/auth" />} />
          <Route path="/playlists" exact component = {Home} />
          <Route path="/playlists/search/:searchQuery" exact component = {Home} />
          <Route path="/playlists/search" exact component = {Home} />
          <Route path="/playlists/:id" component = {PlaylistDetails} />
          <Route path="/auth" exact component = {() => (!user? <Auth /> : <Redirect to ='/playlists' /> )} />
          {/* <Route path="/privacy-policy" exact component ={privacyPolicy} /> */}


          <Route path="/tracks" exact component = {TracksView} />
          <Route path="/tracks/search/:searchQuery" exact component = {TracksView} />
          <Route path="/tracks/search" exact component = {TracksView} />

          <Route path="/artists" exact component = {ArtistsView} />
          <Route path="/artists/search/:searchQuery" exact component = {ArtistsView} />
          <Route path="/artists/search" exact component = {ArtistsView} />

          <Route path="/myPlaylists" exact component = {Profile} />

        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
