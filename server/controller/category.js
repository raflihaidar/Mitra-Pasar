import { getAllCategory } from '../models/category.js'

export const getAllData = async (req, res) => {
  const [data] = await getAllCategory()
  try {
    res.json({
      data
    })
  } catch (error) {
    console.log(error)
  }
}
