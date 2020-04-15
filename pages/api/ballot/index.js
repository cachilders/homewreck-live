const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const { id } = req.query
  try {
    const voter = await db.query(escape`
      SELECT
        id,
        email,
        total_votes,
        votes_made
      FROM voters
      WHERE id = ${parseInt(id)}
    `);
    const stories = await db.query(escape`
      SELECT
        id,
        name
      FROM stories
    `);
    res.status(200).json({ stories, voter: voter[0] });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong getting the stories '});
  }
 }; 
