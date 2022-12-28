let orderDB;

module.exports = (injectedOrderDB) => {
  orderDB = injectedOrderDB;

  return {
    getAllOrders,
    // getNewRequests,
    getRequestsForStatus,
    getOrderDetails,
    getOrderAuditHistory,
    deleteOrder,
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

function getOrderAuditHistory(req, res) {
  orderDB.getOrderAuditHistory(req.params.id, (response) => {
    res.send(response.results.rows);
  });
}

function deleteOrder(req, res) {
  orderDB.softDeleteOrder(req.params.id, (response) => {
    const error = response.error;
    if (error !== undefined) {
      res.status(400).json({
        message: `Something went wrong when deleting order ${req.params.id}`,
        error: error,
      });
      return;
    }

    orderDB.createAuditHistory(req.params.id, 9, req.user.id, (response) => {
      const error = response.error;
      if (error !== undefined) {
        res.status(400).json({
          message: `Something went when creating an audit history for order ${req.params.id}`,
          error: error,
        });
        return;
      }

      res.status(200).json({
        message: "Success",
      });
    });
  });
}
