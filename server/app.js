var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// Database imports
const pgPool = require("./db/index");
const tokenDB = require("./db/tokenDB")(pgPool);
const userDB = require("./db/userDB")(pgPool);
const orderDB = require("./db/orderDB")(pgPool);
const kitDB = require("./db/kitDB")(pgPool);
// OAuth imports
const oAuthService = require("./auth/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");

const app = express();
app.oauth = oAuth2Server({
  model: oAuthService,
  grants: ["password"],
  debug: true,
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "..", "front", "build")));
app.use(express.static("public"));

// Auth and routes
const authenticator = require("./auth/authenticator")(userDB);
const order = require("./services/order")(orderDB);
const kit = require("./services/kit")(kitDB);
const user = require("./services/user")(userDB);
const authRoutes = require("./routes/auth")(
  express.Router(),
  app,
  authenticator,
  oAuthService
);
const orderRoutes = require("./routes/orders")(express.Router(), app, order);
const kitRoutes = require("./routes/kits")(express.Router(), app, kit);
const userRoutes = require("./routes/users")(express.Router(), app, user);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/kits", kitRoutes);
app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
