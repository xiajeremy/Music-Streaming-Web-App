import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTracks } from '../../../actions/tracks';

const Track = () => {
    const [currentTrack, setCurrentTrack] = useState([]);
    const dispatch = useDispatch();
      
    useEffect(() => {
      dispatch(getTracks());
    }, [currentTrack, dispatch]);


    return (
      <div>
        {currentTrack.length > 0 && (
          <ul>
            {currentTrack.map(data => (
              <li key={data.id}> {data.track_title} </li>
            ))}
          </ul>
        )}
      </div>
    )}

export default Track;