require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const logger = require('./utils/logger');

const authenticate = require('./middlewares/authMiddleware');

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const likeRoutes = require("./routes/likeRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { error: "Muitas requisições. Tente novamente mais tarde." }
}));
app.use(morgan("combined"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticate, userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/likes", likeRoutes); // já autenticado dentro das rotas
app.use("/api/search", searchRoutes);

// Middleware global de erro
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Algo deu errado!" });
});

app.get("/", (req, res) => res.send("🚀 API rodando!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor iniciado na porta ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
