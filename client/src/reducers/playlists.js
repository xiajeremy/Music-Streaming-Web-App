import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (playlists = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case FETCH_BY_SEARCH:
      return action.payload;
    case LIKE:
      return playlists.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist));
    case CREATE:
      return [...playlists, action.payload];
    case UPDATE:
      return playlists.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist));
    case DELETE:
      return playlists.filter((playlist) => playlist.playlist_name !== action.payload);
    default:
      return playlists;
  }
};

