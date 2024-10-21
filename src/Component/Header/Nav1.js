import React, { Component } from 'react';

import Nav1Display from './Nav1Display';
const curl = "https://amazon-clone-restapi.onrender.com/catagory";

class Nav1 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagory: '',
        }
    }
    
    renderCategory = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.id} key={item.id}>
                        {item.category}
                    </option>
                )
            })
        }
    }

    render() {
        

        return (
            <>
                <Nav1Display catagory={this.renderCategory(this.state.catagory)} />
            </>
        )
    }

    componentDidMount(){
        fetch(curl,{method:'GET'})
        .then((res) => res.json())
        .then((data)=>{
            this.setState({catagory:data})
        })


    } 

}

export default Nav1;
