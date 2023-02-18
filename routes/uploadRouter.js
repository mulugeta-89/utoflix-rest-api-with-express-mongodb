const express = require("express")
const multer = require("multer");
const path = require("path")
const authenticate = require("../authenticate");
const Movies = require("../models/movie");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const imageFileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(null, true);
  }
    else if (file.originalname.match(/\.(mp4|avi|mov|wmv|mkv)$/)) {
    cb(null, true);
  }
    else {
    cb(new Error('File type not allowed!'), false);
  }
}
const upload = multer({storage: storage, fileFilter: imageFileFilter})
const uploadRouter = express.Router()
uploadRouter
  .route("/")
  .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("GET operation is not supported on the " + "/uploadRouter");
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
      upload.fields([{ name: 'image', maxCount: 1 }, {name: 'video', maxCount: 1}]),
      (req, res, next) => {
      Movies.create({
        title: req.body.title,
        description: req.body.description,
        director: req.body.director,
          label: req.body.label,
          photo: req.files['image'][0].originalname,
            video: req.files['video'][0].originalname,
          releaseDate: req.body.releaseDate,
          price: req.body.price,
        featured: req.body.featured

      }).then((dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({Success: true, dish});
      })
    }
  )
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader("Content-Type", "text/plain");
    res.end("PUT operation is not supported on the " + "/uploadRouter");
  })
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403
        res.setHeader("Content-Type", "text/plain")
        res.end("DELETE operation is not supported on the " + "/uploadRouter")
  })
    
module.exports = uploadRouter
