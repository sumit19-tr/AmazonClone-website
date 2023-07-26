import React from 'react';
import './contentSection1.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const ContentSection1 = (props) => {

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/details?id=${id}`);
    }

    const renderTopPicksFromMobiles = ({ topPicksFromMobiles }) => {

        if (topPicksFromMobiles) {

            if (topPicksFromMobiles.length > 0) {

                return topPicksFromMobiles.map((item) => {

                    const id = item.productId;

                    return (
                        <>
                            <img key={item.id} style={{ cursor: 'pointer' }} onClick={() => handleClick(id)} src={item.Image} alt="imag" ></img>
                        </>
                    )
                })
            }

            else {
                return (
                    <div className="col-6 text-center text-muted">
                        <h3>No Data Found</h3>
                    </div>
                )
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

    const renderToprated = ({ Toprated }) => {

        if (Toprated) {

            if (Toprated.length > 0) {

                return Toprated.map((item) => {

                    const id = item.productId;

                    return (
                        <>
                            <img key={item._id} style={{ cursor: 'pointer' }} onClick={() => handleClick(id)} src={item.Image} alt="imag" ></img>
                        </>
                    )
                })
            }

            else {
                return (
                    <div className="col-6 text-center text-muted">
                        <h3>No Data Found</h3>
                    </div>
                )
            }

        }

        else {
            return (
                <div>
                    <div  className="spinner-border text-warning"></div>
                </div>
            )
        }

    }

    const renderMenFashionDis = ({ MenFashionDisc5080 }) => {

        if (MenFashionDisc5080) {

            if (MenFashionDisc5080.length > 0) {

                return MenFashionDisc5080.map((item) => {

                    const id = item.productId;

                    return (
                        <>
                            <img key={item._id} style={{ cursor: 'pointer' }} onClick={() => handleClick(id)} src={item.Image} alt="imag" ></img>
                        </>
                    )
                })
            }

            else {
                return (
                    <div className="col-6 text-center text-muted">
                        <h5>No Data Found</h5>
                    </div>
                )
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
        <>
            <section className="Content c3" >

                <div className="forHome Content1 ">
                    <h3> Top picks for Mobiles </h3>
                    {renderTopPicksFromMobiles(props)}
                    <Link to="/products/1">see more</Link>
                </div>

                <div className="amazonbrands Content1">
                    <h3> Top rated, premium quality <br />| Brands & more </h3>
                    {renderToprated(props)}
                    <Link to="">see more</Link>
                </div>

                <div className="woman Content1">
                    <h3> 50% - 80% off | Men's Fashion</h3>
                    {renderMenFashionDis(props)}

                    <Link to="/products/3"> see more</Link>
                </div>

                <div className="login Content1">
                    <h3> Sign in for your best <br />experience </h3>
                    <button className="btn btn-warning ms-4 w-75 fs-6 fw-bold">Sign in securely</button>
                </div>

            </section>
        </>
    )
}

export default ContentSection1;