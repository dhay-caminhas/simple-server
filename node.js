const express = require("express");
const app = express();
const PORT = 3000;

const userRoutes = require("./routes/users");

app.use(express.json());
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
