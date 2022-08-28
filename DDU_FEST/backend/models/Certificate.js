const mongoose=require('mongoose');

const CertificateSchema=new mongoose.Schema({
    userId:{
        type: String,
    },
    eventId:{
        type: String,
    },
    name:{
        type: String,
    },
    certificate:{
        type: String,
    }
})

module.exports= mongoose.model("Certificate",CertificateSchema);