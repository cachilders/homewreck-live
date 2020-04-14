const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  const {
    votes: { first, second, third },
    voterId
  } = JSON.parse(req.body)
  try {
    const result = await db.query(escape`
      INSERT INTO votes (voter_id, stories_id, score)
      VALUES
        (${voterId},${first}, 3),
        (${voterId},${second}, 2),
        (${voterId},${third}, 1)
    `);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong submitting your vote'});
  }
};
