const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      role:{
        type: String,
        require: true,
      },
      name: {
        type: String,
        require: true,
        min: 3,
        max: 20,
      },
      email: {
        type: String,
        required: true,
        max: 50, 
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      myevents:{
        type:Array,
        default:[]
    }
})

module.exports=mongoose.model("User",UserSchema);