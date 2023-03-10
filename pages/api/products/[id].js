import dbConnect from "../../../lib/dbConnect"
import Product from "../../../models/Product"

export default async function handler(req, res) {
  const { id } = req.query
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id) /* find all the data in our database */
        res.status(200).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const product = await Product.findByIdAndUpdate(id, 
            req.body
        ) /* update model in the database */
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const product = await Product.findByIdAndDelete(id)
        res.status(201).json({ success: true, data: product })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}