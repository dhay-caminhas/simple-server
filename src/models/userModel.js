const db = require('../config/db');

const UserModel = {
  async create(name) {
    const [result] = await db.query("INSERT INTO users (name) VALUES (?)", [name]);
    return { id: result.insertId, name };
  },

  async findAll() {
    const [users] = await db.query("SELECT * FROM users");
    return users;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, name) {
    const [result] = await db.query("UPDATE users SET name = ? WHERE id = ?", [name, id]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
};

module.exports = UserModel;
