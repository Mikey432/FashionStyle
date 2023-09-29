import connectDb from "../../middlewear/mongoose.js"
import User from "../../models/User.js"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {
        let user = await User.findOne({"email":req.body.email})
        var bytes  = CryptoJS.AES.decrypt(user.password, 'secret key 123');
    var decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if(user){
            if(req.body.email == user.email && req.body.password == decryptedPass){
                var token = jwt.sign({ email:user.email,name:user.name }, 'jwtsecretkey',{expiresIn:"2d"});
                res.status(200).json({ success:true,token})
            }
            else{
                res.status(200).json({ success:false,error:"Invalid credentials"})
            }
        }
        else{
            res.status(200).json({ success:false,error:"No user found"})
        }
    }
    else {
        res.status(400).json({ error: "this method is incorrect" })
    }
}
export default connectDb(handler)
