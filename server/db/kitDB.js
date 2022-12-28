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
  const sql = `select pl.product_line_name, k.name, k.release_date, k.premium_bandai, k.price, k.series, k.dalong_ref, k.hlj_ref from kits k
  left join product_lines pl on pl.id = k.product_line`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getAllGrades(cbFunc) {
  const sql = `select product_line from kits
  GROUP BY product_line`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getKitByGrade(grade, cbFunc) {
  const sql = `select pl.product_line_name, k.name, k.release_date, k.premium_bandai, k.price, k.series, k.dalong_ref, k.hlj_ref from kits k
  left join product_lines pl on pl.id = k.product_line
  where k.product_line = $1
  order BY k.name ASC`;

  pgPool.query(sql, [grade], (response) => {
    cbFunc(response);
  });
}
