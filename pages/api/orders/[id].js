import dbConnect from "../../../lib/dbConnect"
import Order from "../../../models/Order"

export default async function handler(req, res) {
  const { id } = req.query
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const order = await Order.findById(id) /* find all the data in our database */
        res.status(200).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, { new:true }) /* update model in the database */
        res.status(201).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const order = await Order.findByIdAndDelete(id)
        res.status(201).json({ success: true, data: order })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}