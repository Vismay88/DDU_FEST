import React, {  useState,useContext } from 'react';
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {

   const[ismobile,setIsmobile]=useState(false);

   const {user}= useContext(AuthContext)
   const navigate=useNavigate();
       
      const LogoutClick=()=>{
         localStorage.clear();
         navigate("/")
         window.location.reload(false);

      }

   return (
      <nav className='navbar'>
         <h3 className='logo'>DDU_FEST</h3>
         <ul className={ismobile ? "nav-links-mobile":"nav-links"} onClick={()=>setIsmobile(false)}>
            <Link to='/' className='path'>
               <li>Home</li>
            </Link>
            <Link to='/events' className='path'>
               <li>Events</li>
            </Link>
            {user==null  && <Link to='/login' className='path'>
               <li>login</li>
            </Link> }
            {user!=null  && user.role==="admin" && <Link to='/create' className='path'>
               <li>Create Event</li>
            </Link> }
            {user!=null  && user.role==="admin" && <Link to='/report' className='path'>
               <li>Report</li>
            </Link> }
            {user!=null && <Link to='/profile'className='path'>
           <li><i className="profile fas fa-user-circle fa-lg"></i></li> 
            </Link>}
            {user!=null && <Link to='/'className='path'>
          <li onClick={LogoutClick}><i className="fas fa-sign-out-alt"></i></li>
            </Link>}
         </ul>
         <button onClick={()=>setIsmobile(!ismobile)} className='mobile-menu-icon' >
            {ismobile ? <i className="fas fa-times"></i>:<i className="fas fa-bars"></i> }
         </button>
      </nav>
   );
};

export default Navbar;
