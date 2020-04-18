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

    const voteStats = await db.query(escape`
      SELECT
        sum(total_votes) AS total_votes,
        sum(total_votes - votes_made) AS remaining_votes
      FROM voters
    `);

    res.status(200).json({
      votingResults,
      voteStats: voteStats[0],
    });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong retreiving results'});
  }
};