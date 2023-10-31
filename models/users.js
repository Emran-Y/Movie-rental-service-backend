const mongoose = require('mongoose')
const Joi = require('joi')
const { schema } = require('joi/lib/types/object')

const User = new mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024
    }
}))


const userValdidater = (user) => {
    const schema = {
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).alphanum().required()
    } 
    return Joi.validate(user,schema)
}

exports.validate = userValdidater
exports.User = User