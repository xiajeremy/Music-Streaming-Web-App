import { FETCH_TRACK, FETCH_ALL_TRACKS, COMMENT, SEARCH_TRACKS, END_LOADING, START_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (state =  { isLoading: true, tracks: []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {... state, isLoading: true};

    case END_LOADING:
      return {... state, isLoading: false};
    case FETCH_ALL_TRACKS:
      return {
        ... state, 
        tracks: action.payload.data,
        currentPage: action.payload.currentPage, 
        numberOfPages: action.payload.numberOfPages
      };
    case SEARCH_TRACKS:
      return {
        ... state, 
        tracks: action.payload
      };
    case FETCH_TRACK:
      return {
        ... state, 
        track: action.payload
      };
    case LIKE:
      return { ... state, tracks: state.tracks.map((track) => (track.track_title === action.payload.track_title ? action.payload : track))};
    case COMMENT:
        return {
          ... state, 
          tracks: state.tracks.map((track) => {
            if(track.track_title === action.payload.track_title) {
              return action.payload;
            }

            return track
          })
        }
    case CREATE:
      return { ... state, tracks: [...state.tracks, action.payload]};
    case UPDATE:
      return { ... state, tracks: state.tracks.map((track) => (track.track_title === action.payload.track_title ? action.payload : track))};
    case DELETE:
      return { ... state, tracks: state.tracks.filter((track) => track.track_title !== action.payload)};
    default:
      return state;
  }
};
