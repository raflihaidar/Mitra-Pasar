import { dbPool } from '../config/database.js'

export const getData = (id) => {
  const SQLquery = `SELECT 
                           p.id AS id_product, 
                           p.product_name,
                           p.image,
                           p.price
                           FROM cart_item as c
                          JOIN products as p ON (p.id = c.id_product)
                          WHERE id_cart = '${id}'`
  return dbPool.execute(SQLquery)
}

export const addData = (data) => {
  const cartQuery = `INSERT INTO mitrapasar_db.cart (
                    id_user
                  )
                  VALUES
                  (
                    '${data.id_user}'
                  )`
  const cartitemQuery = `INSERT INTO mitrapasar_db.cart_item 
                  (
                   id_cart,
                   id_product,
                   quantity
                  ) 
                  VALUES (
                    ${data.id_cart},
                    ${data.id_product},
                    ${data.quantity}
                  )`
  return dbPool.execute(cartQuery), dbPool.execute(cartitemQuery)
}
