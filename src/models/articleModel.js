const db = require('../config/db');

const ArticleModel = {
  async create(title, content, userId) {
    const [result] = await db.query(
      "INSERT INTO articles (title, content, userId) VALUES (?, ?, ?)",
      [title, content, userId]
    );
    return { id: result.insertId, title, content, userId };
  },

  async findAll() {
    const [articles] = await db.query("SELECT * FROM articles");
    return articles;
  },

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows[0];
  },

  async update(id, title, content) {
    const updates = [];
    const values = [];

    if (title !== undefined) {
      updates.push("title = ?");
      values.push(title);
    }
    if (content !== undefined) {
      updates.push("content = ?");
      values.push(content);
    }

    if (updates.length === 0) return false;

    values.push(id);
    const [result] = await db.query(
      `UPDATE articles SET ${updates.join(", ")} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM articles WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  async userExists(userId) {
    const [rows] = await db.query("SELECT id FROM users WHERE id = ?", [userId]);
    return rows.length > 0;
  }
};

module.exports = ArticleModel;
