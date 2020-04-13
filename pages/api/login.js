function redirectTo (res, path) {
  res.writeHead(307, { Location: path })
  res.end()
}

function findUser (email) {
  // FIXME: This is a stub, use real information when we have the DB.
  return {
    totalVotes: 3,
    votesCast: 3,
  }
}

export default (req, res) => {
  if (req.method === 'POST') {
    let email = req.body.email;
    if (email === undefined) {
      let errorMessage = "Missing email!"
      redirectTo(res, `/?error=${encodeURI(errorMessage)}`)
      return
    }

    let user = findUser(email)

    if ( user.votesCast >= user.totalVotes ) {
      redirectTo(res, "/thank-you")
    } else {
      redirectTo(res, "/ballot")
    }
  } else {
    // If we don't have a POST request we'd like to redirect to login
    redirectTo(res, "/")
  }
}
