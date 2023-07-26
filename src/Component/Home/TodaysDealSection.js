import React from 'react';
import './TodaysDealSection.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const TodaysDealSection = (props) => {

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/details?id=${id}`);
    }

    const renderTodaysDeals = ({ TodaysDeals }) => {

        if (TodaysDeals) {

            if (TodaysDeals.length > 0) {

                return TodaysDeals.map((item) => {

                    const id = item.productId;

                    return (
                        
                            <div key={id} onClick={() => handleClick(id)} className="product" style={{ backgroundImage: `url(${item.Image})` }}></div>
                        
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
                    <div className='position-absolute'><h3> Today’s Deals </h3></div>
                    {
                        renderTodaysDeals(props)
                    }
                </div>
            </section>
        </>
    )
}
export default TodaysDealSection;