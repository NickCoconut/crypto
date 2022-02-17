const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const logger = require("morgan");
const db = require("./db");
const bodyParser = require("body-parser");
const router = express.Router();
const helpers = require("./helpers/db_helpers");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

var cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["key1","key2"],
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

var expressSession = require("express-session");
app.use(
  expressSession({
    secret: "your secret",
    saveUninitialized: true,
    resave: false,
  })
);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
usersRouter(router, db, helpers);
app.use("/api/users", router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
