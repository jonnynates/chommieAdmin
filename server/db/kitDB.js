let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    getAllKits,
  };
};

function getAllKits(cbFunc) {
  const sql = `select * from kits`;
  console.log("sql");
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}
