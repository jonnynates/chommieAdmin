let userDB;

module.exports = (injectedOrderDB) => {
  userDB = injectedOrderDB;

  return {
    getUserById,
    getAllUsers,
    createNewUser,
    updateUser,
  };
};

function getUserById(req, res) {
  userDB.getUserById(req.params.id, (response) => {
    res.send(response);
  });
}

function getAllUsers(req, res) {
  userDB.getAllUsers((response) => {
    res.send(response);
  });
}

function createNewUser(req, res) {
  userDB.createNewUser(req.body, (response) => {
    res.send(response);
  });
}

function updateUser(req, res) {
  userDB.updateUser(req.params.id, req.body, (response) => {
    res.send(response);
  });
}
