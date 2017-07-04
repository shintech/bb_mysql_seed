var config = {}

config.mysqlDB = {
  development: {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
  },
  test: {
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME']
  },
  production: {
    host: process.env['DB_HOST'],
    user: process.env['MYSQL_USER'],
    password: process.env['MYSQL_PASSWORD'],
    database: process.env['MYSQL_DATABASE']
  }
}

export default config
