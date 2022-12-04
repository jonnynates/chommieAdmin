var ordersRouter = require('./orders');
var testRouter = require("./test");
 
module.exports = (app) => {
  app.use('/orders', ordersRouter)
  app.use('/test', testRouter)
}