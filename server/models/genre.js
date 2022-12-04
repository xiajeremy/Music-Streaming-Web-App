import mongoose from 'mongoose';
//const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    genre_id: {
        type: Number,
        required: true
    },
    '#tracks': {
        type: Number
        
    },
    parent: {
        type: Number
        
    },
    title: {
        type: String,
        required: true
    },
    top_level: {
        type: Number
        
    }
})

export default mongoose.model('Genre', genreSchema)