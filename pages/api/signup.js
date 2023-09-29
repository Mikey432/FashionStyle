import connectDb from "../../middlewear/mongoose.js"
import User from "../../models/User.js"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == "POST") {
        const {name,email} = req.body
        let u = new User({name,email,password:CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()})
        await u.save()
        res.status(200).json({ success:"success"})
    }
    else {
        res.status(400).json({ error: "this method is incorrect" })
    }
}
export default connectDb(handler)
