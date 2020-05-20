const joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

customerSchema = {
    name:{type:String,require:true,minlength:3,maxlength:40},
    phone:{type:String,require:true,minlength:10,maxlength:10},
    isGold:{type:Boolean,default:false}
};

const Customer = new mongoose.model('Customer',customerSchema);

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
    const { error } = validateCustomer(req.body);
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
    const {error} = validateCustomer(req.body);
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


// -- Validate Customer function --//
function validateCustomer(customer){
    const schema = {
        name:joi.string().min(3).max(40).required(),
        phone:joi.string().min(10).max(10).required(),
        isGold:joi.boolean()
    };

    return joi.validate(customer,schema);
}

module.exports = router;
