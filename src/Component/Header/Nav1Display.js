import axios from "axios";
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

    const conditionalHeader = () => {
        if (userData.name) {
            let data = userData.name;
            sessionStorage.setItem("loginStatus", "loggedIn");
            sessionStorage.setItem("userInfo", data);
            return (
                <>
                    <li className="N4">
                        <Link to="/register">
                            <button className="logout-button" onClick={handleLogout}>
                                Log Out
                            </button>
                        </Link>
                    </li>
                    <li className="N5" >
                        <Link to="/login">
                            <div className="in2">
                                <small>Hello,</small><br /><br /><span>{userData.name}</span>
                            </div>
                        </Link>
                    </li>
                </>
            )
        }
        else {
            return (
                <>
                    <li className="N4"  >
                        <Link to="/register">
                            <button className="logout-button" onClick={handleLogout}>
                                Register
                            </button>
                        </Link>
                    </li>
                    <li className="N5" >
                        <Link to="/login">
                            <div className="in2">
                                <small>Hello,</small><br /><span>sign in</span>
                            </div>
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
            <ul className='divv1'>
                <li className="N1"><Link to="/"><div className='position-absolute'><img src="https://i.ibb.co/RQ8X7W6/amazon-logo.png" alt="" ></img></div><div className="in" >in</div></Link></li>
                <li className="N2"><Link to=""><img src="https://i.ibb.co/LtRFHqs/location.png" alt=""></img><div className="in2"><span>Hello</span><br /><address>select your address</address></div></Link></li>
                <li className="N3">
                    <SearchBar setBorder={setBorder} select={select} catagory={props.catagory} setBorder1={setBorder1} input1={input1}/>
                </li >

                {conditionalHeader()}

                <li className="N6" >
                    <div onClick={handleViewBooking}><div className="in2"><small>Returns</small><br /><span>& Orders</span></div></div>
                </li>
                <li className="N7">
                    <div onClick={handleGoToCart}>
                        <img src="https://i.ibb.co/vkfh4k5/outline-shopping-cart-white-24dp.png" alt="cart_img"></img><span>{total}</span><div className="cart">Cart</div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Nav1Display;