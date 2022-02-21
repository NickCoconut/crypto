const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const logger = require("morgan");
const db = require("./db");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const session = require("express-session")
const router = express.Router();

const cors = require("cors");

const usersRouter = require("./routes/users");
const cryptosRouter = require('./routes/cryptos');
const newsRouter = require('./routes/news');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  key: "user_id",
  secret: "cryptos",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 24,
  },
})
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use('/users', usersRouter(db))
app.use("/cryptos", cryptosRouter(db));
app.use("/news", newsRouter(db));

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