let userDB;

module.exports = (injectedOrderDB) => {
  userDB = injectedOrderDB;

  return {
    getAllUsers,
  };
};

function getAllUsers(req, res) {
  userDB.getAllUsers((response) => {
    res.send(response);
  });
}
