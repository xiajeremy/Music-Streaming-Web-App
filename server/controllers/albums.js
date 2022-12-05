import express from 'express';
import mongoose from 'mongoose';
import Album from '../models/album.js';

const router = express.Router()


//Getting all
export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find()
        res.json(albums)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}
//Getting one
export const getAlbum = async (req, res) => {
    let album
    try { 
        album = await Album.findOne({album_id: req.params.album_id})
        if (album == null) {
            return res.status(404).json({ message: 'Cannot find album' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.album = album

    res.send(res.album)
}



//Updating one (use patch to update certain parts instead of replacing entire resource)
export const updateAlbum = async (req, res) => {
    let album
    try { 
        album = await Album.findOne({album_id: req.params.album_id})
        if (album == null) {
            return res.status(404).json({ message: 'Cannot find album' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.album = album

    if (req.body.album_title != null) {
        res.album.album_title = req.body.album_title
    }
    try {
        const updatedAlbum = await res.album.save()
        res.json(updatedAlbum)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

//Deleting one
export const deleteAlbum = async (req, res) => {
    let album
    try { 
        album = await Album.findOne({album_id: req.params.album_id})
        if (album == null) {
            return res.status(404).json({ message: 'Cannot find album' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.album = album

    try {
        await res.album.remove()
        res.json({ message: "Deleted album"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
}



export default router;