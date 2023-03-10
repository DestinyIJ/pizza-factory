import dbConnect from "../../../lib/dbConnect"
import User from "../../../models/User"

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await User.find().select("-password") /* find all the data in our database */
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const user = await User.findByIdAndUpdate(id, req.body, { new:true }) /* update model in the database */
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const product = await User.findByIdAndDelete(id)
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