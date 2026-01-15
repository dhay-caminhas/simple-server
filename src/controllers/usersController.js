const UserModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Nome é obrigatório!");
    }

    const user = await UserModel.create(name);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).send("Usuário não encontrado ❌");
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Nome é obrigatório");
    }

    const updated = await UserModel.update(id, name);

    if (!updated) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.json({ id: Number(id), name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.delete(id);

    if (!deleted) {
      return res.status(404).send("Usuário não encontrado");
    }

    res.send("Usuário removido com sucesso ✅");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
