import React, { Component } from 'react';
import Header from '../Header';
import Menu from './Menu';
import Footer from '../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
//var DatePicker = require("react-bootstrap-date-picker");
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = 'http://localhost:8080';
//const API_URL = 'https://coronawatchbis.herokuapp.com';

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
const buttonStyle={
    borderColor:'#172B4D',
    color:'#172B4D',
    float:'right'
};

export default class App extends Component {
    constructor(props) {
        super(props)

        const accessToken = localStorage.getItem("accessToken")

        let loggedIn =true
        if(accessToken==null){
            loggedIn = false
        }

        const userType =localStorage.getItem("usertype")
        
        let type = 'HealthAgent'
        if(userType==='SuperAdmin'){
           type='SuperAdmin'
        }
        if(userType==='Redactor'){
            type='Redactor'
        }
        if(userType==='Moderator'){
            type='Moderator'
        }
        if(userType==='WebUser'){
            type='WebUser'
        }
        
        this.state = {
             loggedIn,
             type,
             country_list: [],
             idCountry : '',
             region_list: [],
             idRegion:'',
             nb_death:'',
             nb_recovered:'',
             nb_suspected:'',
             nb_confirmed:'',
             nb_notyetsick:'',
             regionRisk:'',
             startDate: new Date()
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.onClickGetCountryDetail =this.onClickGetCountryDetail.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
        this.onClickDeclareregionRisk =this.onClickDeclareregionRisk.bind(this)
        this.onClickUndeclareregionRisk =this.onClickUndeclareregionRisk.bind(this)
    }

    //for date picker

    handleChange = date => {
        this.setState({
          startDate: date
        });
      };


    updateidCountry = (event) => {
        this.setState({idCountry:event.target.value})
    }

    updateidRegion = (event) => {
        this.setState({idRegion:event.target.value})
    }

    //for change the state from inputs value
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------  GET COUNTRY REGIONS & COUNTRY STATISTICS     -----------------------------------
//--------------------------------------------------------------------------------------------------------------------
    onClickGetCountryDetail = (id) =>{

    console.log(this.state)
    //const accessToken = localStorage.getItem("accessToken")
    let url = `${API_URL}/Regions/CountryRegionsById?idCountry=${id}`;
    let url1 = `${API_URL}/Regions/CountryById?idCountry=${id}`;
    axios.all([
    axios.get(url/*,{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     }*/),
     axios.get(url1/*,{
       headers: {
         'content-type': 'application/json',
         Authorization: `Token ${token}`
       }
     }*/)
   
   ])
   .then(([response, response1]) => 
   {
        console.log(response)
        console.log(response1)
        if (response.status === 200) {
            this.setState({ region_list: response.data})
            console.log("List regions getted")
        }
        if (response1.status === 200) {
            this.setState({ nb_death: response1.data.countryStatistics.nbDeaths})
            this.setState({ nb_recovered: response1.data.countryStatistics.nbRecovered})
            this.setState({ nb_suspected: response1.data.countryStatistics.nbSuspected})
            this.setState({ nb_confirmed: response1.data.countryStatistics.nbConfirmed})
            console.log("Statistic total of country getted")
        }
    })
    .catch(([error, error1]) => {
               console.log("get list region error"+error.message)
               console.log(error)
                
               console.log("get Statistic total of country error"+error1.message)
               console.log(error1)
               console.log("status1===",error1.response.status)
           })
   
   }


//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          GET REGIONS  STATISTICS              -----------------------------------
//--------------------------------------------------------------------------------------------------------------------
onClickGetRegionStatistics = (id) =>{

    console.log(this.state)
    //const token = localStorage.getItem("login")
    let url = `${API_URL}/Regions/RegionById?id=${id}`;
 axios.get(url/*,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  }*/)
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ nb_death: response.data.regionStatistics.nbDeaths})
                this.setState({ nb_recovered: response.data.regionStatistics.nbRecovered})
                this.setState({ nb_suspected: response.data.regionStatistics.nbSuspected})
                this.setState({ nb_confirmed: response.data.regionStatistics.nbConfirmed})
                this.setState({ regionRisk: response.data.regionRisk})
                console.log("Region detail getted")
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------            Declare Region Risk                -----------------------------------
//--------------------------------------------------------------------------------------------------------------------
onClickDeclareregionRisk = (id) =>{

    console.log(this.state)
    //const token = localStorage.getItem("login")
    let url = `${API_URL}/Regions/Risk?id=${id}&risk=NonValidatedRisk`;
    axios.post(url/*,'',{
   headers: {
     'content-type': 'application/json',
     Authorization: `Token ${token}`
   }
 }*/)
 .then(response => {
            console.log(response)
            console.log(response.data)
            if (response.status === 200) {
                console.log ("Region declared as risk region successfully");
                
            alert('Region declared as risk region successfully');
            window.location.reload();
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------            Undeclare Region Risk                ---------------------------------
//--------------------------------------------------------------------------------------------------------------------  
onClickUndeclareregionRisk = (id) =>{

    console.log(this.state)
    //const token = localStorage.getItem("login")
 let url = `${API_URL}/Regions/Risk?id=${id}&risk=NonRisk`;
 axios.post(url/*,'',{
   headers: {
     'content-type': 'application/json',
     Authorization: `Token ${token}`
   }
 }*/)
 .then(response => {
            console.log(response)
            console.log(response.data)
            if (response.status === 200) {
                console.log ("Region indeclared as risk region successfully");
                
            alert('Region indeclared as risk region successfully');
            window.location.reload();
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

//--------------------------------------------------------------------------------------------------------------------
//----------------------------------            Edit Statistics                    -----------------------------------
//--------------------------------------------------------------------------------------------------------------------
submitHandler = e =>{
    e.preventDefault();
    console.log(this.state)
   // const token = localStorage.getItem("login")
        let url = `${API_URL}/Regions/Statistics?id=${this.state.idRegion}`;
        axios.post(url, {
            "nbDeaths": this.state.nb_death,
            "nbRecovered": this.state.nb_recovered,
            "nbSuspected": this.state.nb_suspected,
            "nbConfirmed": this.state.nb_confirmed
        }/*, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
        .then(response => {
                    console.log(response)
                    console.log(response.data)
                    if (response.status === 200) {
                        console.log ("New values added successfully");
                        
                    alert('New values added successfully');
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(error)
                    
                })

 }
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------            GET LIST OF COUNTRIES            -------------------------------------
//--------------------------------------------------------------------------------------------------------------------
    componentDidMount(){
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Regions/Countries`;
        axios.get(url/*, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Token ${token}`
            }
          }*/)
        .then(response => {
            console.log(response)
            this.setState({ country_list: response.data})
            if (response.status === 200) {
                console.log("List contries getted")
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

    }

    //--------------------------------------------------------------------------------------------------------------------
    //----------------------------------                 Render           ------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    render() {
        if(this.state.loggedIn ===false){
            return <Redirect to="/"/>
        }
        if(this.state.type ==='SuperAdmin'){
            return <Redirect to="/admin_dashboard"/>
        }
        if(this.state.type ==='Moderarator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if(this.state.type ==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        if(this.state.type ==='WebUser'){
            return <Redirect to="/webuser_dashboard"/>
        }
        const {country_list,idCountry,region_list,idRegion,nb_death,nb_recovered,
            nb_suspected,nb_confirmed,regionRisk}= this.state
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
                        <h1 style={whiteStyle}>Virus Information</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Virus Information</li>
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
                        <div className="card-header">
                        <h5 className="card-title" style={{color:'#172B4D'}}>Statistics</h5>
                        </div>
                <div className="container-fluid">
                <br/><br/><br/>
  
                    
                        <div className="row">
                    <div className="input-group mb-3 col-sm-6 col-12">
                     <select className="form-control" name="idCountry" 
                            value={idCountry} onChange={this.updateidCountry.bind(this)}   style={{borderColor:'#009F95'}}> 
                                   <option>Choose a Country ...</option>
                                    {
                                      country_list.length ? 
                                      country_list.map(count =>  
                                    <option value={count.idCountry} key={count.idCountry}>{count.countryName}</option>
                                    ): null}
                    </select>
                                 
                     </div>
                     <div className="input-group mb-3 col-sm-6 col-12">
                     <button id="search1" type="button"  onClick={() =>{if (idCountry !=='')  this.onClickGetCountryDetail(idCountry) } }
                     className="btn-sm  btn-outline-light"  style={buttonStyle}>
                                    Search Country Details</button>
                    
                     </div>
                     </div>
                     
                     
                     <div className="row">
                     <div className="input-group mb-3 col-sm-6 col-12">
                     <select className="form-control" name="idRegion" 
                            value={idRegion} onChange={this.updateidRegion.bind(this)}   style={{borderColor:'#009F95'}}> 
                                   <option>Chose a Region ...</option>
                                    {
                                      region_list.length ? 
                                      region_list.map(reg =>  
                                    <option value={reg.idRegion} key={reg.idRegion}>{reg.regionName}</option>
                                    ): null}
                    </select>
                    
                     </div>
                     <div className="input-group mb-3 col-sm-6 col-12">
                     <button id="search2" type="button" onClick={() =>{if (idRegion !=='') this.onClickGetRegionStatistics(idRegion)}} className="btn-sm  btn-outline-light"  style={buttonStyle}>
                                     Search Region Details</button>
                                     &nbsp; &nbsp;  

                    {(regionRisk==="NonValidatedRisk") ? 
                                    <button type="button" className="btn btn-danger" onClick={() =>{ if (window.confirm('Are you sure you wish to undeclare this region as a risk region?')) this.onClickUndeclareregionRisk(idRegion) } } >Undeclare It As Risk Region</button>
                                :(regionRisk==="NonRisk") ? 
                                     <button type="button" className="btn btn-success" onClick={() =>{ if (window.confirm('Are you sure you wish to declare this region as a risk region?')) this.onClickDeclareregionRisk(idRegion) } }   >Declare It As Risk Region</button>
                                     :null}          
                     
                     </div>
                    </div>

                    <br/>
                    <div className="row ">
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                        <span className="info-box-icon bg-info"><i className="fas fa-chart-line" /></span>
                        <div className="info-box-content">
                            <span id="span1" className="info-box-text">Infected</span>
                            <span className="info-box-number">{nb_suspected}</span>
                        </div>
                        {/* /.info-box-content */}
                        </div>
                        {/* /.info-box */}
                    </div>
                    {/* /.col */}
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                        <span className="info-box-icon bg-success"><i className="fas fa-user-check" /></span>
                        <div className="info-box-content">
                            <span id="span2" className="info-box-text">Recovered</span>
                    <span className="info-box-number">{nb_recovered}</span>
                        </div>
                        {/* /.info-box-content */}
                        </div>
                        {/* /.info-box */}
                    </div>

                    {/* /.col */}
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                        <span className="info-box-icon bg-warning"><i className="fas fa-user-minus" /></span>
                        <div className="info-box-content">
                            <span id="span3" className="info-box-text">Confirmed </span>
                            <span className="info-box-number">{nb_confirmed}</span>
                        </div>
                        {/* /.info-box-content */}
                        </div>
                        {/* /.info-box */}
                    </div>

                    {/* /.col */}
                    <div className="col-md-3 col-sm-6 col-12">
                        <div className="info-box">
                        <span className="info-box-icon bg-danger"><i className="fas fa-user-times" /></span>
                        <div className="info-box-content">
                            <span id="span4" className="info-box-text">Deceased</span>
                            <span className="info-box-number">{nb_death}</span>
                        </div>
                        {/* /.info-box-content */}
                        </div>
                        {/* /.info-box */}
                    </div>
                    {/* /.col */}
                    </div>
                    {/* /.row */}
                     <br/>
                    <div className="row">
                    <div className="col-6 col-md-4"></div>
                    <div className="col-6 col-md-4 text-center">
                    <button id="insert_values" type="button" className="btn btn-info " data-toggle="modal" data-target="#exampleModal" style={{backgroundColor:'#009F95',borderColor:'#172B4D'}}>
                                     Insert new values</button>
                                    
                     {/*<!-- Modal -->*/}
                     <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" style={blueStyle}> <b>INSERT NEW VALUES</b></h5>
                                   
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.submitHandler}>
                                <div className="modal-body">
                                {/* Content Wrapper. Contains page content */}
                                    
                                 {/* Main content */}
                                       
                                {/* Timelime example  */}
                                <div className="row">
                                <div className="col-md-12">
                                    {/* The time line */}
                                    <div className="timeline">
                                    
                                    <div>
                                        <i className="fas bg-gray"></i>
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">Date</h3>
                                        <div className="timeline-body">
                                        {/*<DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />*/}
                                        <div className="input-group mb-3"> 
                                        <DatePicker
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}
                                            dateFormat="MMMM d, yyyy"
                                            isClearable
                                        />
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    {/* timeline item */}
                                    <div>
                                        <i className="fas fa-chart-line bg-blue" />
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">INFECTED</h3>
                                        <div className="timeline-body">
                                        <div className="input-group mb-3">  
                                            <input id="nb_suspected" type="text" name="nb_suspected" value={nb_suspected} onChange={this.changeHandler} className="form-control" placeholder="Infected..."/>
                                        </div>
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
                                        <div className="input-group mb-3">  
                                            <input id="nb_recovered" type="text" name="nb_recovered" value={nb_recovered} onChange={this.changeHandler} className="form-control" placeholder="Recovered..."/>
                                        </div>
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
                                        <div className="input-group mb-3">  
                                            <input id="nb_death" type="text" name="nb_death" value={nb_death} onChange={this.changeHandler} className="form-control" placeholder="Deceased..."/>
                                        </div>
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
                                        <div className="input-group mb-3">  
                                            <input id="nb_confirmed" type="text" name="nb_confirmed" value={nb_confirmed} onChange={this.changeHandler} className="form-control" placeholder="Currently Sick..."/>
                                        </div>
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
                                
                                <button type="submit" id="insert" className="btn btn-info " style={{backgroundColor:'#009F95'}}>
                                    Insert Values</button>
                                </div>
                                </form>
                                </div>
                            </div>
                            </div>
                            </div>
                        
                     </div>
                </div>
                <br/><br/><br/>
                </div>
                
                </div>
                </div>
                <br/>
                </section>

                </div>

                <Footer/>
            </div>
        )
    }
}
