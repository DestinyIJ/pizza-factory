import dbConnect from "../../../lib/dbConnect"
import OrderItem from "../../../models/OrderItem"

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const orderItem = await OrderItem.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: orderItem })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const product = await OrderItem.create(req.body) /* create a new model in the database */
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