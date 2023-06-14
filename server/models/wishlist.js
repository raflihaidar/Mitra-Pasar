const dbPool = require('../config/database')

const getUserWishlist = (id) => {
  const SQLquery = `  SELECT w.id, w.id_products, w.id_user, u.username, p.product_name, w.description
                        FROM express_mitrapasar.wishlist AS w
                        JOIN express_mitrapasar.jajanan_pasar AS p ON (p.id = w.id_products)
                        JOIN express_mitrapasar.user AS u ON (u.id = w.id_user)
                        WHERE u.id = ${id}`
  return dbPool.execute(SQLquery)
}

module.exports = {
  getUserWishlist
}
