import React, { Component } from 'react'
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
}; 

export default class Robots_facebook extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("login")
        const user_type =localStorage.getItem("user_type")

        
        let loggedIn =true
        if(token==null){
            loggedIn = false
        }
        let type = '1'
        if(user_type==='0'){
           type='0'
        }
        if(user_type==='2'){
            type='2'
         }
    
         if(user_type==='3'){
            type='3'
         }
        this.state = {
             loggedIn,
             type
        }
    }

    render() {
        if(this.state.loggedIn ===false){
            return <Redirect to="/"/>
        }
        if(this.state.type ==='0'){
            return <Redirect to="/admin_dashboard"/>
        }
        if(this.state.type ==='2'){
            return <Redirect to="/halthAgent_dashboard"/>
        }
        if(this.state.type ==='3'){
            return <Redirect to="/redactor_dashboard"/>
        }

        return (
            <div>
             
                <Header/>
                <Menu/>

                <div className="content-wrapper" style={bodyStyle}>
                {/* Content Header (Page header) */}
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 style={whiteStyle}>Facebook posts</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Facebook posts</li>
                        </ol>
                    </div>
                    </div>
                </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}

                </div>

                <Footer/>
                
            </div>
        )
    }
}
