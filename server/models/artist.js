import mongoose from 'mongoose';
//const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    artist_id: {
        type: Number,
        required: true
    },
    artist_active_year_begin: {
        type: Number
        
    },
    artist_active_year_end: {
        type: Number
        
    },
    artist_associated_labels: {
        type: String
        
    },
    artist_bio: {
        type: String,
    },
    artist_comments: {
        type: Number
        
    },
    artist_contact: {
        type: String
        
    },
    artist_date_created: {
        type: Date,
        
    },
    artist_donation_url: {
        type: String
        
    },
    artist_favorites: {
        type: Number
        
    },
    artist_flattr_name: {
        type: String
        
    },
    artist_handle: {
        type: String
        
    },
    artist_image_file: {
        type: String
        
    },
    artist_images: {
        type: String
        
    },
    artist_latitude: {
        type: Number
        
    },
    artist_location: {
        type: String
        
    },
    artist_longitude: {
        type: Number
        
    },
    artist_members: {
        type: String
        
    },
    artist_name: {
        type: String,
        required: true
        
    },
    artist_paypal_name: {
        type: String
        
    },
    artist_related_projects: {
        type: String
        
    },
    artist_url: {
        type: String
        
    },
    artist_website: {
        type: String
        
    },
    artist_wikipedia_page: {
        type: String
        
    },
    tags: {
        type: String
        
    }
})

export default mongoose.model('Artist', artistSchema)