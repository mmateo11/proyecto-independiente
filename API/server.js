import express from 'express';
import TodasLasRutas from './routes/index.js'
import cors from 'cors';

const app = express(); 
app.use(express.json());
app.use(cors());


app.get('/', async (req, res) => { 
  res.json('Bienvenido a nuestra API ');
});

TodasLasRutas(app);

app.listen(3000, () => { 
  console.log('Servidor corriendo en http://localhost:3000');
});