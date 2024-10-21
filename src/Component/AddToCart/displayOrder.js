import React from 'react';
import './displayOrder.css';

function DisplayOrder(props) {

    const renderTable = ({orderData}) => {
        if (orderData) {
            return orderData.map(item => {
                return (
                    <tr key={item._id}>
                        <td>{item.orderId}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>Rs. {item.cost}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>{item.payment_id}</td>
                    </tr>
                )
            })
        }
    }

    return (
        <>
            <div className='container'>
                <center><h1>Orders</h1></center>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>cost</th>
                            <th>Date</th>
                            <th>status</th>
                            <th>PAYMENTID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable(props)}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DisplayOrder