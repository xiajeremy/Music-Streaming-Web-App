import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getArtists } from '../../actions/artist';

const Artists = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    
    const query = useQuery();
    const history = useHistory();
    const classes = useStyles();

    const [search, setSearch] = useState('');
  
    useEffect(() => {
      dispatch(getArtists());
    }, [currentId, dispatch]);


    


    return (
      <h1> </h1>
    )}

export default Artists;