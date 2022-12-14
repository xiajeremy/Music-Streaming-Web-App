import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const signin = (formData, history) => async(dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        const result = data.result;
        const token = data.token;

        localStorage.setItem('profile', JSON.stringify({result, token}));

        //doesnt work
        dispatch({type: AUTH, data});


        history.push('/playlists')
    } catch (error) {
        console.log(error)
    }
}
export const signup = (formData, history) => async(dispatch) => {
    try {


        const {data} = await api.signUp(formData);

        const result = data.result;
        const token = data.token;

        localStorage.setItem('profile', JSON.stringify({result, token}));

        dispatch({type: AUTH, data});

        history.push('/')
    } catch (error) {
        console.log(error)
    }
} 