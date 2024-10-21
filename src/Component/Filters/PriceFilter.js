import axios from "axios";
import React, { Component } from "react";

const url = "https://amazon-clone-restapi.onrender.com/filter";

class PriceFilter extends Component{

    constructor(){
        super()

        this.state = {
            title:'Price'
        }
        
    }

    PriceFilter = (event) => {
        let category_id = this.props.category_id
        let price = event.target.value.split('-');
        let lprice = price[0];
        let hprice = price[1]; 
        let priceUrl = "";
        if(event.target.value === "")
        {
            priceUrl = `${url}/${category_id}`
        } 
        else{
            priceUrl = `${url}/${category_id}?lprice=${lprice}&hprice=${hprice}`
        }
        axios.get(priceUrl)
        .then((res) => {this.props.priceWrtBrand(res.data)})
    }

    render(){
        let {title} = this.state;
        return(
            <div className="ms-1 mt-4">
                <ul onChange={this.PriceFilter}>
                    <li><div className="h4 fw-bolder">{title}</div></li>
                    <li>
                        <input type="radio" name="radio" id="radio31" value='500-1000' />
                        <label htmlFor="radio31" className="fs-5 ms-2 text-capitalize Mouse-hover">under ₹1,000</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio32" value='1000-5000'/>
                        <label htmlFor="radio32" className="fs-5 ms-2 text-capitalize Mouse-hover">₹1,000-₹5,000</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio33" value='5000-10000'/>
                        <label htmlFor="radio33" className="fs-5 ms-2 text-capitalize Mouse-hover">₹5,000-₹10,000</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio34" value='10000-20000'/>
                        <label htmlFor="radio34" className="fs-5 ms-2 text-capitalize Mouse-hover">₹10,000-₹20,000</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" id="radio35" value='20000-100000'/>
                        <label htmlFor="radio35" className="fs-5 ms-2 text-capitalize Mouse-hover">over ₹20,000</label>
                    </li>
                </ul>
            </div>
        )
    }
}

export default PriceFilter;