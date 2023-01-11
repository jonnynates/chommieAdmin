module.exports = (router, app, user) => {
  router.get("/", app.oauth.authorise(), user.getAllUsers);
  router.post("/new", app.oauth.authorise(), user.createNewUser);

  return router;
};
