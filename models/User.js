const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    dob:{type:Date,require:true},
    name:{type:String},
    pincode:{type:String},
    city:{type:String},
    state:{type:String},
    phone:{type:String},
    password: {type:String,required:true},
    
  },{timestamps:true});

  mongoose.models = {}
  export default mongoose.model("User",UserSchema)