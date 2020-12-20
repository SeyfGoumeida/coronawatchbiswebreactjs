import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import axios from 'axios';


//const API_URL = 'http://localhost:8080'; 
const API_URL = 'https://coronawatchbis.herokuapp.com';


//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
};


 const RISK={
    borderColor:'#172B4D',
    backgroundColor:' #F61941',
    color: '#black'
    
 };
 const NOTYETRISK={
    borderColor:'#172B4D',
    backgroundColor:' #FCD0D8',
    color: 'black'
    
 };
 const SAFE={
    borderColor:'#172B4D',
    backgroundColor:'#009F95',
    color: 'white'
    
 };

export default class RiskZones extends Component {
    constructor(props) {
        super(props)
        const accessToken = localStorage.getItem("accessToken")

        let loggedIn = true;
        if (accessToken == null) {
        loggedIn = false;
        }

        const userType = localStorage.getItem("usertype");

        let type = "WebUser";
        if (userType === "SuperAdmin") {
        type = "SuperAdmin";
        }
        if (userType === "Redactor") {
        type = "Redactor";
        }
        if (userType === "HealthAgent") {
        type = "HealthAgent";
        }
        if (userType === "Moderator") {
        type = "Moderator";
        }
        this.state = {
             loggedIn,
             type,
             zones:[]
        }
        
    }



    componentDidMount(){

        console.log(this.state)
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Regions`;
        axios.get(url/*,{
            headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
            }
        }*/)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ zones: response.data})
                    console.log("risk zones getted")
                  }
            })
    
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
    

        //js
        const script =document.createElement("script");
        script.src='../js/DataTable.js';
        script.async=true;
        document.body.appendChild(script);

    }

    render() {
        if (this.state.loggedIn === false) {
          return <Redirect to="/" />;
        }
        if (this.state.type === "SuperAdmin") {
          return <Redirect to="/admin_dashboard" />;
        }
        if (this.state.type === "HealthAgent") {
          return <Redirect to="/halthAgent_dashboard" />;
        }
        if (this.state.type === "Redactor") {
          return <Redirect to="/redactor_dashboard" />;
        }
        if (this.state.type === "Moderator") {
          return <Redirect to="/moderator_dashboard" />;
        }

        const {zones}= this.state
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
                        <h1 style={whiteStyle}>Risk zones</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Risk zones</li>
                        </ol>
                    </div>
                    </div>
                </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}

                <section className="content">
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                <div className="card-header border-0">
                    <h3 className="card-title"  style={{color:'#172B4D'}}>Risk Zones</h3> 
                </div>
                
                <div className="card-body table-responsive ">
                <table id="example1" className="table table-striped table-valign-middle">
                    <thead>
                        <tr>
                        <th id="th1">Username</th>
                        {/*<th id="th2">Country</th>*/}
                        <th id="th3">Region</th>
                        <th id="th4">State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                zones.length ? 
                                zones.map(zone => 
                        <tr key={zone.idRegion}>
                        <td>
                            <img src="../dist/img/avatar04.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                            User {zone.riskagentid}
                        </td>
                        {/*<td>{zone.country_detail.name}</td>*/}
                        <td>{zone.regionName}</td>
                        <td>
                        {(zone.regionRisk==="ValidatedRisk") ? 
                         <button  className="btn btn-sm" style={RISK}> Risk Zone </button>
                          :(zone.regionRisk==="NonValidatedRisk") ? 
                         <button  className="btn btn-sm" style={NOTYETRISK} >Non confirmed yet Risk Zone</button>
                          :(zone.regionRisk==="NonRisk") ?
                          <button  className="btn btn-sm" style={SAFE} > Safe Zone </button>

                          :null}

                        </td>
                       
                        </tr>
                          ) : null
                                
                        }
                         <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                       
                       </tbody>
                    </table>

                </div>
                </div>
                    </div>
                </div>
                </section>

                <br/><br/><br/><br/><br/><br/><br/><br/>
                </div>


                <Footer/>
                
            </div>
        )
    }
}
