// Importamos las rutas de cada módulo
import NoticiasRoutes from "./Noticias.routes.js";
import SociosRoutes from "./socios.routes.js";
import JugadoresRoutes from "./jugadores.routes.js";
import PartidosRoutes from "./partidos.routes.js";

function TodasLasRutas(app) {
  app.use("/api/noticias", NoticiasRoutes);
  app.use("/api/socios", SociosRoutes);
  app.use("/api/jugadores", JugadoresRoutes);
  app.use("/api/partidos", PartidosRoutes);
}

// Exportamos la función para usarla en server.js
export default TodasLasRutas;
