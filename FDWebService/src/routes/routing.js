const express = require('express');
const router = express.Router();
const authService = require('../service/authService');
const restaurantService = require('../service/restaurantService');
const Register = require('../model/register');
const Login = require('../model/login');
const Restaurant =  require('../model/restaurant');
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
//route for registration
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
//route for login
router.post('/login',(req,res,next)=>{
    const user = new Login(req.body);

    authService.login(user).then((username)=>{
        res.json({'message': username + ', successfully logged in'})
    })
    .catch((err)=>{
        next(err);
    })
    
})
//route to fetch all restaurants
router.get('/getRestaurants',(req,res,next)=>{
    restaurantService.getRestaurants().then((restaurants)=>{
        res.json({'message': restaurants});
    })
    .catch((err)=>{
        next(err);
    })
})

//route for inserting restaurant
router.post('/insertRestaurant',(req,res,next)=>{
    var restaurant = new Restaurant(req.body);
    restaurantService.insertRestaurant(restaurant).then((restaurantName)=>{
        res.json({'message': restaurantName + ' inserted!'})
    })
    .catch((err)=>{
        next(err);
    })
})
module.exports = router;
