const express = require('express')
const router = express.Router()
const Track = require('../models/track')
const app = express();
const { check, validationResult } = require('express-validator');

const cors = require('cors');
let bodyParser = require('body-parser');
let multer = require('multer');
let csv = require('csvtojson');

let upload =  multer({dest: 'data/'})

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

var stringSimilarity = require("string-similarity");


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
router.get('/:track_id', getTrack, (req, res) => {
    res.send(res.track)
})

//QUESTION 4
router.get('/search/:trackSearch', async (req, res) => {

    var allResults = await Track.find({}, {track_id: 1, track_title: 1, album_title: 1 })

    allResultsStr = JSON.stringify(allResults);
    allResultsArr = allResultsStr.split('},{');

    softSearch = stringSimilarity.findBestMatch(req.params.trackSearch, allResultsArr);

    let sortedSearch = softSearch.ratings.sort((t1, t2) => (t1.rating < t2.rating) ? 1 : (t1.rating > t2.rating) ? -1 : 0);
    
    console.log(sortedSearch)

    
    var finalResults = [];
    let counter = 0;
    for(let i = 0; i < sortedSearch.length; i++){
        if(counter < 20){
            let searchIndex = allResultsArr.indexOf(sortedSearch[i].target)
            console.log(sortedSearch[i].target)
            console.log(searchIndex)
            console.log(allResultsArr[searchIndex])
            finalResults.push(allResults[searchIndex].track_id);
            counter ++;
        } else {
            break;
        }
    }
    console.log(finalResults)

    res.send(finalResults)
})


//Creating one
/*router.post('/', async (req, res) => {
    const track = new Track ({
        track_id: req.body.track_id,
        track_title: req.body.track_title
    })
    try {
        const newTrack = await track.save()
        res.status(201).json(newTrack)tracks
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})*/

router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/raw_tracks.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const track = new Track({
                    title: item.title,
                    track_id: item.track_id,
                    album_id: item.album_id, 
                    album_title: item.album_title,
                    artist_id: item.artist_id,
                    artist_name: item.artist_name,
                    tags: item.tags,
                    track_date_created: item.track_date_created,
                    track_date_recorded: item.track_date_recorded,
                    track_duration: item.track_duration,
                    track_genres: item.track_genres,
                    track_number: item.track_number,
                    track_title: item.track_title
                });
                track.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})




//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:tracks_id', getTrack, async (req, res) => {
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
router.delete('/:tracks_id', getTrack, async (req, res) => {
    try {
        await res.track.remove()
        res.json({ message: "Deleted track"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

//middleware
async function getTrack(req, res, next) {
    let track
    try { 
        track = await Track.findOne({track_id: req.params.track_id})
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