import { dbPool } from '../config/database.js'

export const getData = (id) => {
  const SQLquery = `SELECT c.id AS id_cart,
                           c.amount,
                           c.quantity,
                           p.id AS id_product, 
                           p.product_name,
                           p.image,
                           p.price,
                           u.id as id_user, 
                           u.username FROM cart as c
                          JOIN products as p ON (p.id = c.id_product)
                          JOIN users as u ON (u.id = c.id_user)
                          WHERE id_user = '${id}'`
  return dbPool.execute(SQLquery)
}

export const addData = (data) => {
  let SQLquery = `INSERT INTO cart 
                    (
                    id, 
                    id_product, 
                    id_user, 
                    amount, 
                    quantity
                    ) 
                    VALUES (
                      '${data.id}',
                      ${data.id_product},
                      '${data.id_user}',
                      ${data.quantity},
                      ${data.amount}
                    )`
  return dbPool.execute(SQLquery)
}
