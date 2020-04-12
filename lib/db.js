const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.SQL_HOMEWRECK_1_IP,
    database: process.env.MYSQL_DATABASE,
    user: process.env.SQL_HOMEWRECK_1_USERNAME,
    password: process.env.SQL_HOMEWRECK_1_PASSWORD
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
