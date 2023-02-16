const express = require("express")
const movieRouter = express.Router()
var Movies = require("../models/movie")
movieRouter.route("/")
    .get((req, res, next) => {
        Movies.find().then((dishes) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(dishes)
        }).catch((err) => next(err))
        
    })
    .post((req, res, next) => {
        Movies.create(req.body).then((dish) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(dish)
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.send("put operation is not supported")
    })
    .delete((req, res, next) => {
        Movies.deleteMany({}).then((resp) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(resp)
        })
    })
movieRouter.route("/:movieId")
    .get((req, res, next) => {
        Movies.findById(req.params.movieId).then((dish) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(dish)
        })
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.send("post operation is not supported")
    })
    .put((req, res, next) => {
        Movies.findByIdAndUpdate(req.params.movieId, { $set: req.body }, { new: true }).then((dish) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(dish)
        })
    })
    .delete((req, res, next) => {
        Movies.findByIdAndRemove(req.params.movieId).then((resp) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json({success: true, data: resp})
        })
        
    })
movieRouter.route("/:movieId/comments")
    .get((req, res, next) => {
        res.send("getting all the commments")
    })
    .post((req, res, next) => {
        res.send("posting the comments")
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.send("putting all the commments")
    })
    .delete((req, res, next) => {
        res.send("deleting all the commments")
    })
movieRouter.route("/:movieId/comments/:commentId")
    .get((req, res, next) => {
        res.send("getting the comment")
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.send("getting the comment")
    })
    .put((req, res, next) => {
        res.send("getting the comment")
    })
    .delete((req, res, next) => {
        res.send("getting the comment")
    })
module.exports = movieRouter;