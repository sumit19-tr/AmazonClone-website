import React, { Component } from "react";
import './AddToCart.css';
import axios from "axios";
import Header from "../Header/Header";
import MyContext from "../MyContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


const curl = `https://amazonclone-loginapi-production.up.railway.app/api/auth/cart-items/${sessionStorage.getItem("userInfo")}`;
const durl = 'https://amazonclone-loginapi-production.up.railway.app/api/auth/removeItems';
const uQurl = 'https://amazonclone-loginapi-production.up.railway.app/api/auth/updateQuantity';

class AddToCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: '',
            total: '',
            remove_pid: '',
            total_items: '',
            updateQtyCount: 0
        }
    }

    handleQuantityIncre = async (id, Quantity) => {
        const updatedQuantity = Quantity + 1;
        let response = await axios.put(uQurl, { "Quantity": updatedQuantity, "productId": id });
        console.log("handleUpdateQuantity>>>", JSON.stringify(response.data));
        const updateQtyCount1 = this.state.updateQtyCount + 1;
        this.setState({ updateQtyCount: updateQtyCount1 });
    }

    handleQuantityDecre = async (id, Quantity) => {
        if (Quantity === 1) {
            this.handleRemove(id);
        }
        else {
            const updatedQuantity = Quantity - 1;
            let response = await axios.put(uQurl, { "Quantity": updatedQuantity, "productId": id });
            console.log("handleUpdateQuantity>>>", JSON.stringify(response.data));
            const updateQtyCount1 = this.state.updateQtyCount + 1;
            this.setState({ updateQtyCount: updateQtyCount1 });
        }
    }



    handleChange = async (id, event) => {
        const updatedQuantity = event.target.value || 1;
        let response = await axios.put(uQurl, { "Quantity": updatedQuantity, "productId": id });
        console.log("handleUpdateQuantity>>>", JSON.stringify(response.data));
        const updateQtyCount1 = updatedQuantity;
        this.setState({ updateQtyCount: updateQtyCount1 });

    }


    handleRemove = async (Rpid) => {
        let response = await axios.delete(`${durl}/${Rpid}`);
        this.setState({ remove_pid: response.data });
        let response2 = await axios.get(curl);
        const cartItems = response2.data.data;
        const total = cartItems.reduce((acc, item) => acc + item.Price, 0);
        const total_items = cartItems.length;
        this.setState({ cartItems, total, total_items });
    }

    displayAddToCart = (cartItems) => {
        if (cartItems) {
            if (cartItems.length > 0) {
                return cartItems.map((item) => {
                    return (
                        <>
                            <div key={item._id}>
                                <div className="row">
                                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                        <div
                                            className="bg-image hover-overlay hover-zoom ripple rounded"
                                            data-mdb-ripple-color="light"
                                        >
                                            <img
                                                src={item.Image}
                                                className="w-100 img-responsive"
                                                alt={item.product_name}
                                            />
                                            <Link to="">
                                                <div
                                                    className="mask"
                                                    style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                        <p>
                                            <strong>{item.product_name}</strong>
                                        </p>
                                        <p>Color: {item.Color}</p>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm me-1 "
                                            data-mdb-toggle="tooltip"
                                            title="Remove item"
                                            onClick={() => this.handleRemove(item.productId)}
                                        >
                                            <i className="fas fa-trash"/>
                                        </button>

                                    </div>
                                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                        <div className="d-flex mb-4" style={{ maxWidth: 300 }}>
                                            <button
                                                className="btn btn-warning px-3 me-2 btn-plus-minus"
                                                onClick={() => { this.handleQuantityDecre(item.productId, item.Quantity) }}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <div className="form-outline">
                                                <input
                                                    id="form1"
                                                    min={0}
                                                    name="quantity"
                                                    value={item.Quantity}
                                                    onChange={(event) => this.handleChange(item.productId, event)}
                                                    type="number"
                                                    className="form-control"
                                                />
                                                <label className="form-label" htmlFor="form1">
                                                    Quantity
                                                </label>
                                            </div>
                                            <button
                                                className="btn btn-warning px-3 ms-2 btn-plus-minus"
                                                onClick={() => { this.handleQuantityIncre(item.productId, item.Quantity) }}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>
                                        <p className="text-start text-md-center">
                                            <strong>₹{item.Price.toLocaleString('en-IN')}</strong>
                                        </p>
                                    </div>
                                </div>
                                <hr className="my-4"/>
                            </div>
                        </>
                    )
                })
            }
            else {
                return (
                    <div>
                        <img className="img-responsive" src="https://i.ibb.co/3Rr2X07/no-Data-Found.png" alt="no data"></img>
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

    handleCheckout = () => {
        this.props.history.push('/orderFor');
        sessionStorage.setItem('formatedTotal', this.state.total);
    }

    render() {

        console.log("this.state.total " + this.state.total);
        console.log("this.state.updateQtyCount ", this.state.updateQtyCount);
        return (
            <>
                <MyContext.Provider value={this.state.total_items}>
                    <Header />
                </MyContext.Provider>


                <section className="h-100 gradient-custom">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center my-4">
                            <div className="col-md-8">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Shopping Cart - {this.state.total_items} items</h5>
                                    </div>
                                    <div className="card-body">
                                        {this.displayAddToCart(this.state.cartItems)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="mb-0">Summary</h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Subtotal ({this.state.total_items} item):
                                                <span>₹{this.state.total}.00</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Shipping
                                                <span>0.00</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                    <strong>
                                                    </strong>
                                                </div>
                                                <span>
                                                    <strong>₹{this.state.total}</strong>
                                                </span>
                                            </li>
                                        </ul>
                                        <button onClick={this.handleCheckout} type="button" className="btn btn-warning btn-lg btn-block fw-bold fs-6 py-1 w-100">
                                            Proceed to Buy
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </>
        )
    }

    async shouldComponentUpdate(prevProps, prevState) {
        if (this.state.updateQtyCount !== prevState.updateQtyCount) {
            let response = await axios.get(curl);
            const cartItems = response.data.data;
            const total_items = cartItems.length;
            const sumOfPrize = cartItems.reduce((acc, item) => acc + item.Price, 0);
            const total = sumOfPrize.toLocaleString('en-IN');
            this.setState({ cartItems, total, total_items })
        }
    }

    async componentDidMount() {
        let response = await axios.get(curl);
        const cartItems = response.data.data;
        const total_items = cartItems.length;
        const sumOfPrize = cartItems.reduce((acc, item) => acc + item.Price, 0);
        const total = sumOfPrize.toLocaleString('en-IN');
        this.setState({ cartItems, total, total_items })
    }
}

export default AddToCart;