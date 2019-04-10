const connection = require('../utilities/connections');

var authModel = {};
//genertating unique customerid
authModel.generateUserId = () => {
    return connection.getAuthentications().then((model) => {
        return model.find({}, { customerId: 1 }).then((idArr) => {
            var lastId = Number(idArr[idArr.length - 1].customerId);
            return lastId + 1
        })
    })

}
//registration model
authModel.mRegistration = (user) => {
    return connection.getAuthentications()
        .then((model) => {
            return model.find({ $or: [{ username: user.username }, { email: user.email }] }, {})
                .then((response1) => {
                    if (response1.length != 0) return null;
                    //calling generateUserId function to generate unique customerid
                    return authModel.generateUserId().then((id) => {
                        user.customerId = id;
                        return model.create(user).then((response2) => {
                            return user.customerId;
                        })
                    })
                })
        })
}

authModel.mLogin = (user) =>{
    return connection.getAuthentications()
    .then((model)=>{
        return model.find({$and:[{$or: [{ username: user.username }, { email: user.email }]}, {password:user.password}]})
        .then((response)=>{
            if(response.length == 0) return null;
            else return user.username
        })
    })
}

module.exports = authModel;
