import express from 'express';
import { getPlaylists, getPlaylist, createPlaylist, searchPlaylists, updatePlaylist, commentPlaylist, deletePlaylist } from '../controllers/playlists.js';

import auth from '../middleware/auth.js';


const router = express.Router()


//Getting all
router.get('/', getPlaylists);
//Getting one
router.get('/:playlist_name', getPlaylist);
//Getting Search
router.get('/search/:playlistSearch', searchPlaylists);
//Populate database
router.post('/', auth, createPlaylist);
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:playlist_name', auth, updatePlaylist);
//Deleting one
router.delete('/:playlist_name', auth, deletePlaylist);
//Creating comment
router.post('/:playlist_name/commentPlaylist', auth, commentPlaylist);

export default router;
