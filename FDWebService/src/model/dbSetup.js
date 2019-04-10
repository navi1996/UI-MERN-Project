const collection = require('../utilities/connections');

const authDb = [{
    username: 'NavrajKaler',
    password: 'passwords2',
    email: 'jatt22kaler@yahoo.com',
    admin: true,
    customerId: 0001
}]

const restaurantDb = [{
    restaurantName: "Kaler's Bar and Chicken",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best chicken in the city'
        }
    ],
    menu: [
        {
            dishName: 'Grilled Chicken',
            price: 400,
            available: true
        },
        {
            dishName: 'Special BBQ Chicken',
            price: 600,
            available: true
        },
        {
            dishName: 'Honey Grilled Chicken',
            price: 750,
            available: false
        }

    ]
},
{
    restaurantName: "Sood Da Dhabha",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Worst dhahba ever'
        }
    ],
    menu: [
        {
            dishName: 'Palak paneer',
            price: 150,
            available: true
        },
        {
            dishName: 'Chilli Chicken',
            price: 300,
            available: true
        },
        {
            dishName: 'Channa Chawal',
            price: 100,
            available: false
        }

    ]
},
{
    restaurantName: "Gupta Sweets",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best sweets in the town'
        }
    ],
    menu: [
        {
            dishName: 'Rasmalai',
            price: 30,
            available: true
        },
        {
            dishName: 'Gulabjamun',
            price: 20,
            available: true
        },
        {
            dishName: 'Chocolate Cake',
            price: 250,
            available: false
        }

    ]
}

]

exports.setupDb = () => {
    return collection.getAuthentications().then((auth) => {
        return collection.getRestaurants().then((restaurant) => {
            return restaurant.deleteMany().then(() => {
                return auth.deleteMany().then(() => {
                    return restaurant.insertMany(restaurantDb).then((restaurantResponse) => {
                        return auth.insertMany(authDb).then((authResponse) => {
                            if (authResponse && restaurantResponse) return "Data inserted successfully";
                            else {
                                let err = new Error("Insertion failed");
                                err.status = 400;
                                throw err;
                            }
                        })
                    })
                })
            })
        })
    })
}
