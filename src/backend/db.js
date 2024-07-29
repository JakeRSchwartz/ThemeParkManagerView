import { createPool } from 'mysql2/promise'
import 'dotenv/config'


//PLEASE CHANGE THE ENVIRONMENT VARIABLES TO YOUR OWN DATABASE CONFIGURATION IN LOCALHOST
const pool = createPool({
 // host: HOST,
 // user: USER,
 // password: PASSWORD,
 // database: DATABASE,
})
pool
  .getConnection()
  .then(conn => {
    console.log('Connected to database')
    conn.release()
  })
  .catch(err => console.log(err))

export default pool
