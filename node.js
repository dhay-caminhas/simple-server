const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// =======================
// 🗄️ "Banco de dados" em memória
// =======================
let users = [];
let nextUserId = 1;

let articles = [];
let nextArticleId = 1;

// =======================
// 👤 ROTAS DE USERS
// =======================

//
// ✅ CREATE - Criar usuário
//
app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send("Nome é obrigatório!");
  }

  const newUser = {
    id: nextUserId++,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

//
// ✅ READ - Listar usuários
//
app.get("/users", (req, res) => {
  res.json(users);
});

//
// ✅ READ - Buscar usuário por ID
//
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado ❌");
  }

  res.json(user);
});

//
// ✅ UPDATE - Atualizar usuário
//
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send("Usuário não encontrado");
  }

  if (!name) {
    return res.status(400).send("Nome é obrigatório");
  }

  user.name = name;
  res.json(user);
});

//
// ✅ DELETE - Remover usuário
//
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).send("Usuário não encontrado");
  }

  users.splice(index, 1);
  res.send("Usuário removido com sucesso ✅");
});

// =======================
// 📰 ROTAS DE ARTICLES
// =======================

//
// ✅ CREATE - Criar artigo
//
app.post("/articles", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return res.status(400).send("title, content e userId são obrigatórios");
  }

  // Verifica se o usuário existe
  const userExists = users.find(u => u.id === Number(userId));
  if (!userExists) {
    return res.status(400).send("Usuário não existe");
  }

  const newArticle = {
    id: nextArticleId++,
    title,
    content,
    userId: Number(userId)
  };

  articles.push(newArticle);
  res.status(201).json(newArticle);
});

//
// ✅ GET - Listar todos os artigos
//
app.get("/articles", (req, res) => {
  res.json(articles);
});

//
// ✅ GET - Buscar artigo por ID
//
app.get("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).send("Artigo não encontrado");
  }

  res.json(article);
});

//
// ✅ PUT - Atualizar artigo
//
app.put("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).send("Artigo não encontrado");
  }

  if (title) article.title = title;
  if (content) article.content = content;

  res.json(article);
});

//
// ✅ DELETE - Remover artigo
//
app.delete("/articles/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).send("Artigo não encontrado");
  }

  articles.splice(index, 1);
  res.send("Artigo removido com sucesso ✅");
});

// =======================
// 🚀 Inicialização do servidor
// =======================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
