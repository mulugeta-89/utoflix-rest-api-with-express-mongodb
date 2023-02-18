const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")
const userSchema = new Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

userSchema.plugin(passportLocalMongoose)

var Users = mongoose.model('User', userSchema)
module.exports = Users;