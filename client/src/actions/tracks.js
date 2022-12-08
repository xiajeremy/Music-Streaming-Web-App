import { FETCH_TRACK, FETCH_ALL_TRACKS, START_LOADING, END_LOADING, SEARCH_TRACKS, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getTrack = (id) => async (dispatch) => {
  try {
    console.log("actions/getTracks")

    dispatch({ type: START_LOADING});

    const { data } = await api.fetchTrack(id);


    dispatch({ type: FETCH_TRACK, payload: data });
    dispatch({ type: END_LOADING});

    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};


export const getTracks = (page) => async (dispatch) => {
  try {
    console.log("actions/getTracks")
    dispatch({ type: START_LOADING});
    const { data } = await api.fetchTracks(page);

    console.log(data)

    dispatch({ type: FETCH_ALL_TRACKS, payload: data });
    dispatch({ type: END_LOADING});

    
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};

export const getTracksBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});

    const {data} = await api.fetchTracksBySearch(searchQuery);
    
    dispatch({ type: END_LOADING});

    dispatch({ type: SEARCH_TRACKS, payload: data });

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}
