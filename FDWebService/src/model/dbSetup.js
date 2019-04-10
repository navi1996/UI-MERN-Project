const collection = require('../utilities/connections');

const authDb = [{
    username: 'NavrajKaler',
    password: 'passwords2',
    email: 'jatt22kaler@yahoo.com',
    admin: true,
    customerId: 0001
}]

exports.setupDb = () => {
    return collection.getAuthentications().then((auth) => {
        return auth.deleteMany().then(() => {
            return auth.insertMany(authDb).then((authResponse) => {
                if (authResponse) return "Data inserted successfully";
                else {
                    let err = new Error("Insertion failed");
                    err.status = 400;
                    throw err;
                }
            })
        })
    })
}
