import axios from 'axios';
import React, { Component } from 'react'
import Header from '../Header/Header';
import DisplayOrder from './displayOrder';

const viewOrderUrl = `https://amazon-clone-restapi.onrender.com/viewOrders/${sessionStorage.getItem("userInfo")}`;

const updateOrderUrl = "https://amazon-clone-restapi.onrender.com/updateOrder";

// const username=sessionStorage.getItem("userInfo");

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
            //console.log(username);
            
        }
        return true;
    }

    componentDidMount() {

        if(this.props.location && this.props.location.search){
            let query = this.props.location.search.split('&');

            if(query && query.length >= 4){
                let data = {
                    "status":query[0].split('=')[1] || '',
                    "date":query[2].split('=')[1] || '',
                    "payment_id":query[3].split('=')[1].split('_')[1] || ''
                }
                let id = query[1].split('=')[1];

                if(id)
                {
                    fetch(`${updateOrderUrl}/${id}`,{
                        method:'PUT',
                        headers:{
                            'Accept':'application/json',
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify(data)
                    }).then((res) => res.json())
                    .then((result) => console.log('Order updated:', result))
                    .catch((error) => console.error('Error updating order:', error));  
                }

            }
        }

        axios.get(viewOrderUrl).then((res) => { this.setState({ 
            orders: res.data ,
            rerenderCount:sessionStorage.getItem('re-count') 
        }) })
    }
}

export default ViewOrder;