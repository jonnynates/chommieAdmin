let orderDB;

module.exports = (injectedOrderDB) => {
  orderDB = injectedOrderDB;

  return {
    getAllOrders,
    // getNewRequests,
    getRequestsForStatus,
    getOrderDetails,
  };
};

function getAllOrders(req, res) {
  orderDB.getAllOrders((response) => {
    res.send(response.results.rows);
  });
}

function getRequestsForStatus(req, res) {
  orderDB.getRequestsForStatusId(req.params.status, (response) => {
    res.send(response.results.rows);
  });
}

function getOrderDetails(req, res) {
  orderDB.getOrderDetails(req.params.id, (response) => {
    res.send(response.results.rows[0]);
  });
}
