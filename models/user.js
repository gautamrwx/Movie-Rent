const mongoose = require('mongoose');
const joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String,required: true,minlength: 5,maxlength: 50},
    email: { type: String,required: true,minlength: 5,maxlength: 255,unique: true },
    password: { type: String,required: true,minlength: 5,maxlength: 1024 },
    isAdmin: { type:Boolean, default:false }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User = new mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        name: joi.string().min(5).max(50).required(),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    };

    return joi.validate(user,schema);
}

exports.validate = validateUser;
exports.User = User;