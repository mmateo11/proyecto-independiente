import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Montar todas las rutas
TodasLasRutas(app);

// En Vercel NO usamos listen, pero localmente sí
if (process.env.API_URL) {
  app.listen(process.env.API_URL, () => console.log(`Servidor en puerto ${process.env.API_URL}`));
} else {
  app.listen(3000, () => console.log("Servidor local en http://localhost:3000"));
}

export default app;
