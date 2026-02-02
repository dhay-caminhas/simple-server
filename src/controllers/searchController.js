const SearchModel = require('../models/searchModel');

const globalSearch = async (req, res) => {
  try {
    const { q, page, limit } = req.query;

    if (!q) {
      return res.status(400).json({
        error: 'Parâmetro de busca (q) é obrigatório'
      });
    }

    const result = await SearchModel.globalSearch(
      q,
      parseInt(page) || 1,
      parseInt(limit) || 10
    );

    res.json({
      query: q,
      ...result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { globalSearch };
