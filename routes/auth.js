const express = require('express')
const jwt = require('jsonwebtoken')
const {User} = require('../models/users')
const router = express.Router()
const bcrypt = require('bcrypt')
const Joi = require('joi')


router.post('/',async (req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email}) 
    if(!user) return res.status(400).send('Invalid email or password')
    
    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid email or passwor')
    
    const token =jwt.sign({_id:user._id},'emranyonasyimer')
    res.status(200).json(token)
    
})

const validate = (req) => {
    const schema = {
        email:Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).alphanum().required()
    } 
    return Joi.validate(req,schema)
}

module.exports  = router