const joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:50}
});

// mongodb schema class
const Genre = new mongoose.model('Genre',genreSchema);

// -- Req Body Validation Logic -- //
function validateGenre(genre){
    const schema = {
        name:joi.string().min(3).max(50).required()
    };

    return joi.validate(genre,schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;