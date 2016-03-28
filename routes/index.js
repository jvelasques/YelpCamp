var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/user");


/* GET home page. */
router
  //Home Page
  .get("/", function(req, res, next) {
    res.render("index", {title: "YelpCamp"});
  })

  // Form to register
  .get("/register", function(req, res, next) {
    res.render("register");
  })

  // Do register
  .post("/register", function(req, res, next) {
    _doRegister(req, res);
  })
  
  // Form to login
  .get("/login", function(req, res, next) {
    res.render("login");
  })
  
  // Do login
  .post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(req, res, next) {
    _doLogin(req, res);
  })

  //Do Logout
  .get("/logout", function(req, res, next) {
    req.logout();
    res.redirect("/campgrounds");
  });

module.exports = router;

function _doRegister(req, res) {
  var _user = new User({username: req.body.username});
  var _pass = req.body.password;

  User.register(_user, _pass, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }

    passport.authenticate("local")(req, res, function() {
      res.redirect("/campgrounds");
    });
  });
}

function _doLogin(req, res) {
  //logic in middleware
}