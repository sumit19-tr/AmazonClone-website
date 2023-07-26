import React from "react";
import { Link } from "react-router-dom";
import './Nav2.css';

const Nav2Display = (props) => {
    const listCatg = ({ catgData }) => {
        if (catgData) {
            return catgData.map((item) => {
                return (
                    
                        <li key={item._id}>
                            <Link to={`/products/${item.id}`} >{item.category} </Link>
                        </li>
                    
                )
            })
        }
    }




    const changeMode = () => {
        return (<></>)
    }

    const weatherData = ({ weatherInfo }) => {

        if (weatherInfo) {
            if (weatherInfo) {
                return (
                    <>
                        <div>
                            <p
                                id="weather1"
                                className="weather fs-6 text-warning"
                            >
                                {weatherInfo.temp} °C {weatherInfo.cityName}
                            </p>
                        </div>
                        <div className="wimg"><img src="https://i.ibb.co/LdSBJgD/weather.png" alt="weather-img"></img></div>
                    </>
                )
            }
            else {
                <div className="col-6 text-center text-muted">
                    <h5>No Data Found</h5>
                </div>
            }
        }
        else {
            return (
                <div>
                    <div className="spinner-border text-warning"></div>
                </div>
            )
        }


    }

    return (
        <nav>
            <ul>
                {listCatg(props)}
            </ul>
            <div className="togglebtn">
                <input type="checkbox" className="checkbox" name="" id="checkbox" onClick={changeMode}></input>
                <label htmlFor="checkbox" className="labeldark">
                    <i className="fas fa-sun-o"></i>
                    <i className="fas fa-moon-o"></i>
                    <div className="ball"></div>
                </label>
                <h5 className="text text-white ms-3 fs-6 fw-bold">Dark Mode
                </h5>
            </div>
            <div className="weatherp">
                {weatherData(props)}
            </div>
        </nav>
    )
}

export default Nav2Display;