import axios from "axios";
import React, { Component } from "react";

const url = "https://amazon-clone-restapi-production.up.railway.app/filter";

class RatingFilter extends Component{

    constructor(){
        super()

        this.state = {
            title:'Rating',
        }
    }

    ratingFilter = (event) => {
        let category_id = this.props.category_id
        let rating = event.target.value.split('-');
        let l_Rating = rating[0];
        let h_Rating = rating[1]; 
        let ratingUrl = "";
        if(event.target.value === "")
        {
            ratingUrl = `${url}/${category_id}`
        } 
        else{
            ratingUrl = `${url}/${category_id}?l_Rating=${l_Rating}&h_Rating=${h_Rating}`
        }
        axios.get(ratingUrl)
        .then((res) => {this.props.catWrtRating(res.data)})
    }

    render(){
        const title = this.state.title;
        return(
            <div className="ms-1 mt-4"  onChange={this.ratingFilter}>
            <ul>
                <li><div className="h4 fw-bold">{title}</div></li>
                <li>
                    <input type="radio" name="radio" id="radio21" value="4-5"/>
                    <label htmlFor="radio21" className="fs-5 ms-2 text-capitalize Mouse-hover">4 Star & Up</label>
                </li>
                <li>
                    <input type="radio" name="radio" id="radio22" value="3-5"/>
                    <label htmlFor="radio22" className="fs-5 ms-2 text-capitalize Mouse-hover" >3 Star & Up</label>
                </li>
                <li>
                    <input type="radio" name="radio" id="radio23" value="2-5"/>
                    <label htmlFor="radio23" className="fs-5 ms-2 text-capitalize Mouse-hover">2 Star & Up</label>
                </li>
                <li>
                    <input type="radio" name="radio" id="radio24" value="1-5"/>
                    <label htmlFor="radio24" className="fs-5 ms-2 text-capitalize Mouse-hover">1 star & Up</label>
                </li>
            </ul>
        </div>
        )
    }
}

export default RatingFilter;