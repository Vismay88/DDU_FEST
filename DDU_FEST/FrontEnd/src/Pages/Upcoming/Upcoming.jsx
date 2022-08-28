import React, { useState, useEffect, useRef } from 'react'
import Events from "../../components/Events/Events";
import axios from 'axios';
import "./upcoming.css"
import Navbar from '../../components/Navbar/Navbar';
import Loading from '../../components/Loading/Loading';


const Upcoming = () => {
    const [event, setEvent] = useState([]);
    const [allevents, setAllEvents] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [Load, setLoad] = useState(true);
    const [isfill, setIsfill] = useState(false);
  
    const[allcat,setallCat]=useState([]);

    const [uevent, setUevent] = useState('');
    const [banner, setBanner] = useState(null)

    const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
     
     const close=useRef('')
    



    const [pastevent, setPastevent] = useState([]);
    const [pastLoad, setPastload] = useState(true);

    useEffect(() => {

        const fetchEvents = async () => {

            const res = await axios.post("/event/pastevent");
            setPastevent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setPastload(false);
        };

        fetchEvents();
    }, [])

    const ref = useRef('');

    const updatehandle = (Ev) => {
        ref.current.click();
        setUevent(Ev)
    }
    const handleupdatetevent = async (e) => {
        e.preventDefault();
        if (banner) {
           
            const data = new FormData();
            const filename = Date.now() + banner.name;
            data.append("name", filename);
            data.append("file", banner);
            data.append("upload_preset",CLOUD_PRESET);
            data.append("cloud_name",CLOUD_NAME);
            try {
                const cres=await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)
               
                uevent.banner=cres.data.url;
               

            } catch (error) {
                console.log(error);
            }

        }
        try {
            await axios.put(`/event/${uevent._id}`, uevent);
           

        } catch (error) {
            console.log(error);
        }

       
         for(let index=0;index<allevents.length;index++)
         {
             const element=allevents[index]
             if(element._id===uevent._id)
             {
                allevents[index]=Object.assign(uevent);
                break;
             }
             
         }
         setAllEvents(allevents);
         
         for(let index=0;index<filtered.length;index++)
         {
             const element=filtered[index]
             if(element._id===uevent._id)
             {
                filtered[index]=Object.assign(uevent);
                break;
             }
             
         }
          setFiltered(filtered);
          const temp= [...new Set(allevents.map((e) => { return e.category; }))];
          setallCat(temp);
         var today = new Date();
         var dd = String(today.getDate()).padStart(2, '0');
         var mm = String(today.getMonth() + 1).padStart(2, '0');
         var yyyy = today.getFullYear();
         today = yyyy + '-' + mm + '-' + dd;
         let up_updated=[];
         for(let idx=0;idx<allevents.length;idx++)
         {
             if(allevents[idx].datee>=today)
             {
                up_updated.push(allevents[idx]);
             }
         }
         
         setEvent(up_updated);
         let past_updated=[];
         for(let idx=0;idx<allevents.length;idx++)
         {
             if(allevents[idx].datee<today)
             {
                past_updated.push(allevents[idx]);
             }
         }
         
         setPastevent(past_updated);
       
       
        close.current.click();
        closeclick();
         alert("event updated successfully");
       
    }
    const handlechange = (e) => {
        setUevent({ ...uevent, [e.target.name]: e.target.value });
    }



    const handledelete = async (id) => {
        if (window.confirm('Are you want to delete this event?')) {
            const res = await axios.delete(`/event/${id}`)
         
            const remaining_upcoming= event.filter((ev)=>{return ev._id!==id})
            const remaining_past= pastevent.filter((ev)=>{return ev._id!==id})
            const remaining_filtered= filtered.filter((ev)=>{return ev._id!==id})
            setEvent(remaining_upcoming);
            setPastevent(remaining_past);
            setFiltered(remaining_filtered)
            setAllEvents([...remaining_upcoming,...remaining_past]);
            const temp=[...remaining_upcoming,...remaining_past]
            const new_cat_temp=[...new Set(temp.map((e) => { return  e.category }))];

            setallCat(new_cat_temp);
            
            alert(res.data)
        } 

    }



    useEffect(() => {
        const fetchEvents = async () => {

            const res = await axios.post("/event/upcoming_events");
            setEvent(res.data.sort((p1, p2) => {
                return new Date(p1.datee) - new Date(p2.datee);
            }));
            setLoad(false);
        };
        fetchEvents();
    }, [])


    useEffect(() => {
        const fetchallEvents = async () => {

            const res = await axios.post("/event/all_events");
            setAllEvents(res.data);
            const temp= [...new Set(res.data.map((e) => { return e.category; }))];
            setallCat(temp);
        };
        fetchallEvents();
    }, [])

    const imgbanner=useRef('');
   const closeclick=()=>{
       setBanner(null);
       imgbanner.current.value = "";
   }

   

  
    const handlecat = (e) => {
        const fill = allevents.filter((event) => event.category === e.target.value);
        setFiltered(fill);
        setIsfill(true);
    }


    return (
        <div className='event_page'>

            <div>


                <button type="button" ref={ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content">
                            <div className="modal-header ">
                                <button type="button" ref={close} onClick={closeclick} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <div className="wrapper">
                                    {/* {created && <div className="title-event">event created succsessfully</div>} */}
                                    <div className="title-event">Update Event</div>
                                    <form action="" className="form" onChange={handlechange} onSubmit={handleupdatetevent}>
                                        <div className="inputfield">
                                            <label >Title</label>
                                            <input type="text" name="title" required defaultValue={uevent.title} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Category</label>
                                            <input type="text" name="category" defaultValue={uevent.category} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Resource Person Name</label>
                                            <input type="text" name="rp_name" defaultValue={uevent.rp_name} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Organization</label>
                                            <input type="text" name="organization" defaultValue={uevent.organization} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Description</label>
                                            <textarea type="text" name="desc" defaultValue={uevent.desc} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Venue</label>
                                            <input type="text" name="venue" defaultValue={uevent.venue} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Date </label>
                                            <input type="date" name="datee" defaultValue={uevent.datee} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >time </label>
                                            <input type="time" name="time" defaultValue={uevent.time} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >organized by </label>
                                            <input type="text" name="org_by" defaultValue={uevent.org_by} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Technical body </label>
                                            <input type="text" name="tech_body" defaultValue={uevent.tech_body} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Coordinator</label>
                                            <input type="text" name="coordinator" defaultValue={uevent.coordinator} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label >Fees</label>
                                            <input type="number" name="fees" defaultValue={uevent.fees} className="input" />
                                        </div>
                                        <div className="inputfield">
                                            <label htmlFor="photo">Banner</label>
                                            <input id="photo" name="banner" type="file" style={{ color: "white" }} ref={imgbanner} className="file_photo" accept=".png,.jpeg,.jpg" onChange={(e) => setBanner(e.target.files[0])} />
                                        </div>
                                        <div className="inputfield">
                                            <input type="submit" className="btn" value="Save changes" />
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


            </div>

            <Navbar />

            <div>

            
                <div className='d-flex justify-content-start mt-4 mx-5'>

                    <label className=' fs-2 fw-bold' htmlFor="events">Filter by category:</label>

                    <select onChange={handlecat} className='mx-2 filter  event_select   border rounded border-info' name="events" id="events">
                        <option defaultValue="none">Select an Option</option>
                        {/* bg-info */}
                        {allcat.map((item) => {
                            return <option key={item}  >{item}</option>
                        })}

                    </select>
                </div>
            </div>
            {isfill && <div className='Home_events events_head'>
                {filtered.length !== 0 && <h3>Filtered events</h3>}
                {filtered.length !== 0 && filtered.map((e) => (
                    <Events key={e._id} Event={e} updatehandle={updatehandle} handledelete={handledelete}/>
                ))}
            </div>}
            {(Load) ? <Loading /> : <div className="Home_events events_head" >
                <h3>Upcoming  Events</h3>

                <div>
                    {event.map((e) => (
                        <Events key={e._id} Event={e} updatehandle={updatehandle} handledelete={handledelete} />
                    ))}
                </div>

            </div>}
            <div className="past_events events_head" >

                <div>

                    {(pastLoad) ? <Loading /> :
                        <div>
                            <h3>Past  Events</h3>
                            {pastevent.map((e) => (
                                <Events key={e._id} Event={e} updatehandle={updatehandle} handledelete={handledelete}/>
                            ))}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Upcoming