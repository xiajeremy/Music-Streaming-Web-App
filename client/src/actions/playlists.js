import { FETCH_PLAYLIST, FETCH_ALL, START_LOADING, END_LOADING, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});

    const { data } = await api.fetchPlaylist(id);

    dispatch({ type: FETCH_PLAYLIST, payload: data });
    dispatch({ type: END_LOADING});

    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};


export const getPlaylists = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const { data } = await api.fetchPlaylists();

    dispatch({ type: END_LOADING});

    dispatch({ type: FETCH_ALL, payload: data });
    
    console.log(data)
  } catch (error) {
    console.log(error.message);
  }
};

export const getPlaylistsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});

    const {data} = await api.fetchPlaylistsBySearch(searchQuery);

    dispatch({ type: END_LOADING});

    dispatch({ type: FETCH_BY_SEARCH, payload: data });

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}

export const createPlaylist = (playlist) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});

    const { data } = await api.createPlaylist(playlist);

    dispatch({ type: END_LOADING});

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePlaylist = (id, playlist) => async (dispatch) => {
  try {
    const { data } = await api.updatePlaylist(id, playlist);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePlaylist = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePlaylist(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePlaylist = (id) => async (dispatch) => {
  try {
    await api.deletePlaylist(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
