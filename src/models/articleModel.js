const prisma = require('../config/prisma');

const ALLOWED_SORT_FIELDS = ['createdAt', 'title'];

const ArticleModel = {

  async create(title, content, userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true }
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return prisma.article.create({
      data: {
        title,
        content,
        userId: parseInt(userId)
      },
      include: {
        user: { select: { id: true, name: true } }
      }
    });
  },

  async findAllPaginated(
    page = 1,
    limit = 10,
    userId = null,
    search = null,
    sort = 'createdAt',
    order = 'desc'
  ) {
    const skip = (page - 1) * limit;

    const where = {};

    if (userId) {
      where.userId = parseInt(userId);
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } }
      ];
    }

    const safeSort = ALLOWED_SORT_FIELDS.includes(sort)
      ? sort
      : 'createdAt';

    const safeOrder = order === 'asc' ? 'asc' : 'desc';

    const [data, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { [safeSort]: safeOrder },
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { likes: true } }
        }
      }),
      prisma.article.count({ where })
    ]);

    return {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data
    };
  },

  async findById(id) {
    return prisma.article.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { likes: true } }
      }
    });
  },

  async update(id, title, content) {
    const data = {};
    if (title !== undefined) data.title = title;
    if (content !== undefined) data.content = content;

    if (Object.keys(data).length === 0) return null;

    return prisma.article.update({
      where: { id: parseInt(id) },
      data,
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { likes: true } }
      }
    });
  },

  async delete(id) {
    return prisma.article.delete({
      where: { id: parseInt(id) },
      include: {
        user: { select: { id: true, name: true } },
        _count: { select: { likes: true } }
      }
    });
  },

  async userExists(userId) {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { id: true }
    });
    return !!user;
  }
};

module.exports = ArticleModel;
