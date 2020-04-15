const mysql = require('serverless-mysql')
const db = mysql({
  config: {
    host: process.env.SQL_HOMEWRECK_1_IP || process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.SQL_HOMEWRECK_1_USERNAME || process.env.MYSQL_USER,
    password: process.env.SQL_HOMEWRECK_1_PASSWORD || process.env.MYSQL_PASSWORD
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
