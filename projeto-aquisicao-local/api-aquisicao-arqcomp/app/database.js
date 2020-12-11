var configuracoes = {
  server: "bd-grupo3.database.windows.net",
  user: "Biotec",
  password: "#Gfgrupo3",
  database: "bd_grupo3",
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
  pool: {
    max: 4,
    min: 1,
    idleTimeoutMillis: 90000,
    connectionTimeout: 5000,
  },
};

var sql = require("mssql");

sql.on("error", (err) => {
  console.error(`Erro de Conexão: ${err}`);
});

function conectar() {
  sql.close();
  return sql.connect(configuracoes);
}

module.exports = {
  conectar: conectar,
  sql: sql,
};