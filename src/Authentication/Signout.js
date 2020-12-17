import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';


export default class Signout extends Component {
    constructor(props) {
        super(props)

        localStorage.removeItem("accessToken")
        localStorage.removeItem("usertype")
        localStorage.removeItem("id")
 
    }
    
    render() {
        return (
           <Redirect to="/"/>
        )
    }
}
