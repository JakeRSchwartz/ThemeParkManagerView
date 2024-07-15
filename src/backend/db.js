import { createPool } from 'mysql2/promise'
import 'dotenv/config'

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})
pool
  .getConnection()
  .then(conn => {
    console.log('Connected to database')
    conn.release()
  })
  .catch(err => console.log(err))

export default pool
