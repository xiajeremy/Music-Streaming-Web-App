const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
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
        const artists = await Artist.find()
        res.json(artists)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:artist_id', getArtist, (req, res) => {
    res.send(res.artist)
})

//QUESTION 5
router.get('/search/:artistSearch', async (req, res) => {
    if(typeof req.params.artistSearch === 'string'){
        if (req.params.artistSearch > 20){
            return res.status(400).json({message: "Invalid entry. Input no more than 20 characters."});
        }
        for(let i = 0; i < req.params.artistSearch.length; i++){
            if((/[\p{Letter}\p{Mark}]+/gu).test(req.params.artistSearch[i]) == false){
                return res.status(400).json({message: "Invalid entry. Input language characters only."});
            }
        }
    }
    var allResults = await Artist.find({'artist_name': {$regex: new RegExp(req.params.artistSearch, 'i')}});
    
    var finalResults = [];
    for(let i = 0; i < allResults.length - 1; i++){
        finalResults.push(allResults[i].artist_id);
    }
    res.send(finalResults)
})

//Creating one
/*router.post('/', async (req, res) => {
    const artist = new Artist ({
        artist_id: req.body.artist_id,
        artist_name: req.body.artist_name
    })
    try {
        const newArtist = await artist.save()
        res.status(201).json(newArtist)
    } catch (err){
        res.status(400).json({ message: err.message })
    }title
})
*/
router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/raw_artists.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const artist = new Artist({
                    artist_name: item.artist_name,
                    artist_id: item.artist_id,
                    artist_members: item.artist_members,
                    artist_location: item.artist_location,
                    artist_website: item.artist_website,
                    artist_tags: item.artist_tags
                });
                artist.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})






//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:artist_id', getArtist, async (req, res) => {
    if (req.body.artist_name != null) {
        res.artist.artist_name = req.body.artist_name
    }
    try {
        const updatedArtist = await res.artist.save()
        res.json(updatedArtist)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:artist_id', getArtist, async (req, res) => {
    try {
        await res.artist.remove()
        res.json({ message: "Deleted artist"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getArtist(req, res, next) {
    if(isNaN(req.params.artist_id)){
        return res.status(400).json({message: "Invalid entry. Input numbers only."});
    }
    let artist
    try { 
        artist = await Artist.findOne({artist_id: req.params.artist_id})
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