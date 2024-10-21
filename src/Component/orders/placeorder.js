import axios from "axios";
import React, { Component } from "react";
import './placeorder.css';
import Header from "../Header/Header";

const ourl = "http://localhost:9041/order";

class placeorder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: Math.floor(Math.random() * 100000),
            productL: '',
            name: 'sumit',
            email: 'sumit@gmail.com',
            cost: 0,
            phone: '7987848361',
            address: 'hno 399 bhopal',
            menuItem: ''
        }
    }

    renderItem = (data) => {
        if (data) {
            return (
                <div class="card mb-4 border border-warning p-3 pr-0" style={{ width: "fit-content" }}>
                    <div class="row">
                        <div class="col-2">
                            <img src={data.Image} style={{ height: '100%', width: '200%' }} alt="breakfast_image" />
                        </div>
                        <div class="col-10">
                            <div class="card-body ml-5" style={{ marginLeft: "20%", marginRight: "fit-content" }}>
                                <h3 class="card-title fw-bold">{data.product_name}</h3>
                                <p class="card-text fs-3">Rs.{data.Price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]:event.target.value })
    }

    handlePlaceOrder = () => {
        this.props.history.push('/cart');
    }

    render() {
        //console.log('this.state.productL', this.state.productL);
        return (
            <>
                <Header/>
                <div className="container">
                    <hr />
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3>order for {this.state.hotel_name}</h3>
                        </div>
                        <div className="panel-body">
                            <input type="hidden" name='cost' value={this.state.cost} />
                            <input type="hidden" name='id' value={this.state.id} />
                            <input type="hidden" name='hotel_name' value={this.state.hotel_name} />
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="fname" className="control-name">FirstName</label>
                                    <input className="form-control" id="fname" name="name"
                                        value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6"> 
                                    <label htmlFor="email" className="control-name">Email</label>
                                    <input className="form-control" id="email" name="email"
                                        value={this.state.email} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone" className="control-name">Phone</label>
                                    <input className="form-control" id="phone" name="phone"
                                        value={this.state.phone} onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="address" className="control-name">address</label>
                                    <input className="form-control" id="address" name="address"
                                        value={this.state.address} onChange={this.handleChange} />
                                </div>
                            </div>
                            {this.renderItem(this.state.productL)}<br />
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Total prize is Rs.{this.state.productL.Price}</h2>
                                </div>
                            </div>
                            <button className="btn btn-warning" onClick={this.handlePlaceOrder}>
                                PlaceOrder
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        let productId = this.props.match.params.productId;
        sessionStorage.setItem('productId', productId)
        axios.get(`${ourl}/${productId}`)
            .then((res) => {
                this.setState({ productL: res.data[0] })
            })
    }

}

export default placeorder;