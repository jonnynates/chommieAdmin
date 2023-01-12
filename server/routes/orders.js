module.exports = (router, app, order) => {
  router.get("/", app.oauth.authorise(), order.getAllOrders);
  router.get("/status/:status", app.oauth.authorise(), order.getRequestsForStatus);
  router.get("/:id", app.oauth.authorise(), order.getOrderDetails);
  router.delete("/:id", app.oauth.authorise(), order.deleteOrder);
  router.patch("/:id", app.oauth.authorise(), order.updateOrder);
  router.get("/:id/history", app.oauth.authorise(), order.getOrderAuditHistory);
  router.post("/new", app.oauth.authorise(), order.createNewOrder);

  return router;
};
