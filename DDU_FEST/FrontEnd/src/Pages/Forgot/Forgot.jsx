import React, { useState } from 'react'
import "./forgot.css"
import axios from 'axios';
import { useNavigate  } from "react-router-dom";
import { useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';



const Forgot = () => {
  const emailforotp = useRef();
  const newpassword = useRef();
  const code = useRef();
  const Conformnewpassword = useRef();
  const [wrongemail, setWrongemail] = useState(false);
  const [changepass, setChangepass] = useState(false);
  const [email, setEmail] = useState("");
  const [text,setText]=useState('');


  const loginnav=useNavigate()
  const handleotp = async (e) => {
    e.preventDefault();
    const dataemail = {
      email: emailforotp.current.value,

    }
    setEmail(emailforotp.current.value)
    const res = await axios.post("user/sendemail", dataemail);
   
    if (res.data ==="pls check your email for otp") {
      setChangepass(true);
    }
    else {
      setWrongemail(true);
    }
  }



  const submitnewpass = async (e) => {
    e.preventDefault();
    if (Conformnewpassword.current.value !== newpassword.current.value) {
     
      setText("pasword not match");
    }
    else {
      const user = {
        email: email,
        otpcode:code.current.value,
        password: newpassword.current.value,
      }

      const res = await axios.post("user/changepass", user);
      if (res.data === "password changed successfully") {
        loginnav("/login");
      }
      else 
      {
        setText(res.data);
      }
      
    }

  }




  return (
    <div>
      <Navbar/>
      <div className="otp-page">
        

       {!changepass && <form className="otp-form" onSubmit={handleotp}>
          {wrongemail && <h3>email  is worng</h3>}
          <label >Email</label>
          <input className="otp-input" type="email" ref={emailforotp} placeholder="Enter your email..." />
          <button className="otp-btn" type='submit'>generate otp</button>
        </form> }
      

      {changepass && <form className="otp-form" onSubmit={submitnewpass}>
        <h3>{text}</h3>
        <label >Otp</label>
        <input className="otp-input" type="text" required ref={code} placeholder="Enter your Otp..." />
        <label >Password</label>
        <input className="otp-input" type="password" required ref={newpassword} placeholder="Enter your password..." />
        <label >Conform Password</label>
        <input className="register-input" type="password" ref={Conformnewpassword} placeholder="Enter your password again..." />
        <button className="otp-btn" type='submit'>change password</button>
      </form>}
      </div>
    </div>
  )
}

export default Forgot