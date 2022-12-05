import { combineReducers } from 'redux';

import playlists from './playlists';


export const reducers = combineReducers({ 
    playlists: playlists,
    //add more
});
