var jwt = require('jsonwebtoken');
import connectDb from "../middlewear/mongoose"
import User from '../models/User'

const handler = async(req, res)=> {
    if(req.method=='POST'){
        let token = req.body.token
        let payload = jwt.decode(token)
        let user = jwt.verify(payload,"jwtsecretkey")
        let dbuser = await User.findOne({email:user.email})
        res.status(200).json({user:dbuser})
    }
    else{
        res.status(400).json({error:"error"})
    }
  }

export default connectDb(handler)
  