const express = require('express')
const router = express.Router()
const Track = require('../models/track')

//Getting all
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find()
        res.json(tracks)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:id', getTrack, (req, res) => {
    res.send(res.track)
})
//Creating one
router.post('/', async (req, res) => {
    const track = new Track ({
        track_id: req.body.track_id,
        track_title: req.body.track_title
    })
    try {
        const newTrack = await track.save()
        res.status(201).json(newTrack)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:id', getTrack, async (req, res) => {
    if (req.body.track_title != null) {
        res.track.track_title = req.body.track_title
    }
    try {
        const updatedTrack = await res.track.save()
        res.json(updatedTrack)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:id', getTrack, async (req, res) => {
    try {
        await res.track.remove()
        res.json({ message: "Deleted track"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getTrack(req, res, next) {
    let track
    try { 
        track = await Track.findById(req.params.id)
        if (track == null) {
            return res.status(404).json({ message: 'Cannot find track' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.track = track
    next()
}

module.exports = router