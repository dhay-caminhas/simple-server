const prisma = require('../config/prisma');

const SearchModel = {

  async globalSearch(query, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, articles, totalUsers, totalArticles] = await Promise.all([

      prisma.user.findMany({
        where: {
          name: { contains: query }
        },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true
        }
      }),

      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } }
          ]
        },
        skip,
        take: limit,
        include: {
          user: { select: { id: true, name: true } },
          _count: { select: { likes: true } }
        }
      }),

      prisma.user.count({
        where: {
          name: { contains: query }
        }
      }),

      prisma.article.count({
        where: {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } }
          ]
        }
      })

    ]);

    return {
      page,
      limit,
      total: totalUsers + totalArticles,
      results: {
        users,
        articles
      }
    };
  }

};

module.exports = SearchModel;
