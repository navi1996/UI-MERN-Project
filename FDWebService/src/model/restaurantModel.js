const connection = require('../utilities/connections');

var restaurantModel = {};

//model to fetch all restaurants
restaurantModel.mGetRestaurants = () => {
    return connection.getRestaurants().then((model) => {
        return model.find({}, {}).then((restaurants) => {
            if (restaurants.length == 0) return null;
            else {
                return restaurants;
            }
        })
    })

}

restaurantModel.mInsertRestaurant = (restaurant) => {
    return connection.getRestaurants().then((model) => {
        return model.find({ restaurantName: restaurant.restaurantName }).then((response1) => {
            if (response1 == 0) {
                return model.create(restaurant).then((response2) => {
                    if (response2) return restaurant.restaurantName
                    else return null;
                })
            }
            else return null;
        })
    })
}

//restaurantModel.mInsertRestaurant({ restaurantName: 'Soosd Da Dhabha' })

module.exports = restaurantModel;
