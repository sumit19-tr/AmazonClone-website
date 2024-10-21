import axios from "axios";
import React, { Component } from "react";
import DisplayBrandFilter from "./DisplayBrandFilter";

const url = "https://amazon-clone-restapi.onrender.com/filter";
const curl = 'https://amazon-clone-restapi.onrender.com/catagory'


class BrandFilter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: 'Brands',
            brandList: ''
        }

    }

    brandFilter = (event) => {

        let category_id = this.props.category_id
        let brand_id = event.target.value;
        let brandUrl = "";
        if (brand_id === "") {
            brandUrl = `${url}/${category_id}`
        }
        else {
            brandUrl = `${url}/${category_id}?brand_id=${brand_id}`
        }
        axios.get(brandUrl)
            .then((res) => { this.props.catWrtBrand(res.data) })
    }
    render() {
        const title = this.state.title;
        const { brandList } = this.state;
        
        return (
            <div className="ms-1 mt-4">
                <ul onChange={this.brandFilter}>
                    <li><div className="h5 fw-bolder pt-4">{title}</div></li>
                    <DisplayBrandFilter brandList={brandList} />
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.fetchBrandList();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.category_id !== this.props.category_id) {
            this.fetchBrandList();
        }
    }
    fetchBrandList() {
        let category_id = this.props.category_id;    
        axios.get(`${curl}/${category_id}`)
          .then((res) => {
            this.setState({ brandList: res.data[0].brand })
          })
      }

}

export default BrandFilter;