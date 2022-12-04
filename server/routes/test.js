var express = require("express");
var router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const sql = `Select * from users`;
  const resp = await db.query(sql, []);
  console.log("hello");
  console.log(resp.rows);
  res.send(resp.rows);
});

module.exports = router;
