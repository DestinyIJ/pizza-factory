import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";


export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        let user = await User.findOne({
            email: req.body.email,
        })
        if(user) {
            return response.status(400).json({ error: 'user already exist', success: false })  
        } 
        user = await User.create(req.body) /* create a new model in the database */
        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}