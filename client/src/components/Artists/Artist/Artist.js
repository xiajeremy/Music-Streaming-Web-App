import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getArtists } from '../../../actions/artist';

const Artist = () => {
  const [currentArtist, setCurrentArtist] = useState([]);
  const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getArtists());
  }, [currentArtist, dispatch]);


  return (
    <p> ARTISTS </p>
  )}

export default Artist;

