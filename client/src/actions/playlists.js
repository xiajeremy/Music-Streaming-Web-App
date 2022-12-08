import { FETCH_PLAYLIST, FETCH_ALL_PLAYLISTS, START_LOADING, END_LOADING, SEARCH_PLAYLISTS, CREATE, UPDATE, DELETE, LIKE, COMMENT} from '../constants/actionTypes';

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


export const getPlaylists = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING});
    const { data } = await api.fetchPlaylists(page);

    console.log(data)

    dispatch({ type: FETCH_ALL_PLAYLISTS, payload: data });
    dispatch({ type: END_LOADING});

    
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

    dispatch({ type: SEARCH_PLAYLISTS, payload: data });

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
    console.log(error);
  }
};

export const updatePlaylist = (id, playlist) => async (dispatch) => {
  try {
    const { data } = await api.updatePlaylist(id, playlist);
    console.log(data)
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

export const commentPlaylist = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({type: 'COMMENT', payload: data})
  } catch (error) {
    console.log(error)
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
