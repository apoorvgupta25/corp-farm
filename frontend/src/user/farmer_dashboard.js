import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {API} from '../backend';

import {signout} from '../auth/authAPICalls';
import {isAuth} from '../auth/authAPICalls';
import Topbar from '../component/topbar/topbar';
import './dashboard.css';
import '../index.css';

import { ReactComponent as Exaclamation }  from '../assets/exaclamation4.svg'

const FarmerDashboard = ({ match }) => {

    const signoutUser = () => {
        signout()
    }

    const {user: {name, email, role, verification, _id}} = isAuth();

    var roleType = "Farmer";
    if(role === 1)
        roleType = "Corporate";

    const adminLeftSide = () => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/farmer/add/land" className="text-success" style={{ textDecoration:'none'}}>Create Land</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/manage/land" className=" text-success" style={{ textDecoration:'none'}}>Manage Land</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/add/product" className=" text-success" style={{ textDecoration:'none'}}>Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/farmer/manage/product" className=" text-success" style={{ textDecoration:'none'}}>Manage Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/contract/manage/" className=" text-success" style={{ textDecoration:'none'}}>Manage Contracts</Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="mb-4">
                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Name</div> {name}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Email</div> {email}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Role</div> {roleType}
                    </li>
                    <li className="list-group-item">
                        <div className="badge badge-success mr-2">Status</div> {verification}
                    </li>

                </ul>
                <Link to="/signin" onClick={signoutUser} className="btn btn-primary mt-3 pull-right">Sign Out</Link>
            </div>
        );
    };

    const profileImage = () => {
        var imageURL = `${API}/user/profile/photo/${_id}`;

        return (
            <img src={imageURL} alt="Profile Image" className="profile-image" />
        )
    }

    return (
        <div>
            <Topbar/>
            <h1 className="text-center mt-5 mb-5">Dashboard</h1>
            <div className="container bg-green p-3">
                <div className="row">
                    <div className="col-sm-3">{adminLeftSide()}</div>
                    <div className="col-sm-6">{adminRightSide()}</div>
                    <div className="col-sm-3">{profileImage()}</div>
                </div>
            </div>
            <div className="text-danger text-center font-weight-bold"><Exaclamation style={{width: "1.5rem"}}/>Note: Invalid and Unverified Farmers Cannot Add Land and Products</div>

        </div>
    );
}
export default FarmerDashboard;
