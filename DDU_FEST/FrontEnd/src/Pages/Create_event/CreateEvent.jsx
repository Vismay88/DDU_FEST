import "./create_event.css"

import React, { useContext, useRef, useState } from 'react';
import Navbar from "../../components/Navbar/Navbar";
import Notfound from "../../components/Notfound/Notfound";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {


    const { user } = useContext(AuthContext)
    const navigate=useNavigate();
    const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

    const title = useRef();
    const category = useRef();
    const rp_name = useRef();
    const organization = useRef();
    const desc = useRef();
    const venue = useRef();
    const datee = useRef();
    const time = useRef();
    const org_by = useRef();
    const tech_body = useRef();
    const coordinator = useRef();
    const fees = useRef();
    const [banner, setBanner] = useState(null)


    const handlecreatevent = async (e) => {
        e.preventDefault();
        const newevent = {
            title: title.current.value,
            category: category.current.value,
            rp_name: rp_name.current.value,
            organization: organization.current.value,
            desc: desc.current.value,
            venue: venue.current.value,
            time: time.current.value,
            datee: datee.current.value,
            org_by: org_by.current.value,
            tech_body: tech_body.current.value,
            coordinator: coordinator.current.value,
            fees: fees.current.value,
            banner: null,
        }
        if (banner) {
            const data = new FormData();
            const filename = Date.now() + banner.name;
            data.append("name", filename);
            data.append("file", banner);
            data.append("upload_preset",CLOUD_PRESET);
            data.append("cloud_name",CLOUD_NAME);
            try {
                const cres=await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)
              
                newevent.banner=cres.data.url;
            } catch (error) {
                console.log(error);
            }

        }
        try {
            await axios.post("/event/create", newevent)
            
            alert("event created successfully");
        } catch (error) {
            console.log(error);
        }
        navigate("/events")

    }


    return (
        <div>
            {(user != null && user.role === "admin") ?
                <div>

                    <Navbar />
                    <div className="create_event_container">
                        <div className="wrapper">
                            {/* {created && <div className="title-event">event created succsessfully</div>} */}
                            <div className="title-event">Create Event</div>
                            <form action="" className="form" onSubmit={handlecreatevent}>
                                <div className="inputfield">
                                    <label >Title</label>
                                    <input type="text" required ref={title} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Category</label>
                                    <input type="text" ref={category} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Resource Person Name</label>
                                    <input type="text" ref={rp_name} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Organization</label>
                                    <input type="text" ref={organization} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Description</label>
                                    <textarea type="text" ref={desc} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Venue</label>
                                    <input type="text" ref={venue} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Date </label>
                                    <input type="date" ref={datee} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >time </label>
                                    <input type="time" ref={time} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >organized by </label>
                                    <input type="text" ref={org_by} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Technical body </label>
                                    <input type="text" ref={tech_body} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Coordinator</label>
                                    <input type="text" ref={coordinator} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label >Fees</label>
                                    <input type="number" ref={fees} className="input" />
                                </div>
                                <div className="inputfield">
                                    <label htmlFor="photo">Banner</label>
                                    <input id="photo" type="file" style={{ color: "white" }} className="file_photo" accept=".png,.jpeg,.jpg" onChange={(e) => setBanner(e.target.files[0])} />
                                </div>
                                <div className="inputfield">
                                    <input type="submit" className="btn" value="Create Event" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div> :
                <Notfound />}
        </div>
    );
};