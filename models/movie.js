const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose)
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    label: {
        type: String
    },
    photo: {
        type: String
    },
    video: {
        type: String
    },
    releaseDate: {
        type: String
    },
    price: {
        type: Currency
    },
    featured: {
        type: Boolean,
        required: true
    },
    comment: [commentSchema]
}, {
    timestamps: true
})
const Movies = mongoose.model("Movie", movieSchema)
module.exports = Movies