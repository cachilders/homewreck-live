const mysql = require('serverless-mysql')
const db = mysql({
  config: {
    host: (process.env.MYSQL_HOST || process.env.SQL_HOMEWRECK_1_IP),
    database: process.env.MYSQL_DATABASE,
    user: (process.env.MYSQL_USER || process.env.SQL_HOMEWRECK_1_USERNAME),
    password: (process.env.MYSQL_PASSWORD || process.env.SQL_HOMEWRECK_1_PASSWORD)
  }
})

exports.query = async query => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return { error }
  }
}
