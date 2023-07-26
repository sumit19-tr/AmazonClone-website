import React, { Component, useContext } from "react";
import './details.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MyContext from "../MyContext";
import Header from "../Header/Header";

const purl = "https://amazon-clone-restapi-production.up.railway.app/details";
const curl = "https://amazonclone-loginapi-production.up.railway.app/api/auth/add-id";
const curl2 = 'https://amazonclone-loginapi-production.up.railway.app/api/auth/cart-items';



class Details extends Component {

    constructor(props) {
        super(props);

        this.state = {
            details: '',
            prod_ID: '',
            product: [],
            msg: '',
            display: {
                display: 'none'
            },
            total_items: 0,
            Price:""
        }
    }



    count = 0
    handleCart = async (id) => {

        if (!sessionStorage.getItem('ltk')) {
            this.props.history.push('/login');
        }
        else {
            fetch(curl, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_name": sessionStorage.getItem("userInfo"),
                    "productId": this.state.details.productId,
                    "product_name": this.state.details.product_name,
                    "Image": this.state.details.Image,
                    "content": this.state.details.content,
                    "Price": this.state.details.Price,
                    "Quantity": 1
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    const msg = data.msg;
                    this.setState({ msg })
                })
            let response2 = await axios.get(`${curl2}/${sessionStorage.getItem("userInfo")}`);
            const cartItems = response2.data.data;
            const total_items = cartItems.length;
            this.setState({ total_items })
            this.count++;
        }


    }

    handleBuyNow = () => {
        if (!sessionStorage.getItem('ltk')) {
            this.props.history.push('/login');
        }
        else {
            this.props.history.push(`/orders/${this.state.details.productId}`);
        }
    }

    render() {
        let { details } = this.state;
        console.log("sessionStorage.getItem" + sessionStorage.getItem("userInfo"));

        return (
            <>
                <MyContext.Provider value={this.count}>
                    <Header />
                </MyContext.Provider>


                <div class="mt-2 mb-5">
                    <div class=" row d-flex justify-content-center">
                        <div class="col-md-10">
                            <h5 className="text-success" style={this.state.display}>{this.state.msg}</h5>
                            <div class="card">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="images p-3 mt-2 ">
                                            <div class="text-center p-4">
                                                <img id="main-image" class="img-fluid" src={details.Image} width="" alt="Product_image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="p-4">
                                            <div class="mt-0 mb-3">
                                                <h3 id="title" class="a-size-large ">
                                                    <span id="productTitle" class="a-size-large product-title-word-break fw-normal ">{details.content}</span><span id="titleEDPPlaceHolder"></span>
                                                </h3>
                                                {details.brand && details.brand.length > 0 && (
                                                    <h6 class="text-uppercase">Brand: {details.brand[0].brand_name}</h6>
                                                )}
                                                <h3><span class="badge bg-warning text-success"></span></h3>
                                                <hr />
                                                <div class="price d-flex flex-row align-items-center">
                                                    <span className="fs-5 text-danger">-{details.discount}</span>
                                                    <span className="display-6 ">&nbsp;₹{this.state.Price}</span>
                                                </div>
                                                <div className="fs-5 text-secondary lh-base">M.R.P.: <strike>₹{details.Orignal_prize}</strike></div>
                                            </div>
                                            <hr />
                                            <Tabs >
                                                <TabList >
                                                    <Tab><span className="fs-6 fw-bolder">About this item</span></Tab>
                                                    <Tab><span className="fs-6 fw-bolder">Title 2 </span></Tab>
                                                </TabList>

                                                <TabPanel>
                                                    <h6> {details.about}</h6>
                                                </TabPanel>
                                                <TabPanel>
                                                    <h6>Any content 2</h6>
                                                </TabPanel>
                                            </Tabs>

                                            <div class="cart mt-4 align-items-center">
                                                <button class="btn btn-warning text-uppercase mr-2 px-4 fs-6" onClick={this.handleCart}>Add to cart</button>&nbsp;
                                                <button class="btn btn-warning text-uppercase mr-2 px-4 fs-6" onClick={this.handleBuyNow}>Buy Now</button> &nbsp;
                                                <Link to={`/products/${details.category_id}`}><span class="ml-1 btn btn-primary fs-6">Back</span></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    async componentDidMount() {
        let productId = this.props.location.search.split('=')[1];
        let response = await axios.get(`${purl}/${productId}`);
        let ConvPrice = response.data[0].Price;
        let  Price = ConvPrice.toLocaleString('en-IN');
        sessionStorage.setItem('Price',Price);
        this.setState({ details: response.data[0] ,Price});
        this.setState({ p_id: productId })
    }

}
export default Details;