import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.json('Bienvenido a nuestra API ');
});

TodasLasRutas(app);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => console.log("Servidor local en http://localhost:3000"));
}