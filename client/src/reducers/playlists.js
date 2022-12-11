import { FETCH_PLAYLIST, FETCH_ALL_PLAYLISTS, COMMENT, SEARCH_PLAYLISTS, END_LOADING, START_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state =  { isLoading: true, playlists: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {... state, isLoading: true};

    case END_LOADING:
      return {... state, isLoading: false};
    case FETCH_ALL_PLAYLISTS:
      return {
        ... state, 
        playlists: action.payload.data,
        currentPage: action.payload.currentPage, 
        numberOfPages: action.payload.numberOfPages
      };
    case SEARCH_PLAYLISTS:
      return {
        ... state, 
        playlists: action.payload
      };
    case FETCH_PLAYLIST:
      return {
        ... state, 
        playlist: action.payload
      };
    case LIKE:
      return { ... state, playlists: state.playlists.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist))};
    case COMMENT:
        return {
          ... state, 
          playlists: state.playlists.map((playlist) => {
            if(playlist.playlist_name === action.payload.playlist_name) {
              return action.payload;
            }

            return playlist
          })
        }
    case CREATE:
      return { ... state, playlists: [...state, action.payload]};
    case UPDATE:
      return { ... state, playlists: state.playlists.map((playlist) => (playlist.playlist_name === action.payload.playlist_name ? action.payload : playlist))};
    case DELETE:
      return { ... state, playlists: state.playlists.filter((playlist) => playlist.playlist_name !== action.payload)};
    default:
      return state;
  }
};
