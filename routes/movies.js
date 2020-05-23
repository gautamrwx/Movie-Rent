const express = require('express');
const router = express.Router();
const { Movie,validate } = require('../models/movie'); // Import Mongoose Class And Schema
const { Genre } = require('../models/genre');
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

// Read Movie
router.get('/',async (req,res) => {
    const movies = await Movie.find();
    res.send(movies);
})

router.get('/:id',async (req,res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.send("Not Found");

    res.send(movie);
})

// Create Movie
router.post('/',authenticate,async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalid genre.');

    let movie = new Movie({
        title:req.body.title,
        genre:{ _id:genre._id,name:genre.name },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
})

//Update Movie
router.put('/:id',authenticate,async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:{ _id:genre._id,name:genre.name },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });

    if (!movie) return res.send('Invalid Movie.');
    res.send(movie);
})

//Delete Movie
router.delete('/:id',[authenticate,adminAuth],async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) return res.send('Movie Not Found .. ');

    res.send(movie);
})

module.exports = router;