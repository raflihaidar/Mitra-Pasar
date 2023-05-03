const dbPool = require('../config/database')

const getJajanan_pasar = () => {
  const SQLquery = 'SELECT * FROM express_mitrapasar.jajanan_pasar'
  return dbPool.execute(SQLquery)
}

const createNewProduct = (body) => {
  const SQLquery = `INSERT INTO express_mitrapasar.jajanan_pasar 
                    (
                      product_name, 
                      description, 
                      price, 
                      stock, 
                      img
                    )
                    VALUES (  
                      '${body.product_name}', 
                      '${body.description}', 
                      ${body.price}, 
                      ${body.stock},
                      '${body.img}'
                    )`

  return dbPool.execute(SQLquery)
}

const updateData = (body, id) => {
  const SQLquery = `UPDATE express_mitrapasar.jajanan_pasar 
                    SET product_name='${body.product_name}',
                        description='${body.description}', 
                        price=${body.price}, 
                        stock=${body.stock}, 
                        img='${body.img}' 
                        WHERE id=${id}`
  return dbPool.execute(SQLquery)
}

const deleteProducts = (id) => {
  const SQLquery = `DELETE FROM express_mitrapasar.jajanan_pasar WHERE id=${id} `
  return dbPool.execute(SQLquery)
}

module.exports = {
  getJajanan_pasar,
  createNewProduct,
  updateData,
  deleteProducts
}
