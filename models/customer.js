const joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = {
    name:{type:String,require:true,minlength:3,maxlength:40},
    phone:{type:String,require:true,minlength:10,maxlength:10},
    isGold:{type:Boolean,default:false}
};

// mongodb schema class
const Customer = new mongoose.model('Customer',customerSchema);

// -- Validate Customer function --//
function validateCustomer(customer){
    const schema = {
        name:joi.string().min(3).max(40).required(),
        phone:joi.string().min(10).max(10).required(),
        isGold:joi.boolean()
    };

    return joi.validate(customer,schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;