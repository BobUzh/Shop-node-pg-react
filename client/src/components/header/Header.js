import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import './header.scss';

import logo from './vx2.png';
import {observer} from "mobx-react-lite";


const Header = () => {
    const {store} = useContext(Context);

    const itemMenuNotAuthUser = (
        <div className="right-side">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
        </div>
    );
    const itemMenuAuthUser = (
        <div className="right-side">
            <li onClick={() =>  store.logout()}>Logout</li>
        </div>
    );

    const rightSide = !store.isAuth ? itemMenuNotAuthUser : itemMenuAuthUser;

    return (
        <div className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>
            </div>
            <div className="navbar">
                <div className="top">
                    <Link to="/admin" className="user">{store.user?.email}</Link>
                    <div className="slogan">
                        russian warship <span className="fuck"> FUCK YOU</span>
                    </div>
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to="/product">Product</Link></li>
                        {rightSide}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default (Header);