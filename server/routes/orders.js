module.exports = (router, app, order) => {
  router.get("/", app.oauth.authorise(), order.getAllOrders);
  // router.get("/new", app.oauth.authorise(), order.getNewRequests);
  router.get("/status/:status", app.oauth.authorise(), order.getRequestsForStatus);
  router.get("/:id", app.oauth.authorise(), order.getOrderDetails);
  router.delete("/:id", app.oauth.authorise(), order.deleteOrder);
  router.get("/:id/history", app.oauth.authorise(), order.getOrderAuditHistory);
  

  return router;
};

