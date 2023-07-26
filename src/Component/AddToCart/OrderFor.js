import axios from "axios";
import React, { Component } from "react";
import './OrderFor.css';
import Header from "../Header/Header";

const curl = `https://amazonclone-loginapi-production.up.railway.app/api/auth/cart-items/${sessionStorage.getItem("userInfo")}`;
const pourl = "https://amazon-clone-restapi-production.up.railway.app/placeOrder";

class OrderFor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderId: Math.floor(Math.random() * 100000),
            productL: '',
            name: 'sumit',
            email: 'sumit@gmail.com',
            cost: 0,
            phone: '7987848361',
            address: 'hno 399 bhopal',
            menuItem:''
        }
    }

    renderItem = (data) => {
        if (data) {
            if(data.length > 0)
            {
                return data.map(item=> {
                    return (
                        <div class="card mb-4 border border-warning p-3 pr-0" style={{ width: "fit-content" }}>
                            <div class="row">
                                <div class="col-2">
                                    <img src={item.Image} style={{ height: '100%', width: '200%' }} alt="breakfast_image" />
                                </div>
                                <div class="col-10">
                                    <div class="card-body ml-5" style={{ marginLeft: "20%", marginRight: "fit-content" }}>
                                        <h3 class="card-title fw-bold">{item.product_name}</h3>
                                        <p class="card-text fs-3">Rs.{item.Price}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            else {
                return (
                    <div>
                        <img className="" src="https://i.ibb.co/3Rr2X07/no-Data-Found.png" alt="no data" style={{ height: '100%', width: '132%' }}/>
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleEditItems = () => {
        this.props.history.push('/cart');
    }

    count=0;
    handlePlaceOrder = () => {
        let {productL,...obj} = {...this.state};
        obj.menuItem=obj.menuItem.toString();
        fetch(pourl,{
            method:'post',
            headers:{
                'accept':"application/json",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(this.props.history.push('/viewBooking'))
        .then(console.log("order placed"));
        sessionStorage.setItem('re-count',this.count++);
    }

    render() {
        console.log('this.state.productL', this.state.productL);
        console.log("this.state.menuItem "+this.state.menuItem);
        return (
            <>
                <Header />
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
                            <div >
                                {this.renderItem(this.state.productL)}<br />
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <h2>Total prize is Rs.{this.state.cost}</h2>
                                </div>
                            </div>
                            <button className="btn btn-danger" onClick={this.handleEditItems}>
                                Edit items
                            </button>&nbsp;
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
        axios.get(curl)
            .then((res) => {

                let productItems = [];
                productItems.push(res.data.data.map(item=>{
                    return item.productId;
                }));
                console.log(productItems);
                this.setState({ 
                    productL: res.data.data,
                    cost:sessionStorage.getItem('formatedTotal'),
                    menuItem:productItems
                })
            })
        
    }

}

export default OrderFor;