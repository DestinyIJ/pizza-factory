import dbConnect from "../../../lib/dbConnect"
import OrderItem from "../../../models/OrderItem"

export default async function handler(req, res) {
  const { id } = req.query
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const orderItem = await OrderItem.findById(id) /* find all the data in our database */
        res.status(200).json({ success: true, data: orderItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const orderItem = await OrderItem.findByIdAndUpdate(id, req.body, { new:true }) /* update model in the database */
        res.status(201).json({ success: true, data: orderItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const orderItem = await OrderItem.findByIdAndDelete(id)
        res.status(201).json({ success: true, data: orderItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}