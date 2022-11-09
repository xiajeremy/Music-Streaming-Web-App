const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    playlist_name: {
        type: Number,
        required: true
        
    },
    '#tracks': {
        type: Number
        
    },
    playtime: {
        type: String,
    },
    track_list: {
        type: Array, 
        "default": []
    }
})

module.exports = mongoose.model('Playlist', playlistSchema)