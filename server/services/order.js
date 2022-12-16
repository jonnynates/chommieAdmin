let orderDB;

module.exports = (injectedOrderDB) => {
  orderDB = injectedOrderDB;

  return {
    getAllOrders,
    getNewRequests,
    getOrderDetails,
  };
};

function getAllOrders(req, res) {
  orderDB.getAllOrders((response) => {
    res.send(response.results.rows);
  });
}

function getNewRequests(req, res) {
  orderDB.getNewRequests((response) => {
    res.send(response.results.rows);
  });
}

function getOrderDetails(req, res) {
  orderDB.getOrderDetails(req.params.id, (response) => {
    res.send(response.results.rows[0]);
  });
}
