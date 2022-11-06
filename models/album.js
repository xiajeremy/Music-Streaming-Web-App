const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
    
    album_id: {
        type: String
    },
    album_comments: {
        type: String
    },
    album_date_created: {
        type: String
    },
    album_date_released: {
        type: String
    },
    album_engineer: {
        type: String
    },
    album_favorites: {
        type: String
    },
    album_handle: {
        type: String
    },
    album_image_file: {
        type: String
    },
    album_images: {
        type: String
    },
    album_information: {
        type: String
    },
    album_listens: {
        type: String
    },
    album_producer: {
        type: String
    },
    album_title: {
        type: String
    },
    album_tracks: {
        type: String
    },
    album_type: {
        type: String
    },
    album_url: {
        type: String
    },
    artist_name: {
        type: String
    },
    artist_url: {
        type: String
    },
    tags: {
        type: String
    }
})

module.exports = mongoose.model('Album', albumSchema)