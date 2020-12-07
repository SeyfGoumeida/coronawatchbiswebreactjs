import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export default class Signout extends Component {
    constructor(props) {
        super(props)

        localStorage.removeItem("login")
        localStorage.removeItem("user_type")
        localStorage.removeItem("user_id")
 
    }
    
    render() {
        return (
           <Redirect to="/"/>
        )
    }
}
