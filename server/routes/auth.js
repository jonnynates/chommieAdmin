module.exports = (router, app, authenticator, tokenService) => {
  router.post("/register", authenticator.registerUser);
  router.post("/login", app.oauth.grant(), authenticator.login);
  router.post("/user", (req, res) => {
    tokenService.getUser(req.body.username, req.body.password, (_, user) => {
      const returnUser = {
        id: user.id,
        discord_name: user.discord_name,
      };
      res.send(returnUser);
    });
  });

  return router;
};
