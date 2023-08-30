const dbPool = require('../config/database')

const getUser = () => {
  const SQLquery = 'SELECT * FROM express_mitrapasar.user'
  return dbPool.execute(SQLquery)
}

const createNewUser = (body) => {
  const SQLquery = `INSERT INTO express_mitrapasar.user 
                    (
                      username, 
                      password 
                    )
                    VALUES (  
                      '${body.username}',
                      '${body.password}'
                    )`

  return dbPool.execute(SQLquery)
}

const updateData = (body, id) => {
  const SQLquery = `UPDATE express_mitrapasar.user 
                    SET isAuthenticated=${body.isAuthenticated}
                        WHERE id=${id}`
  return dbPool.execute(SQLquery)
}
const updateProfileUser = (body, id) => {
  const SQLquery = `UPDATE express_mitrapasar.user 
                    SET username='${body.username}',
                        email='${body.email}',
                        nomor_hp='${body.nomor_hp}',
                        address='${body.address}'
                        WHERE id=${id}`
  return dbPool.execute(SQLquery)
}

const deleteUser = (id) => {
  const SQLquery = `DELETE FROM express_mitrapasar.user WHERE id=${id} `
  return dbPool.execute(SQLquery)
}

module.exports = {
  getUser,
  createNewUser,
  updateData,
  updateProfileUser,
  deleteUser
}
