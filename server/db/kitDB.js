let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    getAllKits,
    getAllGrades,
    getKitByGrade,
  };
};

function getAllKits(cbFunc) {
  const sql = `select * from kits`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getAllGrades(cbFunc) {
  const sql = `select grade from kits
  GROUP BY grade`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getKitByGrade(grade, cbFunc) {
  const sql = `select * from kits
  where grade = $1
  order BY name ASC`;

  pgPool.query(sql, [grade], (response) => {
    cbFunc(response);
  });
}
