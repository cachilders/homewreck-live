const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const {
    votes: { first, second, third, multiplier },
    voterId,
  } = JSON.parse(req.body)

  try {
    const voteResult = await db.query(escape`
      INSERT INTO votes (voter_id, stories_id, score)
      VALUES
        (${voterId},${first}, ${3 * multiplier}),
        (${voterId},${second}, ${2 * multiplier}),
        (${voterId},${third}, ${1 * multiplier})
    `);
    const voterUpdateResult = await db.query(escape`
      UPDATE voters
        SET votes_made = votes_made + ${multiplier}
        WHERE id = ${voterId}
    `);
    res.status(200).json({ voteResult, voterUpdateResult });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong submitting your vote'});
  }
};
