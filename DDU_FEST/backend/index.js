const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
app.use(express.json());
require("dotenv").config();
const multer =require("multer");
const path=require("path");

const userRoute=require('./routes/user');
const eventRoute=require('./routes/event');
const certificateRoute=require('./routes/certificate');

app.use("/images",express.static(path.join(__dirname,"public/images")))


mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("connected to mongodb");
});

app.listen(3001,()=>{
    console.log("backend server is started");
})

// const storage =multer.diskStorage({
//     destination:(req,file,cb)=>{
//      cb(null,"public/images");
//     },
//     filename:(req,file,cb)=>{
//         cb(null,req.body.name);
//     },
// })

// const upload=multer({storage:storage });
// upload.single("file"),
app.post("/api/upload",(req,res)=>{
    try {
     
        return res.status(200).json("file uploaded successfully");
    } catch (err) {
        console.log(err);
    }
});

app.use("/api/user",userRoute);
app.use("/api/event",eventRoute);
app.use("/api/certificate",certificateRoute);