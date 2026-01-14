const db = require("../db");

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).send("Nome é obrigatório!");

  const [result] = await db.query("INSERT INTO users (name) VALUES (?)", [name]);
  res.status(201).json({ id: result.insertId, name });
};

const getAllUsers = async (req, res) => {
  const [users] = await db.query("SELECT * FROM users");
  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

  if (rows.length === 0) return res.status(404).send("Usuário não encontrado ❌");
  res.json(rows[0]);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).send("Nome é obrigatório");

  const [result] = await db.query("UPDATE users SET name = ? WHERE id = ?", [name, id]);

  if (result.affectedRows === 0) return res.status(404).send("Usuário não encontrado");

  res.json({ id: Number(id), name });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) return res.status(404).send("Usuário não encontrado");

  res.send("Usuário removido com sucesso ✅");
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
