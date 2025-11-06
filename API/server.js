import express from "express";
import cors from "cors";
import TodasLasRutas from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint de test
app.get("/api", (req, res) => {
  res.send("API funcionando");
});

// Montar rutas DESPUÉS del endpoint test
TodasLasRutas(app);

// Solo escuchar en local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}

export default app;
