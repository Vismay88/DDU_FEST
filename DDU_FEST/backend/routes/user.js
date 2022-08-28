const router =require("express").Router();
const User=require("../models/User");
const Event=require("../models/Event");
const Otp=require("../models/Otp")
const bcrypt=require("bcrypt");
const nodemailer=require('nodemailer');
const e = require("express");
require("dotenv").config();

const sendgridTransport = require('nodemailer-sendgrid-transport');

//otp emailer
 const mailer=(email,otp)=>{
   
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: process.env.API_KEY  
              }
    }));
      const mailoptions={
          to:email,
          from:process.env.SENDER_EMAIL,
          subject:'change password request',
          text:`your otp for reset password:${otp.code}`
      }
      transporter.sendMail(mailoptions,(err,info)=>{
          if(err)
          {
              console.log(err)
          }
          else{
              console.log('email sent:');
          }
      })
 }

//participation mailer

const particpation_mail=(email,title)=>{
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: process.env.API_KEY  
              }
    }));
      const mailoptions={
         from:process.env.SENDER_EMAIL,
          to:email,
          subject:'Participated successfully',
          text:`thank you for participate in ${title}`
      }
      transporter.sendMail(mailoptions,(err,info)=>{
          if(err)
          {
              console.log(err)
          }
          else{
              console.log('email sent:');
          }
      })
 }




router.post("/register",async (req,res)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const hashed= await bcrypt.hash(req.body.password,salt);
        const user =await User.findOne({email:req.body.email});
        const userbyuname=await User.findOne({username:req.body.username});
        if(!user && !userbyuname)
        {
            const newUser=new User({
                username:req.body.username,
                name:req.body.name,
                email:req.body.email,
                role:"participant",
                password:hashed,
            })
        const user=await newUser.save();
        res.status(200).json(user);
        }
        else if(userbyuname && user)
        {
            res.send("already regisered pls login");
        }
        else if(user)
        {
            res.send("already regisered pls login");
        }
        else
        {
            res.send("username already taken")
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
})
router.post("/login",async (req,res)=>{
    try{

        const user =await User.findOne({email:req.body.email});
        const validpassword =await bcrypt.compare(req.body.password,user.password)
       
        if(!user || !validpassword)
        {
            res.send("email or password  is worng");
        }
        else{

            res.status(200).json(user)
        }
        
    } catch(err){
        res.send("email or password  is worng");
    }
});


router.post("/sendemail",async (req,res)=>{
       try {
        const user =await User.findOne({email:req.body.email});
        if(user)
        {
            const otpcode=Math.floor((Math.random()*10000)+1);
            const newotp=new Otp({ 
                email:req.body.email,
                code:otpcode,
                expireIn:new Date().getTime()+(300*1000)  
            })
            const otp= await newotp.save();
            mailer(user.email,otp);
            res.send("pls check your email for otp");
        }
        else
        {
            res.send("email not exist");
        }
       } catch (error) {
        res.status(500).json(error);
       }
        
    
})

router.post("/changepass",async (req,res)=>{
    try {
        const data=await Otp.findOne({email:req.body.email,code:req.body.otpcode})
        if(data)
        {
            const curtime=new Date().getTime();
            const diff=data.expireIn-curtime;
          
            if(diff<0)
            {
               res.send("opt expired")
            }
            else
            {
                const user=await User.findOne({email:req.body.email});
                const salt= await bcrypt.genSalt(10);
                const hashed= await bcrypt.hash(req.body.password,salt);
                user.password=hashed;
                user.save();
                res.send("password changed successfully")
            }
        }
        else
        {
            res.send("otp is wrong")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//participate event
router.post("/participate",async (req,res)=>{
    try {
        const user= await User.findById(req.body.uid);
        const event=await Event.findById(req.body.eid)
        await user.updateOne({$push:{myevents:req.body.eid}})
        await event.updateOne({$push:{participants:req.body.uid}})

        particpation_mail(user.email,event.title);
        res.status(200).json("participated successfully")
      
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports=router;