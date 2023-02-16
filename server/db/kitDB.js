let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    getAllKits,
    getAllProductLines,
    getKitByProductLine,
    createKit,
  };
};

function getAllKits(cbFunc) {
  const sql = `select k.id, pl.product_line_name, k.name, k.release_date, k.exclusive, k.price, k.dalong_ref, k.sku_code, k.gpsa_link, k.supplier_link from kits k
  left join product_lines pl on pl.id = k.product_line`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getAllProductLines(cbFunc) {
  const sql = `select id, product_line_name from product_lines
  order by id`;
  pgPool.query(sql, [], (response) => {
    cbFunc(response);
  });
}

function getKitByProductLine(product_line_name, cbFunc) {
  const sql = `select k.id, pl.product_line_name, k.name, k.release_date, k.exclusive, k.price, k.dalong_ref, k.sku_code, k.gpsa_link, k.supplier_link from kits k
  left join product_lines pl on pl.id = k.product_line
  where pl.product_line_name = $1
  order BY k.name ASC`;

  pgPool.query(sql, [product_line_name], (response) => {
    cbFunc(response);
  });
}

function createKit(
  name,
  product_line,
  exclusive,
  price,
  sku_code,
  cbFunc
) {
  const sql = `INSERT INTO kits (name, product_line, exclusive, price, sku_code) VALUES ($1, $2, $3, $4, $5)`;

  pgPool.query(
    sql,
    [name, product_line, exclusive, price, sku_code],
    (response) => {
      cbFunc(response);
    }
  );
}
