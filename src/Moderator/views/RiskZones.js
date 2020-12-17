import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import axios from 'axios';


const API_URL = 'https://coronawatch.herokuapp.com/api/geo';


//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
};

const greenButton={
    borderColor:'#172B4D',
    backgroundColor:'#009F95',
    color: 'white'
    
 };
 const validatedButton={
    borderColor:'#172B4D',
    backgroundColor:' #cceeff',
    color: '#009F95'
    
 };

export default class RiskZones extends Component {
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
             type,
             risk_zones:[]
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
    }

    // for validate a risk zone 
    onClickValidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/region/${id}/validaterisk/`;
     axios.patch(url,'',{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     })
     .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("risk zone validated successfully");
                    
                alert('Risk zone validated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    // for invalidate a risk zone
    onClickInvalidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/region/${id}/invalidaterisk/`;
     axios.patch(url,'',{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     })
     .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Risk zone invalidated successfully");
                    
                alert('Risk zone invalidated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    componentDidMount(){

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/region/?riskregion=true`;
     axios.get(url,{
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ risk_zones: response.data})
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

        const {risk_zones}= this.state
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
                        <th id="th2">Country</th>
                        <th id="th3">Region</th>
                        <th id="th4">State</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                risk_zones.length ? 
                                risk_zones.map(risk => 
                        <tr key={risk.id}>
                        <td>
                            <img src="../dist/img/avatar04.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                            User {risk.riskagentid}
                        </td>
                        <td>{risk.country_detail.name}</td>
                        <td>{risk.region_name}</td>
                        <td>
                        {(risk.riskvalide===true) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this region as a risk zone?')) this.onClickInvalidate(risk.id) } }  style={validatedButton}>VALIDATED</button>
                          :(risk.riskvalide===false) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this region as a risk zone?')) this.onClickValidate(risk.id) } } style={greenButton}  >VALIDATE</button>
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
