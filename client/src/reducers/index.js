import { combineReducers } from 'redux';

import playlists from './playlists';
import auth from './auth';

export const reducers = combineReducers({ playlists, auth,});
