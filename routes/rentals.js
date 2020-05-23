const express = require('express');
const router = express.Router();
const { Rental,validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose')
const Fawn = require('fawn');
const authenticate = require('../middleware/authenticate');
const adminAuth = require('../middleware/adminAuth');

Fawn.init(mongoose);

router.get('/',async (req,res) => {
    const rental = await Rental.find();
    res.send(rental);
})

router.get('/:id',async (req,res) => {
    const rental = await Rental.findById(req.params.id);
    res.send(rental);
})

router.post('/',authenticate,async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.send('Movie Not Found ..')

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.send('Customer Not Found ..')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer:{ id:customer._id, name:customer.name, phone:customer.phone },
        movie:{ _id:movie._id, title:movie.title, dailyRentalRate:movie.dailyRentalRate }
    });

    try{
        new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id:movie._id},{
                $inc:{ numberInStock:-1 }
            })
            .run();

        res.send(rental);
    }
    catch(ex){
        res.send('fawn Error');
    }
})

module.exports = router;