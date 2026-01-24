const prisma = require('../config/prisma');

const UserModel = {
  create: async (name) => {
    return await prisma.user.create({
      data: { name }
    });
  },

  findAll: async () => {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },

  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  },

  update: async (id, name) => {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name }
    });
  },

  delete: async (id) => {
    return await prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = UserModel;
