import { FETCH_ALL, CREATE_PLAYLIST, UPDATE, DELETE, LIKE, END_LOADING } from '../constants/actionTypes';

import * as api from '../api/index.js';
import Axios from 'axios';

export const getTracks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTracks();
    dispatch({ type: END_LOADING});
    dispatch({ type: FETCH_ALL, payload: data });
    console.log(data)

  } catch (error) {
    console.log(error.message);
  }
};