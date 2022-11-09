const mongoose = require('mongoose')

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
    }
})

module.exports = mongoose.model('Playlist', playlistSchema)