var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const sql = `select o.id, u.discord_name, k.grade, k.name, os.description, o.date_requested from orders o
  left join kits k on k.id = o.product_id
  left join users u on u.id = o.user_id
  left join order_statuses os on os.id = o.status
  order BY u.discord_name DESC`;
  const resp = await db.query(sql, []);
  res.send(resp.rows);
});

module.exports = router;
