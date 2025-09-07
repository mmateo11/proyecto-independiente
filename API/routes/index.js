import NoticiasRoutes from './Noticias.routes.js';
import SociosRoutes from './socios.routes.js';
import JugadoresRoutes from './jugadores.routes.js';
import PartidosRoutes from './partidos.routes.js';

function TodasLasRutas(app){
app.use('/noticias', NoticiasRoutes);
app.use('/socios', SociosRoutes);
app.use('/jugadores', JugadoresRoutes);
app.use('/partidos', PartidosRoutes);
}

export default TodasLasRutas;



    