import express from 'express';
import TodasLasRutas from './routes/index.js';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('pages'));

app.get('/', async (req, res) => {
  res.json('Bienvenido a nuestra API ');
});

app.use(express.static('public'));

TodasLasRutas(app);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});