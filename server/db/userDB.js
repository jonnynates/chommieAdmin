let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    register,
    getUser,
    getAllUsers,
    isValidUser,
    createNewUser,
  };
};

var crypto = require("crypto");

function register(username, password, cbFunc) {
  var shaPass = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const query = `INSERT INTO users (discord_name, password) VALUES ($1, $2)`;

  pgPool.query(query, [username, shaPass], cbFunc);
}

function getUser(username, password, cbFunc) {
  var shaPass = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const getUserQuery = `SELECT * FROM users WHERE discord_name = $1 AND password = $2`;

  pgPool.query(getUserQuery, [username, shaPass], (response) => {
    cbFunc(
      false,
      response.results && response.results.rowCount === 1
        ? response.results.rows[0]
        : null
    );
  });
}

function getAllUsers(cbFunc) {
  const getUserQuery = `SELECT id, discord_name, discord_id, first_name, last_name, email, phone_number FROM users WHERE discord_name != 'ChommieBot'`;

  pgPool.query(getUserQuery, [], (response) => {
    cbFunc(response.results.rows);
  });
}

function isValidUser(username, cbFunc) {
  const query = `SELECT * FROM users WHERE discord_name = $1`;

  const checkUsrcbFunc = (response) => {
    const isValidUser = response.results
      ? !(response.results.rowCount > 0)
      : null;

    cbFunc(response.error, isValidUser);
  };

  pgPool.query(query, [username], checkUsrcbFunc);
}

function createNewUser(user, cbFunc) {
  const query = `INSERT INTO users (discord_name, discord_id, first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4, $5, $6)`;

  pgPool.query(
    query,
    [
      user.discord_name,
      parseInt(user.discord_id) || null,
      user.first_name,
      user.last_name,
      user.email,
      user.phone_number,
    ],
    cbFunc
  );
}
