const db = require("../db");

module.exports = () => {
  return {
    saveAccessToken,
    getUserIDFromBearerToken,
  };
};

async function saveAccessToken(accessToken, userID) {
  const getUserQuery = `INSERT INTO access_tokens (access_token, user_id) VALUES ($1, $2);`;

  await db.query(getUserQuery, [accessToken, userID]);
}

async function getUserIDFromBearerToken(bearerToken) {
  const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = $1';`;

  const resp = await db.query(getUserIDQuery, [bearerToken]);
  return resp.results && resp.results.rowCount == 1
    ? resp.results.rows[0].user_id
    : null;
}
