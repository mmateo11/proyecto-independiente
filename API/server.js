import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
app.use(cors());

// Tus rutas de la API
TodasLasRutas(app);

app.listen(3000, () => console.log("Servidor local en http://localhost:3000"));
export default serverless(app);

