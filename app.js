var express       = require("express"),
    path          = require("path"),
    favicon       = require("serve-favicon"),
    logger        = require("morgan"),
    cookieParser  = require("cookie-parser"),
    bodyParser    = require("body-parser"),
    override      = require("method-override");

var app = express();

_configMongoDB();
_configPassport();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(_userToTemplate);
app.use(override("_method"));

_configRoutes();
_configErrorHandlers();

module.exports = app;

//-----------------------------------

function _configPassport() {
  var passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      User          = require("./models/user");
  
  app.use(require("express-session")({
    secret: "Random words of safety!",
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

function _configErrorHandlers() {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  
  // development error handler
  // will print stacktrace
  if(app.get("env") === "development") {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });
}

function _configRoutes() {
  var r_home        = require("./routes/index"),
      r_campgrounds = require("./routes/campgrounds"),
      r_comments    = require("./routes/comments");

  app.use("/", r_home);
  app.use("/campgrounds", r_campgrounds);
  app.use("/campgrounds/:id/comments", r_comments);
}

function _configMongoDB() {
  var mongoose = require("mongoose"),
      seedDB   = require("./seeds");

  mongoose.connect("mongodb://localhost/yelp_camp");
  seedDB();
}

//middlewares
function _userToTemplate(req, res, next) {
  var user = req.user;
  res.locals.currentUser = user ? {username: user.username, id: user._id} : null;
  next();
}
