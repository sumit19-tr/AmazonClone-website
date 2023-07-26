import React from "react";

const DisplayBrandFilter = (props) => {

    const renderData = ({ brandList }) => {
        if (brandList) {
            if (brandList.length > 0) {
                return brandList.map((item) => {
                    return (
                        <li>
                            <input 
                            type="radio" name="radio" id={item.brand_id} value={item.brand_id} key={item.brand_id} />
                            <label htmlFor={item.brand_id} className="fs-5 ms-2 text-capitalize Mouse-hover">{item.brand_name}</label>
                        </li>
                    )
                })
            }
            else {
                return (
                    <div>
                        <h2>No data</h2>
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
            <li>
                <input type="radio" name="radio" id="radio0" value="" />
                <label htmlFor="radio0" className="fs-5 ms-2 text-capitalize Mouse-hover">All</label>
            </li>
            {renderData(props)}
        </>
    )
}



export default DisplayBrandFilter;