const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    artistID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Artist', artistSchema)