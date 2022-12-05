import express from 'express';
import { getAlbums, getAlbum, updateAlbum, deleteAlbum } from '../controllers/albums.js';
import csv from 'csvtojson';
import multer from 'multer';

let upload =  multer({dest: 'data/'})

const router = express.Router()


//Getting all
router.get('/', getAlbums)
//Getting one
router.get('/:album_id', getAlbum)
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:album_id', updateAlbum);
//Deleting one
router.delete('/:album_id', deleteAlbum);
//Populate database
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


export default router;
