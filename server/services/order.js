const order_statuses = require("../db/order_statuses");

let orderDB;

module.exports = (injectedOrderDB) => {
  orderDB = injectedOrderDB;

  return {
    getAllOrders,
    getRequestsForStatus,
    getOrderDetails,
    getOrderAuditHistory,
    deleteOrder,
    createNewOrder,
    updateOrder,
    getKitOrderQueue,
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
      res.status(500).json({
        message: `Something went wrong when deleting order ${req.params.id}`,
        error: error,
      });
      return;
    }

    orderDB.createAuditHistory(
      req.params.id,
      order_statuses.REMOVED,
      req.user.id,
      (response) => {
        const error = response.error;
        if (error !== undefined) {
          res.status(500).json({
            message: `Something went when creating an audit history for order ${req.params.id}`,
            error: error,
          });
          return;
        }

        res.status(200).json({
          message: "Success",
        });
      }
    );
  });
}

function createNewOrder(req, res) {
  orderDB.createNewOrder(
    req.body.user_id,
    req.body.product_id,
    req.body.notes,
    (response) => {
      const error = response.error;
      if (error !== undefined) {
        res.status(500).json({
          message: `Something went wrong when creating new order`,
          error: error,
        });
        return;
      }
      const order_id = response.results.rows[0].id;

      orderDB.createAuditHistory(
        order_id,
        order_statuses.NEW_REQUEST,
        req.user.id,
        (response) => {
          const error = response.error;
          if (error !== undefined) {
            res.status(500).json({
              message: `Something went when creating an audit history for new order`,
              error: error,
            });
            return;
          }

          res.status(200).json({
            message: "Success",
          });
        }
      );
    }
  );
}

async function updateOrder(req, res) {
  try {
    const order_id = req.params.id;
    orderDB.getOrderDetails(order_id, (response) => {
      const oldOrder = response.results.rows[0];

      orderDB.updateOrder(order_id, req.body.status_id, req.body.notes, () => {
        if (req.body.status_id !== oldOrder.status_id) {
          orderDB.createAuditHistory(
            order_id,
            req.body.status_id,
            req.user.id,
            () => {}
          );
        }
        res.status(200).json({
          message: "Success",
        });
      });
    });
  } catch (e) {
    res.status(500).json({
      message: `Something went wrong when trying to update an order`,
      error: e,
    });
    return;
  }
}

function getKitOrderQueue(req, res) {
  orderDB.getKitOrderQueue(req.params.id, (response) => {
    res.send(response.results.rows);
  });
}
