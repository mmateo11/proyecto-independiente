import NoticiasRoutes from './Noticias.routes.js';
import AuthRoutes from './auth.routes.js';
import JugadoresRoutes from './jugadores.routes.js';

function TodasLasRutas(app){
app.use('/noticias', NoticiasRoutes);
app.use('/auth', AuthRoutes);
app.use('/jugadores', JugadoresRoutes);
}

export default TodasLasRutas;



    