import "./events.css"
import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


const Events = ({ Event, updatehandle, handledelete }) => {
    const { user } = useContext(AuthContext)

    const ispart = (Event.participants.includes(user?._id));
    const [certificateimg, setCertificateimg] = useState(null)
    const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    const ispartuploaded = (Event.uploaded.includes(user?._id));


    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;



    const participate = async () => {
        const partipate_data = {
            uid: user._id,
            eid: Event._id
        }
        if (window.confirm('Are you want to participate?')) {
            const res = await axios.post("/user/participate", partipate_data)
            if (!alert(res.data)) { window.location.reload(); }
        }
    }


    

    const certificateupload = async (e) => {
        e.preventDefault();
        const newcerti = {
            userId: user._id,
            eventId: Event._id,
            name: user.name,
            certificate: null,
        }
        if (certificateimg) {
            const data = new FormData();
            const filename = Date.now() + certificateimg.name;
            data.append("name", filename);
            data.append("file", certificateimg);
            data.append("upload_preset",CLOUD_PRESET);
            data.append("cloud_name",CLOUD_NAME);
            try {
                const cres=await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)
               
                newcerti.certificate=cres.data.url;
            } catch (error) {
                console.log(error);
            }

        }
        try {
            await axios.post("/certificate/certificate_upload", newcerti)
            alert("Certificate uploaded successfully");
        } catch (error) {
            console.log(error);
        }
        window.location.reload();


    }

    return (
        <div className="event_card ">


            <div className="event-conatainer">
                <div className="image">

                    <img src={Event.banner} className="photo" alt="" />

                </div>
                <div className="detail">
                    <div className="title">{Event.title}</div>
                    <div className="event-data">

                        <div className="time">Date:{Event.datee}</div>
                        <div className="category">{Event.category}</div>
                    </div>
                    <div className="discription">{Event.desc}</div>

                    <div className="btns">
                        {user != null && user.role !== "admin" && !ispart && Event.datee >= today && <button type="button" onClick={participate} className="btn btn-danger">Paricipate</button>}
                        {user != null && user.role !== "admin" && ispart && Event.datee >= today && <button type="button" className="btn btn-secondary btn-lg" disabled>participated</button>}
                        {user != null && user.role === "admin" && <div onClick={() => { updatehandle(Event) }} className="edit"><i className="fas fa-edit"></i></div>}
                        {user != null && user.role === "admin" && <div className="dlt" onClick={() => handledelete(Event._id)}><i className="fas fa-trash"></i></div>}
                        {user != null && ispart && !ispartuploaded && user.role !== "admin" && Event.datee < today && <form className="d-flex flex-column " onSubmit={certificateupload}>
                            <input required type="file" accept=".png,.jpeg,.jpg" onChange={(e) => setCertificateimg(e.target.files[0])} />
                            <button type="submit" className="btn btn-secondary mt-2">Upload certificate</button>
                        </form>}
                        {ispartuploaded && <button type="submit" className="btn btn-secondary certificatebtn">certificate uploaded</button>
                        }
                        <Link to={`/more/${Event._id}`}><button type="button" className="btn btn-outline-primary">more</button></Link>
                    </div>
                </div>
            </div>




        </div>

    );
};

export default Events;