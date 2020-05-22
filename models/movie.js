const mongoose = require('mongoose');
const joi = require('joi');
const { genreSchema } = require('./genre');

const movieSchema = {
    title:{ type: String, required: true,trim: true, minlength: 5,maxlength: 255 },
    genre:{ type: genreSchema, required: true },
    numberInStock: { type: Number, required: true,min: 0,max: 255 },
    dailyRentalRate: { type: Number, required: true,min: 0,max: 255 }
};

const Movie = new mongoose.model('Movie',movieSchema);

// -- Req Body Validation Logic -- //
function validateMovie(movie){
    const schema = {
        title: joi.string().min(3).max(50).required(),
        genreId: joi.objectid().required(),
        numberInStock: joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    };

    return joi.validate(movie,schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;