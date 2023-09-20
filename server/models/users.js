import { dbPool } from '../config/database.js'

export const getUser = () => {
  const SQLquery = 'SELECT * FROM mitrapasar_db.users'
  return dbPool.execute(SQLquery)
}

export const createNewUser = (body, id) => {
  const SQLquery = `INSERT INTO mitrapasar_db.users
                    (
                      id,
                      username, 
                      password 
                    )
                    VALUES (  
                      '${id}',
                      '${body.username}',
                      '${body.password}'
                    )`

  return dbPool.execute(SQLquery)
}

export const updateData = (body, id) => {
  const SQLquery = `UPDATE mitrapasar_db.users 
                    SET isAuthenticated=${body.isAuthenticated}
                        WHERE id='${id}'`
  return dbPool.execute(SQLquery)
}

export const updateProfileUser = (body, file, id) => {
  let SQLquery = `UPDATE mitrapasar_db.users 
                    SET name='${body.name}',
                        username='${body.username}',
                        email='${body.email}',
                        telephone='${body.telephone}',
                        address='${body.address}'`
  if (file) {
    SQLquery += `, image='${file.buffer.toString('base64')}'`
  }
  SQLquery += ` WHERE id='${id}'`
  return dbPool.execute(SQLquery)
}

export const deleteUser = (id) => {
  const SQLquery = `DELETE FROM mitrapasar_db.users WHERE id=${id} `
  return dbPool.execute(SQLquery)
}
