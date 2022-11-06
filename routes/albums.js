const express = require('express')
const router = express.Router()
const Album = require('../models/album')

//Getting all
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find()
        res.json(albums)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:id', getAlbum, (req, res) => {
    res.send(res.album)
})
//Creating one
router.post('/', async (req, res) => {
    const album = new Album ({
        album_id: req.body.album_id,
        album_name: req.body.album_name
    })
    try {
        const newAlbum = await album.save()
        res.status(201).json(newAlbum)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:id', getAlbum, async (req, res) => {
    if (req.body.album_name != null) {
        res.album.album_name = req.body.album_name
    }
    try {
        const updatedAlbum = await res.album.save()
        res.json(updatedAlbum)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:id', getAlbum, async (req, res) => {
    try {
        await res.album.remove()
        res.json({ message: "Deleted album"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getAlbum(req, res, next) {
    let album
    try { 
        album = await Album.findById(req.params.id)
        if (album == null) {
            return res.status(404).json({ message: 'Cannot find album' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.album = album
    next()
}

module.exports = router