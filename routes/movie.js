const express = require("express")
const movieRouter = express.Router()
var Movies = require("../models/movie")
movieRouter.route("/")
    .get((req, res, next) => {
        Movies.find().then((moviees) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(moviees)
        }).catch((err) => next(err))
        
    })
    .post((req, res, next) => {
        Movies.create(req.body).then((movie) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(movie)
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
        Movies.findById(req.params.movieId).then((movie) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(movie)
        })
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.send("post operation is not supported")
    })
    .put((req, res, next) => {
        Movies.findByIdAndUpdate(req.params.movieId, { $set: req.body }, { new: true }).then((movie) => {
            res.statusCode = 200
            res.setHeader("content-type", "application/json")
            res.json(movie)
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
        Movies.findById(req.params.movieId).then((movie) => {
            if (movie) {
                res.statusCode = 200
                res.setHeader("content-type", "application/json")
                res.json(movie.comment)
            }
            else {
                var error = new Error("movie with " + req.params.movieId + "not found")
                res.statusCode = 404
                res.send(error)
            }
        })
    })
    .post((req, res, next) => {
        Movies.findById(req.params.movieId)
            .then((movie) => {
                if (movie) {
                    movie.comment.push(req.body)
                    movie.save().then((movie) => {
                        res.statusCode = 200
                        res.setHeader("content-type", "application/json")
                        res.json(movie)
                    }).catch((err) => next(err))
                } else {
                    var error = new Error("movie with " + req.params.movieId + "not found")
                    res.statusCode = 404
                    res.send(error)
                }
            })
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.send("put operation is not supported")
    })
    .delete((req, res, next) => {
        Movies.findById(req.params.movieId)
            .then((movie) => {
                if (movie && movie.comment) {
                    movie.comment.splice(0, movie.comment.length)
                    movie.save().then((movie) => {
                        res.statusCode = 200
                        res.setHeader("content-type", "application/json")
                        res.json({sucess: true, data: movie})
                    })
                } else {
                    var error = new Error("movie with " + req.params.movieId + "not found")
                    res.statusCode = 404
                    res.send(error)
                } 
            })
    })
movieRouter.route("/:movieId/comments/:commentId")
    .get((req, res, next) => {
        Movies.findById(req.params.movieId)
            .then((movie) => {
                if (movie && movie.comment) {
                    var comment = movie.comment.filter((com)=> com._id == req.params.commentId)
                    res.statusCode = 200
                    res.setHeader("content-type", "application/json")
                    res.json(comment)
                } else if (!movie) {
                    var error = new Error("movie with " + req.params.movieId + "not found")
                    res.statusCode = 404
                    next(error)
                } else {
                    error = new Error("movie with " + req.params.commentId + "not found")
                    error.status = 404
                    next(err)
                }
            })
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.send("post operation is not supported")
    })
    .put((req, res, next) => {
        Movies.findById(req.params.movieId)
            .then((movie) => {
                if (movie && movie.comment) {
                    if (req.body.rating) {
                        movie.comment.id(req.params.commentId).rating = req.body.rating
                    }
                    if (req.body.comment) {
                        movie.comment.id(req.params.commentId).comment = req.body.comment
                    }
                    if (req.body.author) {
                        movie.comment.id(req.params.commentId).author = req.body.author
                    }
                    movie.save().then((movie) => {
                        res.statusCode = 200
                        res.setHeader("content-type", "application/json")
                        res.json(movie.comment)
                    })
                } else if (!movie) {
                    var error = new Error("movie with " + req.params.movieId + "not found")
                    res.statusCode = 404
                    next(error)
                } else {
                    error = new Error("movie with " + req.params.commentId + "not found")
                    error.status = 404
                    next(err)
                }
            }).catch((err) => next(err))
    })
    .delete((req, res, next) => {
        Movies.findById(req.params.movieId)
            .then((movie) => {
                if (movie && movie.comment) {
                    movie.comment.id(req.params.commentId).remove()
                    movie.save().then((movie) => {
                        res.statusCode = 200
                        res.setHeader("content-type", "application/json")
                        res.json({success: true, data: movie.comment})
                    })
                }
                else if (!movie) {
                    var error = new Error("movie with " + req.params.movieId + "not found")
                    res.statusCode = 404
                    next(error)
                } else {
                    error = new Error("movie with " + req.params.commentId + "not found")
                    error.status = 404
                    next(err)
                }
        }).catch((err) => next(err))
    })
module.exports = movieRouter;