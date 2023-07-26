import React from "react";
import './BestSellersSection.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BestSellersSection = (props) => {

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/details?id=${id}`);
    }

    const renderBestSeller = ({ bestseller }) => {

        if (bestseller) {

            if (bestseller.length > 0) {

                return bestseller.map((item) => {

                    const id = item.productId;

                    return (
                        <>
                            <div key={item.id} onClick={() => handleClick(id)} className="product" style={{ backgroundImage: `url(${item.Image})`}}></div>
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
            <section className="viewed c3" >
                <div className="viewed1">
                    <div className='position-absolute'><h3> Best Sellers in Beauty & Health </h3></div>
                    {renderBestSeller(props)}
                </div>
            </section>
        </>
    )

}

export default BestSellersSection