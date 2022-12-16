module.exports = (router, app, authenticator, tokenService) => {
  router.post("/register", authenticator.registerUser);
  router.post("/login", app.oauth.grant(), authenticator.login);
  router.get("/user", (req, res) => {
    tokenService.getUser(req.body.username, req.body.password, (_, user) => {
      res.send(user);
    });
  });

  return router;
};
