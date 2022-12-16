let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    getAllOrders,
    getRequestsForStatusId,
    getOrderDetails,
  };
};

function getAllOrders(cbFunc) {
  const sql = `select o.id, u.discord_name, k.grade, k.name, os.description, o.date_requested, k.hlj_ref from orders o
    left join kits k on k.id = o.product_id
    left join users u on u.id = o.user_id
    left join order_statuses os on os.id = o.status
    order BY u.discord_name DESC`;

  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getRequestsForStatusId(status_id, cbFunc) {
  const sql = `select o.id, u.discord_name, k.grade, k.name, os.description, o.date_requested, k.hlj_ref from orders o
      left join kits k on k.id = o.product_id
      left join users u on u.id = o.user_id
      left join order_statuses os on os.id = o.status
      where o.status = $1
      order BY u.discord_name DESC`;

  pgPool.query(sql, [status_id], (response) => {
    cbFunc(response);
  });
}

function getOrderDetails(order_id, cbFunc) {
  const sql = `select o.id, u.discord_name, k.grade, k.name, os.description, o.date_requested, k.hlj_ref, o.notes, u.email, u.phone_number from orders o
  left join kits k on k.id = o.product_id
  left join users u on u.id = o.user_id
  left join order_statuses os on os.id = o.status
  where o.id = $1
  order BY u.discord_name DESC`;

  pgPool.query(sql, [order_id], (response) => {
    cbFunc(response);
  });
}
