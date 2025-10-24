import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la raíz
app.use(express.static(__dirname));

// Ruta raíz -> devuelve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Tus rutas de la API
TodasLasRutas(app);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Servidor local en http://localhost:3000"));
}
