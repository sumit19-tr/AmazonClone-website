import React from "react";
import { Link } from "react-router-dom";

const DisplayProduct = (props) => {
    const renderData = ({ listProduct }) => {
        if (listProduct) {
            if (listProduct.length > 0) {
                return listProduct.map((item) => {
                    const Price = item.Price;
                    return (
                        <Link to={`/details?id=${item.productId}`} className="text-decoration-none text-dark" key={item._id}>
                            <div className="card shadow ms-2 mt-4 " style={{ width: '286px' }} key={item._id}>
                                <img className="card-img-top rounded mx-auto mt-5 img-responsive" src={item.Image} alt="Redmi A1_blue" />
                                <div className="card-body">
                                    <h5 className="card-title text-capitalize">{item.content}</h5>
                                    <div className="cart-text fs-5 fw-bold ">
                                        <h6 className="badge bg-warning">{item.Rating} star </h6><br />
                                        <div className="fs-3"><small fs-6>₹</small>{Price.toLocaleString('en-IN')}<small className="fs-6 fw-lighter"><s>₹{item.Orignal_prize}</s>&nbsp; ({item.discount}% off)</small></div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
            else {
                return (
                    <div>
                        <img className="" src="https://i.ibb.co/3Rr2X07/no-Data-Found.png" alt="no data" style={{height:'100%',width:'132%'}}></img>
                    </div>
                )
            }
        }
        else {
            return (
                <div>
                    <img src="/images/loader.gif" alt="loader"></img>
                    <h2>Loading...</h2>
                </div>
            )
        }
    }
    return (
        <>
        <div className="row">
                <div className="d-flex flex-wrap">
                    {renderData(props)}
                </div>
            </div>

        </>
    )
}

export default DisplayProduct;