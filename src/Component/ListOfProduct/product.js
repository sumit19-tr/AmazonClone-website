
import React, { Component } from "react";
import './product.css';
import axios from 'axios';
import BrandFilter from "../Filters/BrandFilter";
import PriceFilter from "../Filters/PriceFilter";
import DiscountsFilter from "../Filters/DiscountsFilter";
import RatingFilter from "../Filters/RatingFilter";
import DisplayProduct from "./displayProduct";
import Header from "../Header/Header";
const curl = 'https://amazon-clone-restapi-production.up.railway.app/products';
const curl2 = 'https://amazon-clone-restapi-production.up.railway.app/catagory';

class Product extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listProduct: '',
            listBrand: ''

        }
    }

    setDataWrtFilter = (data) => {
        this.setState({ listProduct: data })
    }


    fetchBrandData = (category_id) => {
        fetch(`${curl2}/${category_id}`, { method: 'GET' })
            .then((res) => res.json())
            .then((res2) => {
                this.setState({ listBrand: res2.data })
            })
    }

    fetchListProduct = (category_id) => {
        axios.get(`${curl}/${category_id}`)
            .then((res) => {
                this.setState({ listProduct: res.data })
            })
    }
    componentDidMount() {
        this.fetchBrandData(this.props.match.params.category_id);
        this.fetchListProduct(this.props.match.params.category_id);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.category_id !== this.props.match.params.category_id) {
            this.fetchBrandData(this.props.match.params.category_id);
            this.fetchListProduct(this.props.match.params.category_id);
        }
    }

    render() {
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="Allmobilefilter bg-white mx-auto">
                                <BrandFilter category_id={this.props.match.params.category_id}
                                    catWrtBrand={(data) => { this.setDataWrtFilter(data) }}
                                    listBrand={this.state.listBrand} />
                                <RatingFilter category_id={this.props.match.params.category_id}
                                    catWrtRating={(data) => { this.setDataWrtFilter(data) }} />
                                <DiscountsFilter category_id={this.props.match.params.category_id}
                                    catWrtDiscounts={(data) => { this.setDataWrtFilter(data) }} />
                                <PriceFilter category_id={this.props.match.params.category_id}
                                    priceWrtBrand={(data) => { this.setDataWrtFilter(data) }} />
                            </div>
                            </div>
                            <div className="col-lg-9">
                                <DisplayProduct listProduct={this.state.listProduct} />
                            </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Product;