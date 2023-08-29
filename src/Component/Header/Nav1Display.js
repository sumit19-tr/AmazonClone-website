import axios from "axios";
import './Nav1.css';
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import MyContext from "../MyContext";
import SearchBar from "./SerachBar";
const curl = 'https://amazonclone-loginapi-production.up.railway.app/api/auth/cart-items';
const url = "https://amazonclone-loginapi-production.up.railway.app/api/auth/userinfo";

const Nav1Display = (props) => {

    const data = useContext(MyContext)
    const [total, setTotal] = useState(0);
    const [userData, setUserData] = useState("");


    useEffect(() => {
        const fetchNoOfItemsInCart = async () => {
            const response = await axios.get(`${curl}/${sessionStorage.getItem("userInfo", data)}`);
            const cartItems = response.data.data;
            const total_items = cartItems.length;
            setTotal(total_items);
        }
        fetchNoOfItemsInCart();
    }, [data])


    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                'x-access-token': sessionStorage.getItem('ltk')
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data)
            })
    }, [])


    const handleLogout = () => {
        sessionStorage.getItem('loginStatus', 'loggedOut');
        sessionStorage.setItem('userInfo', '');
        sessionStorage.removeItem('ltk');
        sessionStorage.removeItem("userInfo");
        setUserData('');
        this.props.history.push('/');
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const conditionalHeader = () => {
        if (userData.name) {
            let data = userData.name;
            sessionStorage.setItem("loginStatus", "loggedIn");
            sessionStorage.setItem("userInfo", data);
            const fullName = userData.name;
            const firstName = fullName.split(" ")[0];
            const capitalized = capitalizeFirstLetter(firstName)
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" tabIndex={-1} aria-disabled="true">
                            <button className="logout-button pb-2" onClick={handleLogout}>
                                Log Out
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="" to="/login" tabIndex={-1} aria-disabled="true">
                            <button
                                className="logout-button pt-2 pb-1"
                            >
                                Hello,
                                <br />
                                &nbsp;&nbsp;&nbsp;{capitalized}
                            </button>
                        </Link>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register" tabIndex={-1} aria-disabled="true">
                            <button className="logout-button pb-2" onClick={handleLogout}>
                            Register
                            </button>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="" to="/login" tabIndex={-1} aria-disabled="true">
                            <button
                                className="logout-button pt-2 pb-1"
                            >
                                Hello,
                                <br />
                                &nbsp;&nbsp;&nbsp;sign in
                            </button>
                        </Link>
                    </li>
                </>
            )
        }
    }

    const history = useHistory();

    const handleGoToCart = () => {
        if (!sessionStorage.getItem('ltk')) {
            history.push('/login');
        }
        else {
            history.push(`/cart`);
        }
    }

    const handleViewBooking = () => {
        if (!sessionStorage.getItem('ltk')) {
            history.push('/login');
        }
        else {
            history.push(`/viewBooking`);
        }
    }



    const [select, setSelect] = useState({
        border: 'none'
    })

    const setBorder = () => {
        if (select.border === 'none') {
            setSelect({
                border: '4px solid #ffb123'
            })
        }
        else {
            setSelect({
                border: 'none'
            })
        }

    }

    const [input1, setinput1] = useState({
        border: 'none'
    })

    const setBorder1 = () => {
        if (input1.border === 'none') {
            setinput1({
                border: '4px solid #ffb123'
            })
        }
        else {
            setinput1({
                border: 'none'
            })
        }

    }

    return (
        <>
            <nav
                className="navbar navbar-expand-xl navbar-dark bg-dark"
                aria-label="Third navbar example"
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <div className="N1">
                            <img src="https://i.ibb.co/RQ8X7W6/amazon-logo.png" alt="" />
                            .in
                        </div>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarsExample03"
                        aria-controls="navbarsExample03"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample03">
                        <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                            <li className="nav-item N2">
                                <Link className="nav-link active" aria-current="page" to="">
                                    <img src="https://i.ibb.co/LtRFHqs/location.png" alt="" />
                                    <div className="in2">
                                        <span>Hello</span>
                                        <br />
                                        <address>select your address</address>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <SearchBar setBorder={setBorder} select={select} catagory={props.catagory} setBorder1={setBorder1} input1={input1} />
                            </li>
                            {conditionalHeader()}
                            <li className="nav-item">
                                <a className="" href="/register" tabIndex={-1} aria-disabled="true">
                                    <button
                                        className="logout-button pt-2 pb-1"
                                        onClick={handleViewBooking}
                                    >
                                        Returns 
                                        <br />
                                        &nbsp;&nbsp;&nbsp;&amp; Orders
                                    </button>
                                </a>
                            </li>
                            <li className="nav-item N7">
                                <div onclick={handleGoToCart} className="">
                                    <img
                                        src="https://i.ibb.co/vkfh4k5/outline-shopping-cart-white-24dp.png"
                                        alt="cart_img"
                                    />
                                    <span>0</span>
                                    <div className="cart">Cart</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav1Display;