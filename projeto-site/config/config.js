module.exports = {
  production: {
    username: 'Biotec',
    password: '#Gfgrupo3',
    database: 'bd_grupo3',
    host: 'bd-grupo3.database.windows.net',
    dialect: 'mssql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  }
};
 
