var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var httpStatus = require("http-status-codes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (req, res, next) => {
  res.send("PING!! Hello World!");
});

app.post("/ghn/webhook/status", (req, res, next) => {
  try {
    res.status(200).json("Success");
  } catch (err) {
    console.log(err);
    res.status(503).json({
      error: "Service GHN Error",
      message: err.message,
    });
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);

  const status = err.status || 500;
  const message = httpStatus.getReasonPhrase(status);

  // render the error page
  res.status(status).json({
    message,
  });
});

module.exports = app;
