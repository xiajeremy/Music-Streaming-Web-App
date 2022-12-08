import { FETCH_ARTIST, FETCH_ALL_ARTISTS, START_LOADING, END_LOADING, SEARCH_ARTISTS, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getArtist = (id) => async (dispatch) => {
  try {
    console.log("actions/getArtists")

    dispatch({ type: START_LOADING});

    const { data } = await api.fetchArtist(id);


    dispatch({ type: FETCH_ARTIST, payload: data });
    dispatch({ type: END_LOADING});

    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};


export const getArtists = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const { data } = await api.fetchArtists(page);
    console.log("actions/getArtists")

    console.log(data)

    dispatch({ type: FETCH_ALL_ARTISTS, payload: data });
    dispatch({ type: END_LOADING});

    
    console.log(data)
  } catch (error) {
    console.log(error);
  }
};

export const getArtistsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});

    const {data} = await api.fetchArtistsBySearch(searchQuery);
    
    dispatch({ type: END_LOADING});

    dispatch({ type: SEARCH_ARTISTS, payload: data });

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}
