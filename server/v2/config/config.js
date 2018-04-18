const dotenv = require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DATABASE_USERNAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: process.env.DEV_DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
  },

  remote: {
    username: process.env.RT_DATABASE_USERNAME,
    password: process.env.RT_DATABASE_PASSWORD,
    database: process.env.RT_DATABASE_NAME,
    host: process.env.RT_DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL_PRODUCTION',
    dialect: 'postgres'
  }
};
