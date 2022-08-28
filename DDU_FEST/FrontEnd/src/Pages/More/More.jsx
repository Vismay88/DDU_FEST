import "./more.css"
import React, { useEffect, useRef, useState,useContext } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import Loading from '../../components/Loading/Loading';
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";


const More = () => {
  

    const refimg = useRef('');
    const [cimage, setCimage] = useState('');
    const {pathname}=useLocation();
    const id=pathname.substring(6);
    const {user}= useContext(AuthContext)


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;


    const [event, setEvent] = useState({});
    const [Load, setLoad] = useState(true);
    const [certis, setCertis] = useState([]);

    useEffect(() => {
        const getevent = async () => {
            const res = await axios.get(`/event/${id}`)
            setEvent(res.data);
            setLoad(false);
        }
        getevent();
    }, [id])

    useEffect(() => {
        const getcertificates = async () => {
            const res = await axios.get(`/certificate/${id}`)
            setCertis(res.data);
        }
        getcertificates();
    }, [id])

    const clickimg = (img) => {
        refimg.current.click();
        setCimage(img);
    }

    return (<div>
        <Navbar />
        <div>
            <button type="button" ref={refimg} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                                <img className="certi_big_img"  src={cimage} alt="" />

                        </div>

                    </div>
                </div>
            </div>


        </div>

        {(Load) ? <Loading /> :
            <div className="data_event">
                <div className="event_data">
                    <img src={event.banner} alt="banner" className="event_image" />
                    <div className="other_data container">
                        <div className="event_title">{event.title}</div>
                        <table>
                            <tbody>


                                <tr>
                                    <td className="row_name" >Category</td>
                                    <td>{event.category}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Resource Person Name</td>
                                    <td>{event.rp_name}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Organization</td>
                                    <td>{event.organization}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Description</td>
                                    <td>{event.desc}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Venue</td>
                                    <td>{event.venue}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Date</td>
                                    <td>{event.datee}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">time</td>
                                    <td>{event.time}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">organized by</td>
                                    <td>{event.org_by}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Technical body </td>
                                    <td>{event.tech_body}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Coordinator </td>
                                    <td>i{event.coordinator}</td>

                                </tr>
                                <tr>
                                    <td className="row_name">Fees </td>
                                    <td>{event.fees}</td>

                                </tr>
                              { user!=null && user.role==="admin" && <tr>
                                    <td className="row_name">participants </td>
                                    <td>{event.participants.length}</td>

                                </tr>}
                            </tbody>
                        </table>

                    </div>
                </div> 
                
                {event.datee < today && certis.length !== 0 && <div className="certificate_container">
                    <h3 className="certi_title">  Certificates  </h3>
                    <div className="row certis">

                        {certis.map((e) => (
                            <div key={e.certificate} className="col-md-6 certificate_img">
                                <div className="d-flex justify-content-center">
                                    <h2 className="certi_name bg-dark text-white p-3 rounded-circle">{e.name}</h2>
                                </div>
                                <img onClick={() => { clickimg( e.certificate) }} src={ e.certificate} className="event_image" alt="..." />
                            </div>
                        ))}
                    </div>
                </div>}
            </div>}
    </div>);
};

export default More;
