import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Track from './Track/Track';
import useStyles from './styles';

const Artists = ({ setCurrentId }) => {
  const tracks = useSelector((state) => state.tracks);
  const classes = useStyles();
    
  return (
    <div>
    
    </div>
  );
};

export default Artists;