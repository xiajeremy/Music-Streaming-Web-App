import mongoose from 'mongoose';
//const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    playlist_name: {
        type: String,
        required: true
        
    },
    tracks_amount: {
        type: Number
        
    },
    playtime: {
        type: String,
    },
    track_list: {
        type: Array, 
        "default": []
    },
    last_edit:{
        type: String
    },
    description: {
        type: String
    }
})

export default mongoose.model('Playlist', playlistSchema)