import React, { Component } from 'react'
import Header from '../Header/Header';
import './register.css'

const rurl = "https://amazonclone-loginapi-production.up.railway.app/api/auth/register";

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "user",
      message: "",
      errors: {} 
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  validateForm = () => {
    const { name, email, password, phone } = this.state;
    const errors = {};

    if (name.trim() === "") {
      errors.name = "Name is required";
    }

    if (email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
    }

    if (phone.trim() === "") {
      errors.phone = "Phone is required";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  register = () => {
    if (!this.validateForm()) {
      return; 
    }

    fetch(rurl, {
      method: "post",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.auth === false)
        {
            this.setState({message:data.msg})
        }
        else{
            this.setState({message:data.msg})
            setTimeout(()=>{
                this.props.history.push('/login');
            },3000)      ;      
        }
        console.log('data', data);
      })
  }

  render() {
    const { errors } = this.state;

    return (
      <>
        <Header/>
        <div className="container">
          <div className="register-container">
            <h1 className="text-center">Registration</h1>
            
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required=""
                  onChange={this.handleChange}
                />
                {errors.name && <span className="error text text-danger fs-3 fw-bold">!{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required=""
                  onChange={this.handleChange}
                />
                {errors.email && <span className="error text text-danger fs-3 fw-bold">!{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  id="phone"
                  placeholder="phone"
                  required=""
                  onChange={this.handleChange}
                />
                {errors.phone && <span className="error text text-danger fs-3 fw-bold">!{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required=""
                  onChange={this.handleChange}
                />
                {errors.password && <span className="error text text-danger fs-3 fw-bold">!{errors.password}</span>}
              </div>
              <h3 className='text text-success'>{this.state.message}</h3>
              <button type="button" className="btn btn-primary btn-block fs-5 w-100 fw-bold" onClick={this.register}>
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Register;
