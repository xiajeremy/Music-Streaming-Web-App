import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Track from './Track/Track';
import useStyles from './styles';

const Tracks = ({ setCurrentId }) => {
  const tracks = useSelector((state) => state.tracks);
  const classes = useStyles();
    
  return (
    <div>
        <Track currentTrack={setCurrentId} /> 
    </div>
  );
};

export default Tracks;