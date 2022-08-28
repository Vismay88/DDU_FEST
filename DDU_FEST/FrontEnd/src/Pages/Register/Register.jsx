import "./register.css"
import { Link } from "react-router-dom";
import React from 'react';
import { useNavigate  } from "react-router-dom";
import axios from 'axios';
import  { useRef,useState } from 'react'
import Navbar from "../../components/Navbar/Navbar";

const  Register = () => {
  const username=useRef();
    const email=useRef();
     const password=useRef();
     const Conformpassword=useRef();
     const Name=useRef();
     const navigate=useNavigate();
     const[exist,setExist]=useState(false);
     const[existusername,setExistusername]=useState(false);
   

     const submitHandler= async (e)=>{
        e.preventDefault();
        if(Conformpassword.current.value!==password.current.value)
        {
            Conformpassword.current.setCustomValidity("passwords Don't match!!!")
        }
        else
        {
            const user={
                username:username.current.value,
                name:Name.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            let res;
            try {
            res= await axios.post("user/register",user);
            if(res.data === "username already taken")
            {
                setExistusername(true);
                if(exist)
                {
                    setExist(false);
                }
                
            }
            else if(res.data==="already regisered pls login")
            {
                setExist(true);
                if(existusername)
                {
                    setExistusername(false);
                }
               
            }
            else
            {
                navigate("/login");
            }
            } catch (error) {
              setExist(true)
                console.log(error);
            }
            
        }
    }
  return ( 
      <div> 
          <Navbar/>
     <div className="register-page">
  <span className="register-title">Register</span>
      {exist  && <h1>already registered pls login</h1>} 
       {existusername && <h1>username already taken pls take another</h1>}
     
  <form className="register-form" onSubmit={submitHandler}>
  <label >Username</label>
      <input className="register-input" type="text"  required ref={username}  placeholder="Enter your username..." />
  <label >Name</label>
      <input className="register-input" type="text"  required ref={Name}  placeholder="Enter your username..." />
      <label >Email</label>
      <input className="register-input" type="email"  required ref={email}  placeholder="Enter your email..." />
      <label >Password</label>
      <input className="register-input" type="password" required ref={password}  placeholder="Enter your password..." />
      <label >Conform Password</label>
      <input className="register-input" type="password" ref={Conformpassword}  placeholder="Enter your password again..." />
  <button className="register-btn-rg" type="submit" >Register</button>
  </form>
    <Link className="link" to="/login" >  <button className="login-btn-rg">Login</button></Link>
    </div>
</div>);
};
export default Register;

