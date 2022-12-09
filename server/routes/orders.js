module.exports = (router, app, order) => {
  router.get("/", order.getAllOrders);
  router.get("/new", order.getNewRequests);
  router.get("/:id", order.getOrderDetails);

  return router;
};

// router.get("/:id", async (req, res) => {
//   const sql = `select o.id, u.discord_name, k.grade, k.name, os.description, o.date_requested, k.hlj_ref, o.notes, u.email, u.phone_number from orders o
//   left join kits k on k.id = o.product_id
//   left join users u on u.id = o.user_id
//   left join order_statuses os on os.id = o.status
//   where o.id = $1
//   order BY u.discord_name DESC`;
//   const resp = await db.query(sql, [req.params.id]);
//   res.send(resp.rows[0]);
// });

// module.exports = router;
