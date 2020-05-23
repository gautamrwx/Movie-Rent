const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

router.post('/',async (req,res) => {
    //validate 
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.send('User Not Found ..');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.send('Invalid email or password.');

    const token = user.generateAuthToken();
    res.send(token);
})

function validate(user){
    const schema = {
        email:joi.string().min(5).max(200).email().required(),
        password:joi.string().min(5).max(255).required()
    };

    return joi.validate(user,schema)
}

module.exports = router;