import express from 'express';
import { getGenres, getGenre, updateGenre, deleteGenre } from '../controllers/genres.js';
import csv from 'csvtojson';
import multer from 'multer';

let upload =  multer({dest: 'data/'})

const router = express.Router()


//Getting all
router.get('/', getGenres)
//Getting one
router.get('/:genre_id', getGenre)
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:genre_id', updateGenre);
//Deleting one
router.delete('/:genre_id', deleteGenre);
//Populate database
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


export default router;
