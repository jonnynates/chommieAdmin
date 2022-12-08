const tokenDB = require("../db/tokenDB");
const userDB = require("../db/userDB");

module.exports = () => {
  return {
    getClient,
    saveAccessToken,
    getUser,
    grantTypeAllowed,
    getAccessToken,
  };
};

function getClient(clientID, clientSecret) {
  const client = {
    clientID,
    clientSecret,
    grants: null,
    redirectUris: null,
  };

  return false, client;
}

// function grantTypeAllowed(clientID, grantType) {
function grantTypeAllowed() {
  return false, true;
}

function getUser(username, password) {
  return userDB.getUser(username, password);
}

function saveAccessToken(accessToken, clientID, expires, user) {
  return tokenDB.saveAccessToken(accessToken, user.id);
}

function getAccessToken(bearerToken) {
  const userID = tokenDB.getUserIDFromBearerToken(bearerToken);
  const accessToken = {
    user: {
      id: userID,
    },
    expires: null,
  };

  return accessToken;
}
