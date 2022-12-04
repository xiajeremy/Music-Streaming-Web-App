import mongoose from 'mongoose';
//const mongoose = require('mongoose')

const trackSchema = new mongoose.Schema({
    track_id: {
        type: Number,
        required: true
    },
    album_id: {
        type: Number
    },
    album_title: {
        type: String
    },
    album_url: {
        type: String
    },
    artist_id: {
        type: Number
    },
    artist_name: {
        type: String
    },
    artist_url: {
        type: String
    },
    artist_website: {
        type: String
    },
    license_image_file: {
        type: String
    },
    license_image_file_large: {
        type: String
    },
    license_parent_id: {
        type: Number
    },
    license_title: {
        type: String
    },
    license_url: {
        type: String
    },
    tags: {
        type: String
    },
    track_bit_rate: {
        type: Number
    },
    track_comments: {
        type: Number
    },
    track_composer: {
        type: String
    },
    track_copyright_c: {
        type: String
    },
    track_copyright_p: {
        type: String
    },
    track_date_created: {
        type: Date
    },
    track_date_recorded: {
        type: Date
    },
    track_disc_number: {
        type: Number
    },
    track_duration: {
        type: String
    },
    track_explicit: {
        type: String
    },
    track_explicit_notes: {
        type: String
    },
    track_favorites: {
        type: Number
    },
    track_file: {
        type: String
    },
    track_genres: {
        type: String
    },
    track_image_file: {
        type: String
    },
    track_information: {
        type: String
    },
    track_instrumental: {
        type: Number
    },
    track_interest: {
        type: Number
    },
    track_language_code: {
        type: String
    },
    track_listens: {
        type: Number
    },
    track_lyricist: {
        type: String
    },
    track_number: {
        type: Number
    },
    track_publisher: {
        type: String
    },
    track_title: {
        type: String,
        required: true
    },
    track_url: {
        type: String
     }

})

export default mongoose.model('track', trackSchema)