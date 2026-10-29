import routes from './routes/index.js'
import express from 'express';

const app = express();
app.get(express.json());
app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', routes)

export default app;