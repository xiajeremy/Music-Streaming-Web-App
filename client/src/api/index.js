import axios from 'axios';

const url = 'http://localhost:5000/playlists';

export const fetchPlaylists = () => axios.get(url);
export const createPlaylist = (newPlaylist) => axios.Playlist(url, newPlaylist);
export const likePlaylist = (id) => axios.patch(`${url}/${id}/likePlaylist`);
export const updatePlaylist = (id, updatedPlaylist) => axios.patch(`${url}/${id}`, updatedPlaylist);
export const deletePlaylist = (id) => axios.delete(`${url}/${id}`);
