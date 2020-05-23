const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User,validate } = require('../models/user'); // Import Mongoose Class And Schema
const authenticate = require('../middleware/authenticate');

// Read Login User 
router.get('/me',authenticate,async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

// Create User
router.post('/',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();

    res.send(_.pick(user,['_id','name','email']));
})

module.exports = router;