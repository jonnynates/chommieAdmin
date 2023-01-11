let userDB;

module.exports = (injectedOrderDB) => {
  userDB = injectedOrderDB;

  return {
    getAllUsers,
    createNewUser,
  };
};

function getAllUsers(req, res) {
  userDB.getAllUsers((response) => {
    res.send(response);
  });
}

function createNewUser(req, res) {
  userDB.createNewUser(req.body, (response) => {
    console.log(response.error);
    res.send(response);
  });
}
