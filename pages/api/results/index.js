const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  try {
    const votingResults = await db.query(escape`
      SELECT
        st.name AS name,
        sum(v.score) AS score
      FROM votes v
      JOIN stories st
        ON st.id = v.stories_id
      GROUP BY 1 ORDER BY 2 DESC
    `);
    res.status(200).json({ votingResults });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong submitting your vote'});
  }
};