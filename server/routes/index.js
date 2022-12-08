// const app = require("../app");
var ordersRouter = require("./orders");
var authRouter = require("./auth");
var testRouter = require("./test");

module.exports = (app) => {
  app.use("/orders", ordersRouter);
  app.use("/test", testRouter);
  app.use("/auth", authRouter);
};
