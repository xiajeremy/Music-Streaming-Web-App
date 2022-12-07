import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getTracks = () => async (dispatch) => {
  try {
    
    const { data } = await api.fetchTracks();
    dispatch({ type: END_LOADING});
    dispatch({ type: FETCH_ALL, payload: data });

  } catch (error) {
    console.log(error.message);
  }
};