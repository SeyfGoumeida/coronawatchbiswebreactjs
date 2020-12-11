import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../Header';
import Menu from './Menu';
import Footer from '../Footer';
import Home from '../Home';



export default class App extends Component {
    constructor(props) {
        super(props)
        //const token = localStorage.getItem("login")
        const userType =localStorage.getItem("userType")

        
        let loggedIn =true
        // if(token==null){
        //     loggedIn = false
        // }
      
        this.state = {
             loggedIn,
             userType
        }
    }
    render() {
        if(this.state.loggedIn ===false){
            return <Redirect to="/"/>
        }
        if(this.state.userType ==='Moderator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if(this.state.userType ==='HealthAgent'){
            return <Redirect to="/halthAgent_dashboard"/>
        }
        if(this.state.userType ==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        return (

            <div>

                <Header/>
                <Menu/>
                <Home/>
                <Footer/>
            </div>
            
        );
    }
}
