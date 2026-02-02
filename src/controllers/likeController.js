const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLike = async (req, res) => {
  const userId = req.userId;
  const { articleId } = req.body;

  if (!articleId) return res.status(400).json({ error: "articleId é obrigatório" });

  try {
    const like = await prisma.like.create({
      data: { userId, articleId },
    });
    res.status(201).json({ message: "Like registrado!", like });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Você já curtiu este artigo" });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteLike = async (req, res) => {
  const userId = req.userId;
  const { id: articleId } = req.params;

  try {
    await prisma.like.delete({
      where: {
        userId_articleId: {
          userId: Number(userId),
          articleId: Number(articleId),
        },
      },
    });
    res.status(200).json({ message: "Like removido!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticleLikes = async (req, res) => {
  const { articleId } = req.params;

  try {
    const count = await prisma.like.count({
      where: { articleId: Number(articleId) },
    });
    res.status(200).json({ likes: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLike,
  deleteLike,
  getArticleLikes,
};
