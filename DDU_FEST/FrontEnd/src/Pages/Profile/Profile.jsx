import "./profile.css"
import React, { useContext } from 'react';
import Navbar from "../../components/Navbar/Navbar"
import { AuthContext } from "../../context/AuthContext";
import Notfound from "../../components/Notfound/Notfound";

export const Profile = () => {


    const { user } = useContext(AuthContext)


    return (
        <div>
            {user!=null ?
            <div>
                <Navbar />
                <div className=" bg-light">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-10 mt-5 pt-5">
                                <div className="row z-depth-3">
                                    <div className="col-sm-4 bg-info rounded-left">
                                        <div className="card-block text-center text-white">
                                            <i className="fas fa-user-tie fa-7x mt-5"></i>
                                            <h2 className="font-weight-bold mt-4">{user.name}</h2>
                                            <p>{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-8 bg-white rounded-right">
                                        <h3 className="mt-3 text-center">Information</h3>
                                        <hr className="bg-primary mt-0 w-25" />
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="font-weight-bold">Username:</p>
                                                <h6 className=" text-muted">{user.username}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="font-weight-bold">Name:</p>
                                                <h6 className=" text-muted">{user.name}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="font-weight-bold">Email:</p>
                                                <h6 className=" text-muted">{user.email}</h6>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:
              <Notfound/>}
        </div>
    );
};
