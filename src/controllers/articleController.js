const ArticleModel = require('../models/articleModel');

const createArticle = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const exists = await ArticleModel.userExists(userId);
    if (!exists) return res.status(404).json({ error: "Usuário não encontrado" });

    const article = await ArticleModel.create(title, content, userId);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleModel.findById(id);
    if (!article) return res.status(404).json({ error: "Artigo não encontrado" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updated = await ArticleModel.update(id, title, content);
    if (!updated) return res.status(404).json({ error: "Nenhum dado para atualizar" });

    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ArticleModel.delete(id);
    res.json(deleted);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Artigo não encontrado" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
