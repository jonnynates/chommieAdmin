module.exports = (router, app, kit) => {
  router.get("/", app.oauth.authorise(), kit.getAllKits);
  router.post("/new", app.oauth.authorise(), kit.createKit);
  router.get("/product_lines", app.oauth.authorise(), kit.getAllProductLines);
  router.get("/product_lines/:product_line_name", app.oauth.authorise(), kit.getKitByProductLine);

  return router;
};
