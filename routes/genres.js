const joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
});

const Genre = new mongoose.model('Genre',genreSchema);

// Read Resource
router.get('/',async (req,res) => {
    const genres = await Genre.find();
    res.send(genres);
})

router.get('/:id',async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.send("Not Found");

    res.send(genre);
})

// Create Resource
router.post('/',async (req,res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.send(error.details[0].message);

    let genre = new Genre({name:req.body.name});
    genre = await genre.save();
    res.send(genre);
})

// Update Resource
router.put('/:id',async (req,res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if(!genre) return res.send("Not Found");

    genre.name = req.body.name;
    res.send(genre);
})

// Delete Resource
router.delete('/:id',async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.send("Not Found");

    res.send(genre);
})

// -- Req Body Validation Logic -- //
function validateGenre(genre){
    const schema = {
        name:joi.string().min(3).max(50).required()
    };

    return joi.validate(genre,schema);
}

module.exports = router;