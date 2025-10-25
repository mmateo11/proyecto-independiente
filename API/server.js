import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
app.use(cors());

// Logging de cada request
app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url);
  next();
});

// Montar rutas
TodasLasRutas(app);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('ERROR EN BACKEND:', err);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

export default serverless(app);
