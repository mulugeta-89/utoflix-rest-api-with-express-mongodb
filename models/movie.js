const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const movieSchema = new Schema({
    name: {
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
    }
})
const Movies = mongoose.model("Movie", movieSchema)
module.exports = Movies