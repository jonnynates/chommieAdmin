module.exports = (router, app, order) => {
  router.get("/", app.oauth.authorise(), order.getAllOrders);
  // router.get("/new", app.oauth.authorise(), order.getNewRequests);
  router.get("/:status", app.oauth.authorise(), order.getRequestsForStatus);
  router.get("/:id", app.oauth.authorise(), order.getOrderDetails);

  return router;
};

