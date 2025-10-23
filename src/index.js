import express from 'express';
import cors from 'cors';
import config from './config.js';
import authRoutes from './routes/auth.routes.js';
import leadRoutes from './routes/lead.routes.js';
import db from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', leadRoutes);

app.get('/', (req, res) => res.send('CRM Backend is running'));

// basic health + DB check
app.get('/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});


