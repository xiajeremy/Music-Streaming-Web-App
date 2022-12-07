import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

export const fetchPlaylists = () => API.get('/playlists');
export const createPlaylist = (newPlaylist) => API.post('/playlists', newPlaylist);
export const likePlaylist = (id) => API.patch(`/playlists/${id}/likePlaylist`);
export const updatePlaylist = (id, updatedPlaylist) => API.patch(`/playlists/${id}`, updatedPlaylist);
export const deletePlaylist = (id) => API.delete(`/playlists/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);