var express = require("express");
const authenticator = require("../auth/authenticator");
var router = express.Router();

module.exports = (app) => {
  router.post("/register", authenticator.registerUser);
  router.post("/login", app.oauth.grant(), authenticator.login);
  
  return router;
};
