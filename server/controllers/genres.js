import express from 'express';
import mongoose from 'mongoose';
import Genre from '../models/genre.js';


const router = express.Router()



//Getting all
export const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find()
        res.json(genres)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

//Getting one
export const getGenre = async (req, res) => {
    let genre
    try { 
        genre = await Genre.findOne({genre_id: req.params.genre_id})
        //p => p.genre_id === parseInt(genre_id
        if (genre == null) {
            return res.status(404).json({ message: 'Cannot find genre' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.genre = genre

    res.send(res.genre)
}




//Updating one (use patch to update certain parts instead of replacing entire resource)
export const updateGenre = async (req, res) => {
    let genre
    try { 
        genre = await Genre.findOne({genre_id: req.params.genre_id})
        //p => p.genre_id === parseInt(genre_id
        if (genre == null) {
            return res.status(404).json({ message: 'Cannot find genre' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.genre = genre    
    
    if (req.body.genre_title != null) {
        res.genre.genre_title = req.body.genre_title
    }
    try {
        const updatedGenre = await res.genre.save()
        res.json(updatedGenre)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}

//Deleting one
export const deleteGenre = async (req, res) => {
    let genre
    try { 
        genre = await Genre.findOne({genre_id: req.params.genre_id})
        //p => p.genre_id === parseInt(genre_id
        if (genre == null) {
            return res.status(404).json({ message: 'Cannot find genre' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.genre = genre
    try {
        await res.genre.remove()
        res.json({ message: "Deleted genre"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
}



export default router;