import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../Header';
import Menu from './Menu';
import Footer from '../Footer';
import Home from '../Home';



export default class App extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("login")
        const user_type =localStorage.getItem("user_type")

        
        let loggedIn =true
        // if(token==null){
        //     loggedIn = false
        // }
        let type = ''
        if(user_type==='Moderator'){
           type='Moderator'
        }
        if(user_type==='Redactor'){
            type='Redactor'
         }
    
         if(user_type==='HealthAgent'){
            type='HealthAgent'
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
        if(this.state.type ==='Moderator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if(this.state.type ==='HealthAgent'){
            return <Redirect to="/halthAgent_dashboard"/>
        }
        if(this.state.type ==='Redactor'){
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
