import "./home.css"
import React from 'react';
import Navbar from "../../components/Navbar/Navbar"
import { Link } from "react-router-dom";
import { useRef } from "react";

const Home = () => {
    const about = useRef()

   const aboutclick=()=>{
    about.current.scrollIntoView({ behavior: 'smooth' })
   }


    return (
        <div>
            <Navbar />
            <section className="banner-area">
                <div className="banner-img"></div>
                <h1>Welcome to DDU Events</h1>
                <h3>Participate to Events</h3>
                
                <Link onClick={aboutclick} className="banner-btn" to="/" > About Us</Link>
            </section>

             

           
            <section ref={about} className="about-area" id="about">
                <h3 className="section-title" ref={about}>About Us</h3>
                <ul className="about-content">
                    <li className="about-left"></li>
                    <li className="about-right">
                        <p>Dharmsinh Desai University (DDU) formerly known as Dharmsinh Desai Institute of Technology (DDIT) is a state funded institution in Nadiad, Gujarat, India and was founded on 2 January 1968. </p>
                        <p>Dharmsinh Desai Institute of Technology was founded in 1968 by Dharmsinh Desai, who then was a member of Parliament, as an institution of higher learning in the field of Engineering and Technology. It achieved autonomous status under Gujarat University in 1991, and Deemed University status in June 2000. </p>
                    </li>
                </ul>
            </section>
            <section className="contact-area" id="contact">
                <h3 className="section-title">Contact</h3>
                <ul className="contact-content">
                    <li>
                        <i className="fa fa-map-marker"></i>
                        <p>College Road, Nadiad  387 001 ,<br />
                     Gujarat, India</p>
                    </li>
                    <li>
                        <i className="fa fa-phone"></i>
                        <p>+123 456 789<br />
                            +789 456 123</p>
                    </li>
                    <li>
                        <i className="fa fa-envelope"></i>
                        <p>info@saffron.com<br />
                            yourdomain@website.com</p>
                    </li>
                </ul>
            </section>
           
            <footer>
                <p>All Right Reserved &copy; copyright 2022</p>
            </footer>
        </div>

    );
};

export default Home;
