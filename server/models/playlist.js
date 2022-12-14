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
        "default": "00:00"
    },
    track_list: {
        type: [Number], 
        "default": []
    },
    last_edit:{
        type: Date
    },
    description: {
        type: String, 
        "default": ""
    },
    creator: {
        type: String,
    },
    name: {
        type: String
    },
    comments: {
        type: [String], default: []
    },
    is_public: {
        type: Boolean,
        "default": false
    }
})

export default mongoose.model('Playlist', playlistSchema)