let kitDB;

module.exports = (injectedOrderDB) => {
  kitDB = injectedOrderDB;

  return {
    getAllKits,
    getAllGrades,
    getKitByGrade,
  };
};

function getAllKits(req, res) {
  kitDB.getAllKits((response) => {
    res.send(response.results.rows);
  });
}

function getAllGrades(req, res) {
  kitDB.getAllGrades((response) => {
    res.send(response.results.rows);
  });
}

function getKitByGrade(req, res) {
  kitDB.getKitByGrade(req.params.grade, (response) => {
    res.send(response.results.rows);
  });
}
