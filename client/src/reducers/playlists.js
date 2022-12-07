import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state =  [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ... state, 
        playlists: action.payload.data,
        currentPage: action.payload.currentPage, 
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return {
        ... state, 
        playlists: action.payload
      };;
    case LIKE:
      return state.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist));
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist));
    case DELETE:
      return state.filter((playlist) => playlist.playlist_name !== action.payload);
    default:
      return state;
  }
};
