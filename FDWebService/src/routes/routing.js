const express = require('express');
const router = express.Router();
const authService = require('../service/authService');
const Register = require('../model/register');
const Login = require('../model/login');
const create = require('../model/dbSetup');
//setup database

router.get('/setupDB',(req,res)=>{
    create.setupDb()
    .then((res1)=>{
       console.log(res1)
    })
    .catch((err)=>{
        next(err);
    })

})

router.post('/register',(req,res,next)=>{
    const user = new Register(req.body);
    authService.register(user)
    .then((customerId)=>{
        res.json({'message':'Registration successful for '+user.username + ' with customerId '+ customerId})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/login',(req,res,next)=>{
    const user = new Login(req.body);

    authService.login(user).then((username)=>{
        res.json({'message': username + ', successfully logged in'})
    })
    .catch((err)=>{
        next(err);
    })
    
})

module.exports = router;
