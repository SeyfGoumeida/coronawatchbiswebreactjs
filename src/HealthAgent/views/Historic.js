import React, { Component } from 'react';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://coronawatch.herokuapp.com/api/geo';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
}; 

const buttonStyle={
    borderColor:'#172B4D',
    color:'#172B4D',
    float:'right'
};

export default class Historic extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("login")
        const user_type =localStorage.getItem("user_type")

        
        let loggedIn =true
        if(token==null){
            loggedIn = false
        }
        let type = '2'
        if(user_type==='0'){
           type='0'
        }
        if(user_type==='1'){
            type='1'
         }
    
         if(user_type==='3'){
            type='3'
         }
        this.state = {
             loggedIn,
             type,
             country_list: [],
             country_id : '',
             region_list: [],
             region_id:'',
             history:[],
             riskregion:''
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.onClickGetCountryDetail =this.onClickGetCountryDetail.bind(this)
        this.onClickGetHistoric =this.onClickGetHistoric.bind(this)
        this.onClickDeclareRiskRegion =this.onClickDeclareRiskRegion.bind(this)
        this.onClickUndeclareRiskRegion =this.onClickUndeclareRiskRegion.bind(this)
    }


    updateCountry_id = (event) => {
        this.setState({country_id:event.target.value})
    }

    updateRegion_id = (event) => {
        this.setState({region_id:event.target.value})
    }

    //for change the state from inputs value
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

    //for get Country details 
   onClickGetCountryDetail = (id) =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/country/${id}/`;
 axios.get(url,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ region_list: response.data.regions})
                console.log("List regions getted")
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

//for get Region epidemic history
onClickGetHistoric = (id) =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/infectedregion/get-history/${id}/`;
 axios.get(url,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ history: response.data.history})
                this.setState({ riskregion: response.data.riskregion})
                console.log("Region detail getted")
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

// for declare this region as a risk region
onClickDeclareRiskRegion = (id) =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/region/${id}/risk/`;
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
  // for undeclare this region as a risk region
  onClickUndeclareRiskRegion = (id) =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/region/${id}/inrisk/`;
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


componentDidMount(){
    //for get the list of Contries
    const token = localStorage.getItem("login")
    let url = `${API_URL}/country/`;
    axios.get(url, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
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
    if(this.state.type ==='1'){
        return <Redirect to="/moderator_dashboard"/>
    }
    if(this.state.type ==='3'){
        return <Redirect to="/redactor_dashboard"/>
    }
    const {country_list,country_id,region_list,region_id,history,riskregion}= this.state
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
                    <h1 style={whiteStyle}>Regions Epidemic History</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                    <li className="breadcrumb-item active" style={whiteStyle}>Regions Epidemic History</li>
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
                    <h5 className="card-title" style={{color:'#172B4D'}}>Regions Epidemic History</h5>
                    </div>
            <div className="container-fluid">
            <br/>

                
                    <div className="row">
                <div className="input-group mb-3 col-sm-6 col-12">
                 <select className="form-control" name="country_id" 
                        value={country_id} onChange={this.updateCountry_id.bind(this)}   style={{borderColor:'#009F95'}}> 
                               <option>Chose a Country ...</option>
                                {
                                  country_list.length ? 
                                  country_list.map(count =>  
                                <option value={count.id} key={count.id}>{count.name}</option>
                                ): null}
                </select>
                             
                 </div>
                 <div className="input-group mb-3 col-sm-6 col-12">
                 <button type="button" id="search1" onClick={() =>{if (country_id !=='')  this.onClickGetCountryDetail(country_id) } }
                 className="btn-sm  btn-outline-light"  style={buttonStyle}>
                                Search Regions</button>
                
                 </div>
                 </div>
                 
                 
                 <div className="row">
                 <div className="input-group mb-3 col-sm-6 col-12">
                 <select className="form-control" name="region_id" 
                        value={region_id} onChange={this.updateRegion_id.bind(this)}   style={{borderColor:'#009F95'}}> 
                               <option>Chose a Region ...</option>
                                {
                                  region_list.length ? 
                                  region_list.map(reg =>  
                                <option value={reg.id} key={reg.id}>{reg.region_name}</option>
                                ): null}
                </select>
                
                 </div>
                 <div className="input-group mb-3 col-sm-6 col-12">
                 <button type="button" id="view_hist" onClick={() =>{if (region_id !=='') this.onClickGetHistoric(region_id)}} className="btn-sm  btn-outline-light"  style={buttonStyle}>
                                 View Region's Historic</button>
                                 &nbsp;&nbsp;

                 {(riskregion===true) ? 
                                    <button type="button" className="btn btn-danger" onClick={() =>{ if (window.confirm('Are you sure you wish to undeclare this region as a risk region?')) this.onClickUndeclareRiskRegion(region_id) } } >Undeclare It As Risk Region</button>
                                :(riskregion===false) ? 
                                     <button type="button" className="btn btn-success" onClick={() =>{ if (window.confirm('Are you sure you wish to declare this region as a risk region?')) this.onClickDeclareRiskRegion(region_id) } }   >Declare It As Risk Region</button>
                                     :null}       
                 
                 </div>
                </div>

<br/><br/>
                {/*table*/}

                <table id="example1" className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th id="th1">DATE</th>
                                <th id="th2">INFECTED</th>
                                <th id="th3">RECOVERED</th>
                                <th id="th4">DECEASED</th>
                                <th id="th5">CURRENTLY SICK</th>
                                <th id="th6">INFECTED BUT NOT YET SICK</th>
                            </tr>
                            </thead>
                           
                            <tbody>
                            {
                                history.length ? 
                                history.map(hist =>  
                                    <tr key={hist.date}>
                                        <td>{hist.date}</td>
                                        <td>{hist.nb_suspected}</td>
                                        <td>{hist.nb_recovered}</td>
                                        <td>{hist.nb_death}</td>
                                        <td>{hist.nb_confirmed}</td>
                                        <td>{hist.nb_notyetsick}</td>
                                    </tr> 
                                
                                 ) : null
                                
                            }
                             <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                       
                           
                            </tbody>
                        
                        </table>
                        

            </div>
            <br/><br/><br/><br/><br/>
            </div>
            
            </div>
            </div>
            <br/><br/><br/>
            </section>

            </div>

            <Footer/>
        </div>
    )
}
}
