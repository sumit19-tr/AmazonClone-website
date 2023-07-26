import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Header from '../Header/Header';

const lurl="https://amazonclone-loginapi-production.up.railway.app/api/auth/login";

class login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            message:''
        }
    }

    handleChange = (event) =>{
        this.setState({[event.target.type]:event.target.value});
    }

    login = () =>{
        fetch(lurl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then((res)=> res.json())
        .then((data)=>{
            if(data.auth === false){
                this.setState({message:data.token})
            }
            else{
                sessionStorage.setItem('ltk',data.token);
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="login-container">
                        <h2 className="text-center fw-bold">Login</h2>
                        <h3 style={{color:'red'}}>{this.state.message}</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    required=""
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    required=""
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button type="button" className="btn btn-primary btn-block fs-6 fw-bold w-100" onClick={this.login}>
                                Login
                            </button>
                            <Link to='/register'>
                                <button type="button" className="btn btn-register btn-block">
                                    Create an Account
                                </button>
                            </Link>

                        </form>
                    </div>
                </div>
                

            </>
        )
    }
}


export default login