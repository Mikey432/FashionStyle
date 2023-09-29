var jwt = require('jsonwebtoken');
import connectDb from "../../middlewear/mongoose"
import User from '../../models/User'

const handler= async(req, res)=> {
    if(req.method=='POST'){
        let token = req.body.token
        let user = jwt.verify(token.toString(),'jwtsecretkey')
        let dbuser = await User.findOneAndUpdate({email:user.email},{address:user.address,pincode:user.pincode,phone:user.phone,name:user.name})
        let {email,address,phone,pincode,name} = dbuser
        res.status(200).json({email,address,phone,pincode,name})
    }
    else{
        res.status(400).json({error:"error"})
    }
  }

export default connectDb(handler)
  