module.exports = (router, app, user) => {
  router.get("/", app.oauth.authorise(), user.getAllUsers);

  return router;
};

