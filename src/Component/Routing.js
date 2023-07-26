import Footer from "./Footer/Footer";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home/Home";
import Product from "./ListOfProduct/product";
import Details from "./Details/details";
import placeorder from "./orders/placeorder"; 
import AddToCart from "./AddToCart/AddToCart";
import login from "./login/login";
import register from "./login/register";
import OrderFor from "./AddToCart/OrderFor";
import ViewOrder from "./AddToCart/ViewOrder";


const Routing = () => {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Route exact path="/" component={Home} />
                    <Route path='/login' component={login}/>
                    <Route path='/register' component={register}/>
                    <Route path="/products/:category_id" component={Product} />
                    <Route path="/details" component={Details}/>
                    <Route path="/orders/:productId" component={placeorder}/>
                    <Route path="/cart" component={AddToCart}/>
                    <Route path="/placeOrder" component={placeorder}/>
                    <Route path="/orderFor" component={OrderFor}/>
                    <Route path="/viewBooking" component={ViewOrder}/>
                    <Footer />                    
                </BrowserRouter>
            </div>
        </>
    )
}

export default Routing;