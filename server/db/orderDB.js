const order_statuses = require("./order_statuses");

let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    getAllOrders,
    getRequestsForStatusId,
    getOrderDetails,
    getOrderAuditHistory,
    softDeleteOrder,
    createAuditHistory,
    createNewOrder,
    updateOrder,
  };
};

function getAllOrders(cbFunc) {
  const sql = `select o.id, u.discord_name, pl.product_line_name, k.name, os.description, o.date_requested, k.hlj_ref from orders o
    left join kits k on k.id = o.product_id
    left join users u on u.id = o.user_id
    left join order_statuses os on os.id = o.status
    left join product_lines pl on pl.id = k.product_line
    where o.status != 9
    order BY o.date_requested DESC`;

  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getRequestsForStatusId(status_id, cbFunc) {
  const sql = `select o.id, u.discord_name, pl.product_line_name, k.name, os.description, o.date_requested, k.hlj_ref from orders o
      left join kits k on k.id = o.product_id
      left join users u on u.id = o.user_id
      left join order_statuses os on os.id = o.status
      left join product_lines pl on pl.id = k.product_line
      where o.status = $1
      order BY o.date_requested DESC`;

  pgPool.query(sql, [status_id], (response) => {
    cbFunc(response);
  });
}

function getOrderDetails(order_id, cbFunc) {
  const sql = `select o.id, u.discord_name, pl.product_line_name, k.name, os.id as status_id, os.description, o.date_requested, k.hlj_ref, o.notes, u.email, u.phone_number from orders o
  left join kits k on k.id = o.product_id
  left join users u on u.id = o.user_id
  left join order_statuses os on os.id = o.status
  left join product_lines pl on pl.id = k.product_line
  where o.id = $1
  order BY u.discord_name DESC`;

  pgPool.query(sql, [order_id], (response) => {
    cbFunc(response);
  });
}

function getOrderAuditHistory(order_id, cbFunc) {
  const sql = `select ah.id, u.discord_name, os.description, ah.performed_at from audit_history ah
  left join users u on u.id = ah.initiator_id
  left join order_statuses os on os.id = ah.status_id
  where ah.order_id = $1
  order BY ah.performed_at DESC`;

  pgPool.query(sql, [order_id], (response) => {
    cbFunc(response);
  });
}

function softDeleteOrder(order_id, cbFunc) {
  const sql = `UPDATE orders SET date_removed = NOW(), status = 9 WHERE id = $1`;

  pgPool.query(sql, [order_id], (response) => {
    cbFunc(response);
  });
}

function createAuditHistory(order_id, status_id, initiator_id, cbFunc) {
  const sql = `INSERT INTO audit_history (order_id, status_id, performed_at, initiator_id)
  VALUES ($1, $2, NOW(), $3)`;

  pgPool.query(sql, [order_id, status_id, initiator_id], (response) => {
    cbFunc(response);
  });
}

function createNewOrder(user_id, product_id, notes, cbFunc) {
  const sql = `INSERT INTO orders (user_id, product_id, date_requested, status, notes) VALUES ($1, $2, NOW(), $3, $4) RETURNING id`;

  pgPool.query(
    sql,
    [user_id, product_id, order_statuses.NEW_REQUEST, notes],
    (response) => {
      cbFunc(response);
    }
  );
}

function updateOrder(order_id, status_id, notes, cbFunc) {
  const sql = `UPDATE orders SET status = $1, notes = $2 WHERE id = $3`;

  pgPool.query(sql, [status_id, notes, order_id], (response) => {
    cbFunc(response);
  });
}
