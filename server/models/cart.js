import { dbPool } from '../config/database.js'

export const getData = (id) => {
  const SQLquery = `SELECT p.product_name, 
                           p.image,
                           p.id,
                           ci.total,
                           ci.id_cart,
                           ci.quantity
                    FROM 
                      cart_item as ci
                    JOIN products as p
                      ON (p.id = ci.id_product)
                    JOIN cart as c
                      ON (c.id = ci.id_cart)
                    WHERE c.id_user = '${id}'`
  return dbPool.execute(SQLquery)
}

export const createData = (id) => {
  const cartQuery = `INSERT INTO mitrapasar_db.cart (
                      id_user
                    )
                    VALUES
                    (
                      '${id}'
                    )`
  return dbPool.execute(cartQuery)
}

export const addData = (data) => {
  const cartitemQuery = `INSERT INTO mitrapasar_db.cart_item 
                  (
                   id_cart,
                   id_product,
                   total
                  ) 
                  VALUES (
                    ${data.id_cart},
                    ${data.id_product},
                    ${data.total}
                  )`
  return dbPool.execute(cartitemQuery)
}

export const updateData = (body) => {
  const cartItemQuery = `UPDATE cart_item AS ci
                          JOIN products AS p ON (ci.id_product = p.id)
                          JOIN cart AS c ON (ci.id_cart = c.id)
                          SET quantity = quantity + ${body.quantity},
                              total = total + p.price,
                              p.stock = p.stock - 1
                          WHERE ci.id_cart = ${body.id_cart} && ci.id_product = ${body.id_product}`
  return dbPool.execute(cartItemQuery)
}

export const deleteAllData = (body) => {
  const cartItemQuery = `DELETE FROM cart_item WHERE id_product = ${body.id_product} AND id_cart = ${body.id_cart}`
  return dbPool.execute(cartItemQuery)
}
