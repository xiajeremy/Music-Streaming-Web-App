import express from 'express';
import { getPlaylists, getPlaylist, createPlaylist, searchPlaylists, updatePlaylist, deletePlaylist } from '../controllers/playlists.js';

const router = express.Router()


//Getting all
router.get('/', getPlaylists);
//Getting one
router.get('/:playlist_name', getPlaylist);
//Getting Search
router.get('/search/:playlistSearch', searchPlaylists);
//Populate database
router.post('/', createPlaylist);
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:playlist_name', updatePlaylist);
//Deleting one
router.delete('/:playlist_name', deletePlaylist);

export default router;
