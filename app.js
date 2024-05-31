var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("jsonwebtoken");
var cors = require("cors");
global.moment = require("moment"); //to perform date related operations
global.moment_timezone = require("moment-timezone"); //gives flexibility to use time zone
require("./util/functions");
require("./util/constants");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var options = {
  //Initialization Options
  //promiseLib: promise
};

global.pgp = require("pg-promise")(options); //promise module for pg
var connectionString = "postgres://postgres:postgres@localhost:5432/sarthi_new";
// var connectionString = 'postgres://postgres:postgres@localhost:5432/digitalsarthi';
global.db = pgp(connectionString);

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var ottRouter = require("./routes/ott");

app.use(cors());
var authChecker = function (req, res, next) {
  console.log(req.path);
  if (
    req.path == "/authenticate" ||
    req.path == "/generate_otp" ||
    req.path == "/verify_otp" ||
    req.path == "/user/type" ||
    req.path == "/ott/content_type/" ||
    req.path == "/ott/all_lang" ||
    req.path == "/ott/all_genre" ||
    req.path == "/ott/all_poster" ||
    req.path == "/ott/ott_app" ||
    req.path == "/ott/all_content_android" ||
    req.path == "/ott/content_by_views" ||
    req.path == "/ott/genre_by_views" ||
    req.path == "/ott/get_dashboard_status" ||
    req.path.indexOf("/uploads/language") != -1 ||
    req.path.indexOf("/uploads/genre") != -1 ||
    req.path.indexOf("/uploads/ott_image") != -1 ||
    req.path.indexOf("/uploads/content") != -1 ||
    req.path.indexOf("/ott/content_by_type") != -1 ||
    req.path.indexOf("/ott/content_by_genre") != -1 ||
    req.path.indexOf("/ott/content_by_language") != -1 ||
    req.path.indexOf("/ott/content_by_language_and_genre") != -1 ||
    req.path.indexOf("/uploads/") != -1 ||
    req.path == "/ott/content_search_by_name" ||
    req.path == "/ott/ott_app_android" ||
    req.path == "/ott/ott_app_count" ||
    req.path == "/ott/all_genre_android" ||
    req.path == "/ott/ott_app_trending_android" ||
    req.path == "/ott/add_channel" ||
    req.path == "/ott/all_singer" ||
    req.path == "/ott/add_poster" ||
    req.path == "/ott/all_content" ||
    req.path.indexOf("/ott/all_genre/") != -1 ||
    req.path.indexOf("/uploads/type/") !== -1 ||
    req.path.indexOf("/ott/content_by_type_test/") !== -1 ||
    req.path.indexOf("/ott/update_singer/") !== -1
  ) {
    next();
  } else {
    var requestedPath = req.path + ""; //convert into string;
    //validate token before entering routes
    var token = req.headers["x_access_token"];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
          console.log(err);
          res
            .status(401)
            .json({ success: false, msg: "Failed to authenticate token." });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(401).send({
        success: false,
        msg: "No token provided.",
      });
    }
  }
};
app.use(authChecker);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/ott", ottRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get("/get_image/%7B%7B1%7D%7D1", (req, res) => {
  try {
    const img = new Image();
    img.addEventListener("load", function () {
      img.src = URL.createObjectURL(
        "./public/images/NewImage/newImage-1662449731.jpg"
      );
      res.status(200).json({ success: true, data: img });
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "error" });
  }
});

// console.log(encrypt('dlgtpl@123'))
// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// process.on('uncaughtException', function (err) {
//   console.error(err);
//   console.log("Node NOT Exiting...");
// });
// process.on('unhandledRejection', (error, promise) => {
//   console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
//   console.log(' The error was: ', error );
// });
module.exports = app;
