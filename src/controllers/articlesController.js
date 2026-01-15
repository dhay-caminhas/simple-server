const ArticleModel = require('../models/articleModel');

const createArticle = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).send("title, content e userId são obrigatórios");
    }

    const userExists = await ArticleModel.userExists(userId);
    if (!userExists) {
      return res.status(400).send("Usuário não existe");
    }

    const article = await ArticleModel.create(title, content, userId);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllArticles = async (req, res) => {
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

    if (!article) {
      return res.status(404).send("Artigo não encontrado");
    }

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

    if (!updated) {
      return res.status(404).send("Artigo não encontrado");
    }

    const article = await ArticleModel.findById(id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ArticleModel.delete(id);

    if (!deleted) {
      return res.status(404).send("Artigo não encontrado");
    }

    res.send("Artigo removido com sucesso ✅");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
