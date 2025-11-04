import express from "express";
import cors from "cors";
import TodasLasRutas from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// Montar rutas
TodasLasRutas(app);

// Endpoint de test
app.get("/api", (req, res) => {
  res.send("API funcionando 🚀");
});

// En local (Vercel no usa app.listen, lo exporta)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}

export default app;
