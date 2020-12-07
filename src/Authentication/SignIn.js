import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

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


export default class SignIn extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("login")
       

        let loggedIn =true
        if(token==null){
            loggedIn = false
        }
       
        this.state = {
            username: '',
            password: '',
            loggedIn
             
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
        axios
            .post('https://coronawatch.herokuapp.com/api/users/login/', this.state)
            .then(response => {
                console.log(response)
                localStorage.setItem("login",response.data.token)
                localStorage.setItem("user_id",response.data.id)
                localStorage.setItem("user_type",response.data.user_type)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("User authenticated successfully");
                    this.setState({
                        loggedIn:true
                    })
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                 
                console.log("password or email incorrect");
                alert('password or email incorrect!');

            })

    }

    render() {
        const user_type = localStorage.getItem("user_type")

        if (user_type==='0'){
            return <Redirect to="/admin_dashboard"/>
        }
        if (user_type==='1'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if (user_type==='2'){
            return <Redirect to="/healthAgent_dashboard"/>
        }
        if (user_type==='3'){
            return <Redirect to="/redactor_dashboard"/>
        }

    
        
        const {username,password}=this.state
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
                                    type="email" 
                                    name="username" 
                                    id="username" 
                                    className="form-control" 
                                    placeholder="Email" 
                                    value={username} 
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
                                <button type="submit" className="btn btn-info btn-block" style={buttonStyle}>Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                            </form>

                            {/* /.social-auth-links */}
                            <p className="mb-1">
                            <a href="/forgot_password" style={writeStyle}>I forgot my password</a>
                            </p>
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
