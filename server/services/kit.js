let kitDB;

module.exports = (injectedOrderDB) => {
  kitDB = injectedOrderDB;

  return {
    getAllKits,
    getAllProductLines,
    getKitByProductLine,
  };
};

function getAllKits(req, res) {
  kitDB.getAllKits((response) => {
    res.send(response.results.rows);
  });
}

function getAllProductLines(req, res) {
  kitDB.getAllProductLines((response) => {
    res.send(response.results.rows);
  });
}

function getKitByProductLine(req, res) {
  console.log("req", req.params.product_line_name);
  kitDB.getKitByProductLine(req.params.product_line_name, (response) => {
    res.send(response.results.rows);
  });
}
