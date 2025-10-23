import pkg from 'pg';
import config from './config.js';

const { Pool } = pkg;

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

const db = {
  query: (text, params) => pool.query(text, params),
  pool
};

export default db;
