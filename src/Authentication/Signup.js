import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const API_URL = 'http://localhost:8080'; 
//const API_URL = 'http://coronawatchbis.herokuapp.com';


//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};

const writeStyle={
    color:'#172B4D' 
};

const buttonStyle={
    backgroundColor:'#009F95'
};


export default class Signup extends Component {
    constructor(props) {
        super(props)
        const accessToken = localStorage.getItem("accessToken")
       

        let loggedIn =true
        if(accessToken==null){
            loggedIn = false
        }
       
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            username: '',
            password: '',
            userType:"WebUser",
            loggedIn,
            isSignedUp: false
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        let url = `${API_URL}/signup`;
        axios
            .post(url, {
                "userName":this.state.username,
                "passWord":this.state.password,
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "userType":this.state.userType,
                "email":this.state.email,
            })
            .then(response => {
                console.log(response)
                //localStorage.setItem("accessToken",response.data.accessToken)
                //localStorage.setItem("id",response.data.id)
                //localStorage.setItem("usertype",response.data.usertype)
                console.log(response.data)
                this.setState({ isSignedUp: true })
        
                if (response.status === 200) {
                    console.log ("User created successfully");
                    alert('user created successfully , Go to the login page');

                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                 
                console.log("password or email already exist");
                alert('password or email already exist');

            })
            console.log(this.state)


    }

    render() {
        const user_type = localStorage.getItem("usertype")

        if (user_type==='SuperAdmin'){
            return <Redirect to="/admin_dashboard"/>
        }
        if (user_type==='WebUser'){
            return <Redirect to="/webuser_dashboard"/>
        }
        if (user_type==='Moderator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if (user_type==='HealthAgent'){
            return <Redirect to="/healthAgent_dashboard"/>
        }
        if (user_type==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        if (this.state.isSignedUp) {
            // redirect to home if signed up
            return <Redirect to = {{ pathname: "/login" }} />;
        }

    
        
        const {username,password,email,firstName,lastName}=this.state
        return (
            <body className="hold-transition login-page" style={bodyStyle}>
            <div>
                    <div className="login-box">
                        <div className="card">
                        <div className="card-body login-card-body">
                        <div className="login-logo">
                        <a href="/login" style={writeStyle}><b>Corona</b>Watch</a>
                        </div>
                        {/* /.login-logo */}
                            <p className="login-box-msg" style={writeStyle}>Sign in to start your session</p>
                            <form onSubmit={this.submitHandler}>
                            <div id="input1" className="input-group mb-3">
                                <input 
                                    type="username" 
                                    name="username" 
                                    id="username" 
                                    className="form-control" 
                                    placeholder="username" 
                                    value={username} 
                                    onChange={this.changeHandler}
                                 />
                                <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-user" />
                                </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                type="email"
                                id="email"
                                 name="email" 
                                 className="form-control"
                                  placeholder="email" 
                                  value={email} 
                                  onChange={this.changeHandler}
                                  />
                                <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-envelope" />
                                </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                type="firstName"
                                id="firstName"
                                 name="firstName" 
                                 className="form-control"
                                  placeholder="firstName" 
                                  value={firstName} 
                                  onChange={this.changeHandler}
                                  />
                                <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-user" />
                                </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                type="lastName"
                                id="lastName"
                                 name="lastName" 
                                 className="form-control"
                                  placeholder="lastName" 
                                  value={lastName} 
                                  onChange={this.changeHandler}
                                  />
                                <div className="input-group-append">
                                <div className="input-group-text">
                                <span className="fas fa-user" />
                                </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                type="password"
                                id="password"
                                 name="password" 
                                 className="form-control"
                                  placeholder="Password" 
                                  value={password} 
                                  onChange={this.changeHandler}
                                  />
                                <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" />
                                    <label htmlFor="remember" style={writeStyle}>
                                    Remember Me
                                    </label>
                                </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                <button type="submit" className="btn btn-info btn-block" style={buttonStyle}>Sign UP</button>
                                </div>
                                {/* /.col */}
                            </div>
                            </form>
                        </div>
                        {/* /.login-card-body */}
                        </div>
                    </div>
                    {/* /.login-box */}
           
            </div>
            </body>

        );

    }
}
