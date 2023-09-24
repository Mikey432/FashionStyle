import connectDb from "../middlewear/mongoose.js"
import Product from "../models/Product.js"

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]) 
        }
        
        res.status(200).json({ success:"success"})
    }
    else {
        res.status(400).json({ error: "this method is incorrect" })
    }
}
export default connectDb(handler)
