let kitDB;

module.exports = (injectedOrderDB) => {
  kitDB = injectedOrderDB;

  return {
    getAllKits,
  };
};

function getAllKits(req, res) {
  kitDB.getAllKits((response) => {
    res.send(response.results.rows);
  });
}
