import { FETCH_ARTIST, FETCH_ALL_ARTISTS, SEARCH_ARTISTS, END_LOADING, START_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state =  [], action) => {
  switch (action.type) {
    case START_LOADING:
      return {... state, isLoading: true};

    case END_LOADING:
      return {... state, isLoading: false};
    case FETCH_ALL_ARTISTS:
      return {
        ... state, 
        artists: action.payload.data,
        currentPage: action.payload.currentPage, 
        numberOfPages: action.payload.numberOfPages
      };
    case SEARCH_ARTISTS:
      return {
        ... state, 
        artists: action.payload
      };
    case FETCH_ARTIST:
      return {
        ... state, 
        artist: action.payload
      };
    case LIKE:
      return state.map((artist) => (artist.artist_name === action.payload.artist_name ? action.payload : artist));
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map((artist) => (artist.artist_name === action.payload.artist_name ? action.payload : artist));
    case DELETE:
      return state.filter((artist) => artist.artist_name !== action.payload);
    default:
      return state;
  }
};
