import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';

const TrackList = ({tracks, setCurrentId}) => {
    axios.get('/tracks')
    .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
    })
    return (
        <li type="none">{tracks.track_name}</li>
    );
};



export default TrackList;
