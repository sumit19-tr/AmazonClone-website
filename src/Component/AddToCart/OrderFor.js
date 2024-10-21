import axios from "axios";
import React, { Component } from "react";
import './OrderFor.css';
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";

const curl = `https://amazonclone-loginapi.onrender.com/api/auth/cart-items/${sessionStorage.getItem("userInfo")}`;
const pourl = "https://amazon-clone-restapi.onrender.com/placeOrder";

const paymentOrderurl = "https://razorpay-payment-integration-bx1l.onrender.com/api/payment/order";
const verifyPayurl = "https://razorpay-payment-integration-bx1l.onrender.com/api/payment/verify";

class OrderFor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_name:sessionStorage.getItem("userInfo"),
            orderId: Math.floor(Math.random() * 100000),
            productL: '',
            name: '',
            email: '',
            cost: 0,
            phone: '',
            address: '',
            menuItem: '',
            amount: 0
        }
    }

    // const [amount, setamount] = useState(350);

    renderItem = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(item => {
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
                        <img className="" src="https://i.ibb.co/3Rr2X07/no-Data-Found.png" alt="no data" style={{ height: '100%', width: '132%' }} />
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

    count = 0;
    handlePlaceOrder = () => {
        let { productL, ...obj } = { ...this.state };
        obj.menuItem = obj.menuItem.toString();
        fetch(pourl, {
            method: 'post',
            headers: {
                'accept': "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            // .then(this.props.history.push('/viewBooking'))
            .then(console.log("order placed"));
        sessionStorage.setItem('re-count', this.count++);
    }

    // handlePayment Function
    handlePayment = async () => {
        this.handlePlaceOrder();
        try {
            const res = await fetch(paymentOrderurl, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount: this.state.cost
                })
            });

            const data = await res.json();
            //console.log(data);
            this.handlePaymentVerify(data.data);
        } catch (error) {
            //console.log(error);
        }
    }
    // handlePaymentVerify Function
    handlePaymentVerify = async (data) => {
        const options = {
            key: "rzp_test_fUyi5Tb1Uyx1Ro",
            amount: data.amount,
            currency: data.currency,
            name: this.state.user_name,
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                //console.log("response", response)
                try {
                    const res = await fetch(verifyPayurl, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();
                    //console.log("verifyPayurl", verifyData);

                    if (verifyData.message) {
                        toast.success(verifyData.message);

                        const status = "ordered";

                        const date = new Date();
                        const formatedDate = date.toISOString().split('T')[0];

                        this.props.history.push(`/viewBooking?status=${status}&ORDERID=${this.state.orderId}&date=${formatedDate}&PAYMENTID=${response.razorpay_payment_id}`);
                    }
                    else {
                        toast.error("Payment verification failed.");
                    }


                } catch (error) {
                    // //console.log(error);
                    console.error("Error during payment verification:", error);
                    toast.error("Error during payment verification.");
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    render() {
        //console.log('this.state.productL', this.state.productL);
        //console.log("this.state.menuItem " + this.state.menuItem);
        //console.log("this.state.cost " + this.state.cost);
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
                                        value={this.state.name} onChange={this.handleChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="email" className="control-name">Email</label>
                                    <input className="form-control" id="email" name="email"
                                        value={this.state.email} onChange={this.handleChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone" className="control-name">Phone</label>
                                    <input className="form-control" id="phone" name="phone"
                                        value={this.state.phone} onChange={this.handleChange} required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="address" className="control-name">address</label>
                                    <input className="form-control" id="address" name="address"
                                        value={this.state.address} onChange={this.handleChange} required />
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
                                
                            
                            <button className="btn btn-warning" onClick={() => this.handlePayment(this.state.cost)}>
                                PlaceOrder
                            </button>
                            <Toaster />
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
                productItems.push(res.data.data.map(item => {
                    return item.productId;
                }));
                //console.log("productItems ", productItems);
                const cartItems = res.data.data;
                const sumOfPrize = cartItems.reduce((acc, item) => acc + item.Price, 0);
                this.setState({
                    productL: res.data.data,
                    cost: sessionStorage.getItem('formatedTotal'),
                    menuItem: productItems,
                    amount: sumOfPrize
                })
            })
    }
}

export default OrderFor;