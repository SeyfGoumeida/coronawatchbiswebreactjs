import React, { Component } from 'react';
import Header from '../Header';
import Menu from './Menu';
import Footer from '../Footer';
import Home from '../Home';
import {Redirect} from 'react-router-dom';

export default class App extends Component {
    constructor(props) {
        super(props)
        const accessToken = localStorage.getItem("accessToken")
        const userType =localStorage.getItem("usertype")

        
        let loggedIn =true
        if(accessToken==null){
            loggedIn = false
        }
        let type = 'Moderator'
        if(userType==='SuperAdmin'){
           type='SuperAdmin'
        }
        if(userType==='HealthAgent'){
            type='HealthAgent'
         }
    
         if(userType==='Redactor'){
            type='Redactor'
         }
         if(userType==='WebUser'){
            type='WebUser'
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
        if(this.state.type ==='SuperAdmin'){
            return <Redirect to="/admin_dashboard"/>
        }
        if(this.state.type ==='HealthAgent'){
            return <Redirect to="/healthAgent_dashboard"/>
        }
        if(this.state.type ==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        if(this.state.type ==='WebUser'){
            return <Redirect to="/webuser_dashboard"/>
        }
        return (
            <div>
                <Header/>
                <Menu/>
                <Home/>
                <Footer/>
            </div>
        )
    }
}
