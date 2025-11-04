import express from "express";
import cors from "cors";
import TodasLasRutas from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Montamos todas las rutas bajo /api
app.use("/API", (req, res, next) => {
  TodasLasRutas(app);
  next();
});

// ✅ Para debug: respuesta de prueba
app.get("/API", (req, res) => {
  res.send("API funcionando 🚀");
});

// Solo escuchá en local (Vercel maneja su propio servidor)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}

export default app;
