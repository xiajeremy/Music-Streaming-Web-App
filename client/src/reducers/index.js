import { combineReducers } from 'redux';

import playlists from './playlists';
import auth from './auth';
import tracks from './tracks';
import artists from './artists';

export const reducers = combineReducers({ playlists, auth, tracks, artists,});
