module.exports = (router, app, user) => {
  router.get("/", app.oauth.authorise(), user.getAllUsers);
  router.get("/:id", app.oauth.authorise(), user.getUserById);
  router.patch("/:id", app.oauth.authorise(), user.updateUser);
  router.post("/new", app.oauth.authorise(), user.createNewUser);

  return router;
};
