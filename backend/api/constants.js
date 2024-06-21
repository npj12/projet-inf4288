const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  ssl: process.env.IN_DEVELOPMENT ? null : {
    rejectUnauthorized: false
  },
  connectionString: process.env.DB_CONNECTION_STRING
};

const baseURL = process.env.IN_DEVELOPMENT ? 'http://localhost:3000/' : 'https://projet-inf4288.onrender.com/';

module.exports = {
  emailRegex,
  dbConfig,
  baseURL
}