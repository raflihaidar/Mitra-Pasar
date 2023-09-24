import { dbPool } from '../config/database.js'

export const getAllCategory = () => {
  const SQLquery = 'SELECT * FROM mitrapasar_db.categories'
  return dbPool.execute(SQLquery)
}
