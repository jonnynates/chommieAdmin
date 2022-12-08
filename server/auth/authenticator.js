const userDB = require("../db/userDB");

module.exports = () => {
  return {
    registerUser,
    login,
  };
};

async function registerUser(req, res) {
  const validUser = userDB.isValidUser(req.body.username);
  if (!validUser) {
    const message = "This user already exists";
    sendResponse(res, message, 400);

    return;
  }

  const registeredUserID = userDB.register(
    req.body.username,
    req.body.password
  );

  sendResponse(
    res,
    registeredUserID != undefined
      ? "Successfuly registered user"
      : "Error while registering user",
    500
  );
}

function login(query, res) {}

function sendResponse(res, message, error) {
  res.status(error !== undefined ? 400 : 200).json({
    message: message,
    error: error,
  });
}
