import React, { useState, useRef, useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Exel } from '../../components/Exel/Exel';
import Notfound from "../../components/Notfound/Notfound";
import axios from 'axios';
import "./report.css"
import { AuthContext } from "../../context/AuthContext";


const Report = () => {
  const [filtered, setFiltered] = useState([]);
  const [isfiill, setIsfill] = useState(false);
  const from = useRef(null);
  const to = useRef(null);
  const fileName = "myfile";
  const { user } = useContext(AuthContext)

  const comp = (a, b) => {
    let c = parseInt(a["no"]);
    let d = parseInt(b["no"]);
    if (c < d) {
      return -1;
    }
    if (c > d) {
      return 1;
    }
    return 0;
  }


  const title_no = useRef('');
  const category_no = useRef('');
  const rp_name_no = useRef('');
  const organization_no = useRef('');
  const desc_no = useRef('');
  const venue_no = useRef('');
  const time_no = useRef('');
  const datee_no = useRef('');
  const org_by_no = useRef('');
  const tech_body_no = useRef('');
  const coordinator_no = useRef('');
  const fees_no = useRef('');
  const participants_no = useRef('');




  const title = useRef('');
  const category = useRef('');
  const rp_name = useRef('');
  const organization = useRef('');
  const desc = useRef('');
  const venue = useRef('');
  const time = useRef('');
  const datee = useRef('');
  const org_by = useRef('');
  const tech_body = useRef('');
  const coordinator = useRef('');
  const fees = useRef('');
  const participants = useRef('');








  const date_filter = async (e) => {
    e.preventDefault();
    const ob = {
      from: from.current.value,
      to: to.current.value
    }
    let temp = [];
    if (title_no.current.value !== '') {
      let name = title.current.value;
      if (name === '') {
        name = "title"
      }
      let obj = {};
      obj["no"] = title_no.current.value;
      obj['name'] = "title"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (category_no.current.value !== '') {
      let name = category.current.value;
      if (name === '') {
        name = "category"
      }
      let obj = {};
      obj["no"] = category_no.current.value;
      obj['name'] = "category"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (rp_name_no.current.value !== '') {
      let name = rp_name.current.value;
      if (name === '') {
        name = "rp_name"
      }
      let obj = {};
      obj["no"] = rp_name_no.current.value;
      obj['name'] = "rp_name"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (organization_no.current.value !== '') {
      let name = organization.current.value;
      if (name === '') {
        name = "organization"
      }
      let obj = {};
      obj["no"] = organization_no.current.value;
      obj['name'] = "organization"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (desc_no.current.value !== '') {
      let name = desc.current.value;
      if (name === '') {
        name = "desc"
      }
      let obj = {};
      obj["no"] = desc_no.current.value;
      obj['name'] = "desc"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (venue_no.current.value !== '') {
      let name = venue.current.value;
      if (name === '') {
        name = "venue"
      }
      let obj = {};
      obj["no"] = venue_no.current.value;
      obj['name'] = "venue"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (time_no.current.value !== '') {
      let name = time.current.value;
      if (name === '') {
        name = "time"
      }
      let obj = {};
      obj["no"] = time_no.current.value;
      obj['name'] = "time"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (datee_no.current.value !== '') {
      let name = datee.current.value;
      if (name === '') {
        name = "datee"
      }
      let obj = {};
      obj["no"] = datee_no.current.value;
      obj['name'] = "datee"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (org_by_no.current.value !== '') {
      let name = org_by.current.value;
      if (name === '') {
        name = "org_by"
      }
      let obj = {};
      obj["no"] = org_by_no.current.value;
      obj['name'] = "org_by"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (tech_body_no.current.value !== '') {
      let name = tech_body.current.value;
      if (name === '') {
        name = "tech_body"
      }
      let obj = {};
      obj["no"] = tech_body_no.current.value;
      obj['name'] = "tech_body"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (coordinator_no.current.value !== '') {
      let name = coordinator.current.value;
      if (name === '') {
        name = "coordinator"
      }
      let obj = {};
      obj["no"] = coordinator_no.current.value;
      obj['name'] = "coordinator"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (fees_no.current.value !== '') {
      let name = fees.current.value;
      if (name === '') {
        name = "fees"
      }
      let obj = {};
      obj["no"] = fees_no.current.value;
      obj['name'] = "fees"
      obj["customname"] = name;
      temp.push(obj)
    }
    if (participants_no.current.value !== '') {
      let name = participants.current.value;
      if (name === '') {
        name = "participants"
      }
      let obj = {};
      obj["no"] = participants_no.current.value;
      obj['name'] = "participants"
      obj["customname"] = name;
      temp.push(obj)
    }
    const newres = await axios.post("/event/report", ob);
    temp.sort(comp);

    const newans = [];
    newres.data.forEach((ev) => {

      let tempans = {};
      temp.forEach((cur) => {
        let st = cur["name"]
        let newname = cur["customname"]

        tempans[newname] = ev[st];

      })

      newans.push(tempans);

    })
    if (temp.length === 0) {
      setFiltered(newres.data);
    }
    else {
      setFiltered(newans);
    }
    setIsfill(true);

  }


  return (
    <div>
      {(user != null && user.role === "admin") ?
        <div>
          <Navbar />

          <div className="  card text-center">
            <div className="card-header fs-1">
              Generate Report
            </div>
            <div className="card-body">
              <h5 className="card-title fs-3 fw-bold">Select date</h5>
              <form className="row g-3  " onSubmit={date_filter}>
                <div className='col-12 d-flex  justify-content-center '>
                  <div className='w-50 d-flex  flex-column align-items-center bg-dark text-white'>
                    <div className="col-md-4 ">
                      <label htmlFor="inputfrom" className="form-label my-3 fs-5">From</label>
                      <input type="date" required ref={from} className="form-control text-center" id="inputfrom" />
                    </div>
                    <div className="col-md-4  mb-5">
                      <label htmlFor="inputto" className="form-label my-3 fs-5">TO</label>
                      <input type="date" required ref={to} className="form-control text-center" id="inputto" />
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center ">

                  <div className='d-flex  flex-column  justify-content-center border-dark border bg-dark text-white pe-4'>
                    <h5 className="card-title mt-5 fs-3 fw-bold">Customize columns</h5>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>title</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={title_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-md-4 ">
                        <input type="text" ref={title} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>Category</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={category_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={category} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>rp_name</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={rp_name_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={rp_name} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>organization</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={organization_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={organization} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>desc</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={desc_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={desc} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>venue</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={venue_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={venue} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>time</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={time_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={time} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>date</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={datee_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={datee} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>org_by</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={org_by_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={org_by} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>tech_body</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={tech_body_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={tech_body} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>coordinator</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={coordinator_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={coordinator} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3">
                      <div className="col-md-4">
                        <h2>fees</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={fees_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={fees} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                    <div className="row g-3 mt-2 mx-3 my-3">
                      <div className="col-md-4">
                        <h2>participants</h2>
                      </div>
                      <div className="col-md-4">
                        <input type="number" ref={participants_no} className="form-control" placeholder="Number" aria-label="State" />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" ref={participants} className="form-control" placeholder="Custom Name" aria-label="Zip" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <button type="submit" className="btn btn-primary">Filter</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted">
              {isfiill && filtered.length === 0 && <h2>No Events Found</h2>}
              {isfiill && filtered.length !== 0 && <Exel apiData={filtered} fileName={fileName} />}
            </div>
          </div>
        </div> :
        <Notfound />}
    </div>
  )
}

export default Report