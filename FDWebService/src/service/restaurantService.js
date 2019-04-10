const validator = require('../utilities/validator');
const restaurantModel = require('../model/restaurantModel');
const restaurantService = {};

//service to fetch all restaurants
restaurantService.getRestaurants = () =>{
    return restaurantModel.mGetRestaurants().then((restaurants)=>{
        if(restaurants == null){
            var err = new Error('No restaurants found');
            err.status = 400;
            throw err;
        }
        else{
            return restaurants;
        }
    })

}

restaurantService.insertRestaurant = (restaurant) =>{
    return restaurantModel.mInsertRestaurant(restaurant).then((restaurantName)=>{
        if(restaurantName == null){
            var err = new Error('Insertion failed');
            err.status =  400;
            throw err;
        }
        else{
            return restaurantName;
        }
    })
}

module.exports = restaurantService;
