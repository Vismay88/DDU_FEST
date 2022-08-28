const mongoose=require('mongoose');

const EventSchema=new mongoose.Schema({
    title:{
        type: String,
    },
    category:{
        type: String,
    },
    rp_name:{
        type: String,
    },
    organization:{
        type: String,
    },
    desc:{
        type: String,
    },
    venue:{
        type: String,
    },
    datee:{
        type: String,
        
    },
    time:{
        type:String,
      
    },
    org_by:{
        type:String,
    },
    tech_body:{
        type:String,
    },
    coordinator:{
        type:String,
    },
    fees:{
        type:String,
    },
    banner:{
        type:String,
     
    },
    participants:{
        type:Array,
        default:[]
    },
    uploaded:{
        type:Array,
        default:[]
    }
})

module.exports= mongoose.model("Event",EventSchema);