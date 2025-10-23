import db from '../db.js';

export async function findByEmail(email) {
  const res = await db.query(
    'SELECT id, name, email, password, created_at FROM users WHERE email=$1',
    [email]
  );
  return res.rows[0];
}

export async function createUser({ name, email, password }) {
  const res = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email, created_at',
    [name, email, password]
  );
  return res.rows[0];
}
