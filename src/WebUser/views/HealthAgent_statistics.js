import React, { Component } from 'react';
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
const blueStyle={
    color:'#172B4D' 
};


export default class HealthAgent_statistics extends Component {
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
             stats :[1]
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
    }

    // for validate statistics 
    onClickValidate = (id) =>{

        console.log(this.state)
        //const token = localStorage.getItem("login")
     let url = `${API_URL}/Statistics/Region/Validate?id=${id}&validate=true`;
     axios.put(url/*,'',{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     }*/)
     .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Health agent statistics validated successfully");
                    
                alert('Health agent statistics validated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    // for invalidate an article
    onClickInvalidate = (id) =>{

        console.log(this.state)
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Statistics/Region/Validate?id=${id}&validate=false`;
        axios.put(url/*,'',{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     }*/)
     .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Health agent statistics invalidated successfully");
                    
                alert('Health agent statistics invalidated successfully');
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
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Statistics/Regions/Validate`;
        axios.get(url/*,{
            headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
            }
        }*/)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ stats: response.data})
                    console.log("Statistic getted")
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
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
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

        const {stats}= this.state
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
                        <h1 style={whiteStyle}>Health agent statistics</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Health agent statistics</li>
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
                    <h3 className="card-title"  style={{color:'#172B4D'}}>Health Agents Statistics</h3> 
                </div>
                
                <div className="card-body table-responsive ">
                <table id="example1" className="table table-striped table-valign-middle" >
                    <thead>
                        <tr>
                            <th id="th2">Region Name</th>
                            <th id="th1">Deaths</th>
                            <th id="th3">Recovered</th>
                            <th id="th5">Confirmed</th>
                            <th id="th1">Suspected</th>
                            <th id="th4">More</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                                stats.length ? 
                                stats.map(stat => 
                                    <tr key={stat.idStatistics}>
                                    <td>{stat.statisticsRegionName}</td>
                                    <td>{stat.nbDeaths}</td>
                                    <td>{stat.nbRecovered}</td>
                                    <td>{stat.nbConfirmed}</td>
                                    <td>{stat.nbSuspected}</td>
                                    <td> <button type="button" className="btn"  data-toggle="modal" data-target={"#exampleModal" + stat.idStatistics}  style={blueStyle}> <i className="fas fa-search" /></button>
                                    
                     {/*<!-- Modal -->*/}
                     <div className="modal fade" id={"exampleModal" + stat.idStatistics} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+stat.idStatistics} aria-hidden="true" >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                <div className="user-block">
                                <h5 className="modal-title" id={"exampleModalLabel"+stat.idStatistics}  style={blueStyle}>
                                        {/* <b>{stat.region.country_detail.name}-{stat.region.region_name}</b>*/}
                                         </h5>
                                            <span style={{color:'gray', fontSize:'13px'}} > {stat.date}</span>
                                            </div>
                                   
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form >
                                <div className="modal-body">
                                {/* Content Wrapper. Contains page content */}
                                    
                                        {/* Main content */}
                                {/* Timelime example  */}
                                <div className="row">
                                <div className="col-md-12">
                                    {/* The time line */}
                                    <div className="timeline">
                                    {/* timeline item */}
                                    <div>
                                        <i className="fas fa-chart-line bg-blue" />
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">INFECTED</h3>
                                        <div className="timeline-body">
                                        <b>{stat.nbSuspected}</b>
                                        
                                        </div>
                                        
                                        </div>
                                    </div>
                                    {/* END timeline item */}
                                    {/* timeline item */}
                                    <div>
                                        <i className="fas fa-user-check bg-green" />
                                        <div className="timeline-item">
                                        <h3 className="timeline-header no-border">RECOVERED</h3>
                                        <div className="timeline-body">
                                        <b>{stat.nbRecovered}</b>
                                        </div>
                                        </div>
                                    </div>
                                    {/* END timeline item */}
                                    {/* timeline item */}
                                    <div>
                                        <i className="fas fa-user-minus bg-yellow" />
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">DECEASED</h3>
                                        <div className="timeline-body">
                                        <b>{stat.nbDeaths}</b>
                                        </div>
                                       
                                        </div>
                                    </div>
                                   {/* END timeline item */}
                                    {/* timeline item */}
                                    <div>
                                        <i className="fas fa-user-times bg-red" />
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">CURRENTLY SICK</h3>
                                        <div className="timeline-body">
                                        <b>{stat.nbConfirmed}</b>
                                        </div>
                                        </div>
                                    </div>
                                    {/* END timeline item */}
                                   
                                    </div>
                                </div>
                                {/* /.col */}
                                </div>
      
                                        {/* /.content */}
                                    
                                </div>
                                
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                                </form>
                                </div>
                            </div>
                            </div>
                            
                        </td>
                        </tr>
                          ) : null
                                
                        }
                         <tr>
                        </tr>
                       
                       </tbody>
                    </table>

                </div>
                </div>
                    </div>
                </div>
                </section>

                <br/><br/><br/><br/><br/><br/><br/>
                </div>


                <Footer/>
                
            </div>
        )
    }
}
