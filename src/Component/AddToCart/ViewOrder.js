import axios from 'axios';
import React, { Component } from 'react'
import Header from '../Header/Header';
import DisplayOrder from './displayOrder';

const viewOrderUrl = "https://amazon-clone-restapi-production.up.railway.app/viewOrders";

class ViewOrder extends Component {

    constructor() {
        super();
        this.state = {
            orders: "",
            rerenderCount:''
        }
    }
    render() {
        return (
            <>
                <Header />
                <DisplayOrder orderData={this.state.orders} />
            </>
        )
    }

    shouldComponentUpdate(){
        let prevStateC = sessionStorage.getItem('re-count');
        if(prevStateC!==this.state.rerenderCount)
        {
            axios.get(viewOrderUrl).then((res) => { this.setState({ 
                orders: res.data ,
            }) })
        }
        return true;
    }

    componentDidMount() {
        axios.get(viewOrderUrl).then((res) => { this.setState({ 
            orders: res.data ,
            rerenderCount:sessionStorage.getItem('re-count') 
        }) })
    }
}

export default ViewOrder;