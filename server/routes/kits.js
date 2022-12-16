module.exports = (router, app, kit) => {
  router.get("/", app.oauth.authorise(), kit.getAllKits);

  return router;
};
