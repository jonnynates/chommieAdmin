let kitDB;

module.exports = (injectedOrderDB) => {
  kitDB = injectedOrderDB;

  return {
    getAllKits,
    getAllProductLines,
    getKitByProductLine,
    createKit,
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
  kitDB.getKitByProductLine(req.params.product_line_name, (response) => {
    res.send(response.results.rows);
  });
}

function createKit(req, res) {
  try {
    kitDB.createKit(
      req.body.name,
      req.body.product_line,
      req.body.premium_bandai,
      req.body.price,
      req.body.sku_code,
      () => {
        res.status(200).json({
          message: "Success",
        });
      }
    );
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong when trying to create a kit`,
      error: e,
    });
  }
}
