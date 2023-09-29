import connectDb from "../../middlewear/mongoose"
import Order from "../../models/Order"

const handler = async (req, res) => {
    if (req.method == "POST") {
        let order = new Order({
            email:req.body.email,
            OrderId:req.body.oid,
            amount:req.body.subTotal,
            address:req.body.address,
            city:req.body.city,
            state:req.body.state,
            name:req.body.state,
            pincode:req.body.pincode,
            phone:req.body.phone,
            products:req.body.cart
        })
        await order.save()
        res.status(200).json({ success:"success"})
    }
    else{
        res.status(400).json({ error: "this method is incorrect" })
    }
}


export default connectDb(handler)