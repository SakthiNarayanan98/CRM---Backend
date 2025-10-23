import db from '../db.js';

export async function createLead(lead) {
  const { name, email, phone, course_interest, message } = lead;
  const res = await db.query(
    `INSERT INTO leads (name, email, phone, course_interest, message) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, phone, course_interest, message]
  );
  return res.rows[0];
}

export async function getUnclaimedLeads() {
  const res = await db.query('SELECT * FROM leads WHERE claimed = false ORDER BY created_at DESC');
  return res.rows;
}

export async function getPublicLeads() {
  return getUnclaimedLeads();
}

export async function getLeadById(id) {
  const res = await db.query('SELECT * FROM leads WHERE id=$1', [id]);
  return res.rows[0];
}

export async function claimLead(leadId, counselorId) {
  const res = await db.query(
    `UPDATE leads SET claimed = true, counselor_id = $1 WHERE id = $2 AND claimed = false RETURNING *`,
    [counselorId, leadId]
  );
  return res.rows[0];
}

export async function getLeadsByCounselor(counselorId) {
  const res = await db.query('SELECT * FROM leads WHERE counselor_id=$1 ORDER BY created_at DESC', [counselorId]);
  return res.rows;
}
