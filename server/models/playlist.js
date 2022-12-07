import mongoose from 'mongoose';
//const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    playlist_name: {
        type: String,
        required: true
        
    },
    tracks_amount: {
        type: Number,
        "default": 0
    },
    playtime: {
        type: String,
        "default": "0"
    },
    track_list: {
        type: Array, 
        "default": []
    },
    last_edit:{
        type: Date
    },
    description: {
        type: String, 
        "default": " "
    },
    creator: {
        type: String,
    },
    name: {
        type: String
    }
})

export default mongoose.model('Playlist', playlistSchema)