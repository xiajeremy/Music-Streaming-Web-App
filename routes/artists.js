const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')

//Getting all
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find()
        res.json(artists)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:id', getArtist, (req, res) => {
    res.send(res.artist)
})
//Creating one
router.post('/', async (req, res) => {
    const artist = new Artist ({
        artistID: req.body.artistID,
        name: req.body.name
    })
    try {
        const newArtist = await artist.save()
        res.status(201).json(newArtist)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:id', getArtist, async (req, res) => {
    if (req.body.name != null) {
        res.artist.name = req.body.name
    }
    try {
        const updatedArtist = await res.artist.save()
        res.json(updatedArtist)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:id', getArtist, async (req, res) => {
    try {
        await res.artist.remove()
        res.json({ message: "Deleted artist"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getArtist(req, res, next) {
    let artist
    try { 
        artist = await Artist.findById(req.params.id)
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.artist = artist
    next()
}

module.exports = router