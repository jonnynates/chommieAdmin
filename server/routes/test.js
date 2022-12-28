var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const sql = `Select * from users`;
  const resp = await db.query(sql, []);
  res.send(resp.rows);
});

module.exports = router;
