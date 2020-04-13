const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const stories = await db.query(escape`
    SELECT
      id,
      name
    FROM stories
  `);
  res.status(200).json({ stories });
};