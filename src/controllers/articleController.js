const ArticleModel = require('../models/articleModel');

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // Extraído do token pelo middleware

    if (!title || !content) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const article = await ArticleModel.create(title, content, userId);
    res.status(201).json(article);
  } catch (error) {
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

const getArticles = async (req, res) => {
  try {
    const { page, limit, userId, search, sort, order } = req.query;

    const result = await ArticleModel.findAllPaginated(
      parseInt(page) || 1,
      parseInt(limit) || 10,
      userId || null,
      search || null,
      sort || 'createdAt',
      order || 'desc'
    );

    res.json(result);
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
    const userId = req.userId;

    const article = await ArticleModel.findById(id);
    if (!article) return res.status(404).json({ error: "Artigo não encontrado" });

    // Verificar se quem está logado é o dono
    if (article.user.id !== userId) {
      return res.status(403).json({ error: "Você não tem permissão para atualizar este artigo" });
    }

    const updated = await ArticleModel.update(id, title, content);
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
    const userId = req.userId;

    const article = await ArticleModel.findById(id);
    if (!article) return res.status(404).json({ error: "Artigo não encontrado" });

    if (article.user.id !== userId) {
      return res.status(403).json({ error: "Você não tem permissão para deletar este artigo" });
    }

    const deleted = await ArticleModel.delete(id);
    res.json({ message: "Artigo deletado com sucesso", deleted });
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
