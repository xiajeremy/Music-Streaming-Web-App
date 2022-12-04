import express from 'express';
import Genre from '../models/genre.js';
import csv from 'csvtojson';

import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';


//const express = require('express')
const app = express();
const router = express.Router()
// const Genre = require('../models/genre')
// const cors = require('cors');
// let bodyParser = require('body-parser');
// let multer = require('multer');
// let csv = require('csvtojson');

let upload =  multer({dest: 'data/'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



//Getting all
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find()
        res.json(genres)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:genre_id', getGenre, (req, res) => {
    res.send(res.genre)
})



//Creating one
/* MANUAL POST
router.post('/', async (req, res) => {
    const genre = new Genre ({
        genre_id: req.body.genre_id,
        title: req.body.title
    })
    try {
        const newGenre = await genre.save()
        res.status(201).json(newGenre)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})
*/
router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/genres.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const genre = new Genre({
                    title: item.title,
                    genre_id: item.genre_id,
                    parent: item.parent
                });
                genre.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})






//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:genre_id', getGenre, async (req, res) => {
    if (req.body.genre_title != null) {
        res.genre.genre_title = req.body.genre_title
    }
    try {
        const updatedGenre = await res.genre.save()
        res.json(updatedGenre)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:genre_id', getGenre, async (req, res) => {
    try {
        await res.genre.remove()
        res.json({ message: "Deleted genre"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

//Middleware
async function getGenre(req, res, next) {
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
    next()
}

export default router;