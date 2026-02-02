const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');

const UserModel = {
  async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  },

  async findAll() {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  },

  async findById(id) {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return null;

    return await prisma.user.findUnique({
      where: { id: parsedId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
  },

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  },

  async update(id, name) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  },

  async delete(id) {
    return await prisma.user.delete({
      where: { id: parseInt(id) },
      select: { id: true } // Retorna apenas o ID confirmado
    });
  }
};

module.exports = UserModel;