import { dbPool } from '../config/database.js'

export const getAllProducts = () => {
  const SQLquery = 'SELECT * FROM mitrapasar_db.products'
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
                      stock, 
                      price, 
                      image,
                      description
                    )
                    VALUES (  
                      '${body.product_name}', 
                      ${body.stock},
                      ${body.price}, 
                      '${file.buffer.toString('base64')}',
                      '${body.description}'
                    )`

  return dbPool.execute(SQLquery)
}

export const updateProduct = (body, file, id) => {
  const SQLquery = `UPDATE mitrapasar_db.products 
                    SET product_name='${body.product_name}',
                    stock=${body.stock}, 
                    price=${body.price}, 
                    image='${file.buffer.toString('base64')}',
                    description='${body.description}'
                        WHERE id=${id}`
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
