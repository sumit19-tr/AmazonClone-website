import axios from "axios";
import React, { Component } from "react";

const url = "https://amazon-clone-restapi.onrender.com/filter";

class DiscountsFilter extends Component{

    constructor(){
        super()

        this.state = {
            title:'Discounts',
        }
        
    }

    discountsFilter = (event) => {
        let category_id = this.props.category_id
        let discount = event.target.value.split('-');
        let L_discount = discount[0];
        let H_discount = discount[1]; 
        let discountUrl = "";
        if(event.target.value === "")
        {
            discountUrl = `${url}/${category_id}`
        } 
        else{
            discountUrl = `${url}/${category_id}?L_discount=${L_discount}&H_discount=${H_discount}`
        }
        axios.get(discountUrl)
        .then((res) => {this.props.catWrtDiscounts(res.data)})
    }

    render(){
        const title = this.state.title;
        return(
            <div className="ms-1 mt-4" onChange={this.discountsFilter}>
                <ul>
                    <li><div className="fs-5 fw-bolder">{title}</div></li>
                    <li>
                        <input type="radio" name="radio" id="radio11" value="10-99"/>
                        <label htmlFor="radio11" className="fs-6 ms-2  Mouse-hover">10% off or more</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio12" value="25-99"/>
                        <label htmlFor="radio12" className="fs-6 ms-2  Mouse-hover">25% off or more</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio13" value="35-99"/>
                        <label htmlFor="radio13" className="fs-6 ms-2  Mouse-hover">35% off or more</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio14" value="50-99"/>
                        <label htmlFor="radio14" className="fs-6 ms-2  Mouse-hover">50% off or more</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio15" value="60-99"/>
                        <label htmlFor="radio15" className="fs-6 ms-2  Mouse-hover">60% off or more</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio16" value="70-99"/>
                        <label htmlFor="radio16" className="fs-6 ms-2  Mouse-hover">70% off or more</label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default DiscountsFilter;