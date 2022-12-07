import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTracks } from '../../actions/tracks';

const Tracks = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    
    const query = useQuery();
    const history = useHistory();
    const classes = useStyles();
    
    const [search, setSearch] = useState('');
  
    useEffect(() => {
      dispatch(getTracks());
    }, [currentId, dispatch]);



    return (
      <h1> </h1>
    )}

export default Track;