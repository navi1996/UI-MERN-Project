const {Schema}  = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/eccomerceDB";


// //Athentication schema

const authSchema = Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    admin: {type: Boolean},
    customerId: {type: Number, required: true}
    
}, { collection: 'Auth' })

let collections = {}

collections.getAuthentications = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Auth', authSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = collections;
