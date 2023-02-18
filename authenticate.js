const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");

const Users = require("./models/user");
const secretKey = "12345-67890-09876-54321"
exports.local = passport.use(new localStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, secretKey, { expiresIn: 360000 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    Users.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin === true) {
    next()
  }
  else {
    res.statusCode = 403
    res.setHeader("Content-Type", "text/plain")
    res.end("You are not allowed to do this operation")
  }
  // Users.find({}).then((user) => {
  //   if (req.user.admin) {
  //     next();
  //   } else {
  //     res.statusCode = 403;
  //     res.setHeader("Content-Type", "text/plain");
  //     res.end("You are not authorized to perform this operation");
  //   }
  // });
}
