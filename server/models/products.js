import { dbPool } from '../config/database.js'

export const getAllProducts = () => {
  const SQLquery = 'SELECT * FROM mitrapasar_db.products'
  return dbPool.execute(SQLquery)
}

export const getProductByCategory = (query) => {
  const SQLquery = `SELECT * FROM mitrapasar_db.products WHERE id_category = ${query.category}`
  return dbPool.execute(SQLquery)
}

export const getSingleProduct = (id) => {
  const SQLquery = `SELECT * FROM mitrapasar_db.products WHERE id = ${id} `
  return dbPool.execute(SQLquery)
}

export const addNewProduct = (body, file) => {
  const SQLquery = `INSERT INTO mitrapasar_db.products 
                    (
                      product_name,
                      id_category, 
                      stock, 
                      price, 
                      image,
                      description
                    )
                    VALUES (  
                     '${body.product_name}', 
                      ${body.id_category},
                      ${body.stock},
                      ${body.price}, 
                      '${file.buffer.toString('base64')}',
                      '${body.description}'
                    )`

  return dbPool.execute(SQLquery)
}

export const updateProduct = (body, file, id) => {
  let SQLquery = `UPDATE mitrapasar_db.products 
                  SET product_name='${body.product_name}',
                  id_category ='${body.id_category}',
                  stock=${body.stock}, 
                  price=${body.price}, 
                  description='${body.description}'`
  if (file) {
    SQLquery += `, image='${file.buffer.toString('base64')}'`
  }
  SQLquery += ` WHERE id=${id}`
  return dbPool.execute(SQLquery)
}

export const updateSingleProduct = (body, id) => {
  const SQLquery = `UPDATE mitrapasar_db.products 
                    SET stock=${body.stock}
                        WHERE id=${id}`
  return dbPool.execute(SQLquery)
}

export const deleteProduct = (id) => {
  const SQLquery = `DELETE FROM mitrapasar_db.products WHERE id=${id} `
  return dbPool.execute(SQLquery)
}

export const searchProducts = (query) => {
  const SQLquery = `SELECT * from products 
                    WHERE MATCH(product_name)
                    AGAINST('${query.keyword}*' IN BOOLEAN MODE)`
  return dbPool.execute(SQLquery)
}
