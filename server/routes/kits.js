module.exports = (router, app, kit) => {
  router.get("/", app.oauth.authorise(), kit.getAllKits);
  router.get("/grades", app.oauth.authorise(), kit.getAllGrades);
  router.get("/grades/:grade", app.oauth.authorise(), kit.getKitByGrade);

  return router;
};
