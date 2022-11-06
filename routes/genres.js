const express = require('express')
const app = express();
const router = express.Router()
const Genre = require('../models/genre')
const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');

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
router.get('/:id', getGenre, (req, res) => {
    res.send(res.genre)
})
//Creating one
/*
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
    .fromFile('C:/Users/xxia/Documents/3rd Year/SE3316/se3316-jxia47-lab3/data/genres.csv')
    .then(obj=>{
        try{
        obj.forEach(async item =>{
            const Genres = new Genre({
            title: item.title,
            genre_id: item.genre_id,
            parent: item.parent,
        });
        Genres.save()
        })
        res.json({message:'Succesfully Uploaded'})
    }
    catch(err){
        err.json({message: err.message});
    }
    })
    
    
})






//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:id', getGenre, async (req, res) => {
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
router.delete('/:id', getGenre, async (req, res) => {
    try {
        await res.genre.remove()
        res.json({ message: "Deleted genre"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getGenre(req, res, next) {
    let genre
    try { 
        genre = await Genre.findById(req.params.id)
        if (genre == null) {
            return res.status(404).json({ message: 'Cannot find genre' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.genre = genre
    next()
}

module.exports = router