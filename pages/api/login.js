const db = require('../../lib/db')
const escape = require('sql-template-strings')

function redirectTo (res, path) {
  res.writeHead(307, { Location: path })
  res.end()
}

async function findUser (email) {
  // Normalize email by downcasing it and stripping whitespace
  email = email.toLowerCase().trim()

  const userResult = await db.query(escape`SELECT * FROM voters WHERE email = ${email} LIMIT 1`)
  return userResult[0]
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    let email = req.body.email;
    if (email === undefined) {
      let errorMessage = "You didn't enter your email address."
      redirectTo(res, `/?error=${encodeURI(errorMessage)}`)
      return
    }

    let user = await findUser(email)

    if (user === undefined) {
      let errorMessage = "You aren't registered to vote."
      redirectTo(res, `/?error=${encodeURI(errorMessage)}`)
      return
    }

    if ( user.votes_made >= user.total_votes ) {
      redirectTo(res, "/thank-you")
    } else {
      redirectTo(res, `/ballot?shipster=${user.uuid}`)
    }
  } else {
    // If we don't have a POST request we'd like to redirect to login
    redirectTo(res, "/")
  }
}
