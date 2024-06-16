const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
};

module.exports = {
  emailRegex,
  dbConfig
}