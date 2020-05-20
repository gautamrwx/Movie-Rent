const express = require('express');
const router = express.Router();
const { Customer,validate } = require('../models/customer'); // Import Mongoose Class And Schema

// Read Customer
router.get('/',async (req,res) => {
    const customers = await Customer.find();
    res.send(customers);
})

router.get('/:id',async (req,res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.send("Not Found");

    res.send(customer);
})

// Create Customer
router.post('/',async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    let customer = new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });

    customer = await customer.save();
    res.send(customer);
})

// Update Customer
router.put('/:id',async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    },{new:true});

    if(!customer) return res.send("Not Found");

    customer.name = req.body.name;
    res.send(customer);
})

// Delete Customer
router.delete('/:id',async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.send("Not Found");

    res.send(customer);
})

module.exports = router;