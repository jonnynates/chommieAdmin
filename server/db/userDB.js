const db = require("../db");

module.exports = () => {
  return {
    register,
    getUser,
    isValidUser,
  };
};

var crypto = require("crypto");

async function register(username, password) {
  var shaPass = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const query = `INSERT INTO users (discord_name, password) VALUES ($1, $2) RETURNING id`;

  const resp = await db.query(query, [username, shaPass]);
  return resp;
}

async function getUser(username, password) {
  var shaPass = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const getUserQuery = `SELECT * FROM users WHERE discord_name = $1 AND password = $2`;

  const resp = await db.query(getUserQuery, [username, shaPass]);
  return resp && resp.rowCount === 1 ? resp.rows[0] : null;
}

async function isValidUser(username) {
  const query = `SELECT * FROM users WHERE discord_name = $1`;

  const resp = await db.query(query, [username]);
  return resp.results ? !(resp.results.rowCount > 0) : null;
}
