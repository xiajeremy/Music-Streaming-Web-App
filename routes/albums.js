const express = require('express')
const router = express.Router()
const Album = require('../models/album')
const app = express();
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
        const albums = await Album.find()
        res.json(albums)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:album_id', getAlbum, (req, res) => {
    res.send(res.album)
})
//Creating one
/*router.post('/', async (req, res) => {
    const album = new Album ({
        album_id: req.body.album_id,
        album_title: req.body.album_title
    })
    try {
        const newAlbum = await album.save()
        res.status(201).json(newAlbum)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})*/

router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/raw_albums.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const album = new Album({
                    album_title: item.album_title,
                    artist_name: item.artist_name,
                    album_id: item.album_id,
                    album_engineer: item.album_engineer,
                    album_producer: item.album_producer
                });
                album.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})




//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:album_id', getAlbum, async (req, res) => {
    if (req.body.album_title != null) {
        res.album.album_title = req.body.album_title
    }
    try {
        const updatedAlbum = await res.album.save()
        res.json(updatedAlbum)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:album_id', getAlbum, async (req, res) => {
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
        album = await Album.findOne({album_id: req.params.album_id})
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