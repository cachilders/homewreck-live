const db = require('../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  try {
    const stories = await db.query(escape`
      SELECT
        id,
        name
      FROM stories
    `);
    res.status(200).json({ stories });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong getting the stories '});
  }
};