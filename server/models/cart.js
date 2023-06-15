const dbPool = require('../config/database')

const getCart = (id) => {
  const SQLquery = `  SELECT c.id, c.id_jajanan_pasar, j.product_name, j.priceUser, j.quantity, j.img
                          FROM express_mitrapasar.cart AS c
                          JOIN express_mitrapasar.jajanan_pasar AS j ON (j.id = c.id_jajanan_pasar)
                          JOIN express_mitrapasar.user AS u ON (u.id = c.id_user)
                          WHERE u.id = ${id}`
  return dbPool.execute(SQLquery)
}

module.exports = {
  getCart
}
