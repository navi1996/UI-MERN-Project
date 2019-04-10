const validator = require('../utilities/validator');
const authModel = require('../model/authModel');
const authService = {};

//register user service
authService.register = (user) =>{

    validator.validateRegistration(user);
    return authModel.mRegistration(user)
    .then((customerId)=>{
        if(customerId == null){
            var err = new Error('Username or Email already exists');
            err.status = 400;
            throw err;
        }
        else{
            return customerId;
        }
    })
}

authService.login = (user)=>{
    return authModel.mLogin(user).then((username)=>{
        if(username== null){
            var err = new Error('Username or password is incorrect');
            err.status = 400;
            throw err;
        }
        else{
            return username;
        }
    })
}
module.exports = authService;
