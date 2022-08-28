import React, { useState, useContext } from 'react';
import { useRef } from 'react'
import { Link } from 'react-router-dom';
import "./login.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
const Login = () => {
  const [wrong, setWrong] = useState(false);
  

  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)
  const submited = async (e) => {
    e.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    }

    try {
      const res = await axios.post("user/login", user);
      if (res.data === "email or password  is worng") {
        setWrong(true)

      }
      else {

        navigate("/");
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }


    } catch (error) {

      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }


  }

  return (
    <div>

      <Navbar/>
   
  <div className="login-page">
    <span className="login-title">Login</span>
    {wrong && <h3>email or password is worng</h3>}
    

    <form className="login-form" onSubmit={submited}>
      <label >Email</label>
      <input className="login-input" type="email" ref={email} placeholder="Enter your email..." />
      <label >Password</label>
      <input className="login-input" type="password" ref={password} placeholder="Enter your password..." />
      <Link to="/forgot" className='forgot'>forgot password ?</Link>
      <button className="login-btn" type='submit'>Login</button>
    </form>
    <Link className="link" to="/register" > <button className="register-btn-lg">Register</button></Link>
    </div>
  </div>);
};

export default Login;
