const {validate,User} = require('../models/users')
const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


router.get('/me',auth,async (req,res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
})

router.post('/',async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    if(await User.findOne({email:req.body.email})) return res.status(400).send('This user has been registered')
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password,salt)
    const user = await new User(_.pick(req.body,['name','email','password'])).save()

    const token = user.userAuthentication()
    res.header('X-auth-token',token).status(200).json(_.pick(user,['_id','name','email']))
    
})


module.exports  = router