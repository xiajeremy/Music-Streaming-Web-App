import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPlaylists = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPlaylists();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPlaylist = (playlist) => async (dispatch) => {
  try {
    const { data } = await api.createPlaylist(playlist);

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
