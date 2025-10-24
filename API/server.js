import express from 'express';
import TodasLasRutas from './routes/index.js'; // Asegúrate que esta ruta es correcta
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
// CORS: Es crucial para permitir peticiones desde tu frontend en Vercel.
app.use(cors()); 

// Carga de todas las rutas de la API
// Asumimos que TodasLasRutas es una función que recibe 'app' y agrega las rutas
TodasLasRutas(app); 

// ** ESTE ES EL CAMBIO CLAVE PARA VERCEL **
// No usamos app.listen() en producción. Vercel se encarga de iniciar el servidor.
// Simplemente exportamos la aplicación Express configurada.

// Configuramos una ruta de prueba para asegurar que Vercel encuentre el archivo
app.get('/api/saludo', (req, res) => {
    res.status(200).json({ mensaje: "Servidor Vercel funcionando correctamente!" });
});


// Usamos export default para ser compatible con módulos ES6 (.js)
// Si usaras .cjs, usarías module.exports = app;
export default app;
