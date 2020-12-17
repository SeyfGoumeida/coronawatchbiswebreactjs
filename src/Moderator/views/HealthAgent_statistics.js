import React, { Component } from 'react';
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
const blueStyle={
    color:'#172B4D' 
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

export default class HealthAgent_statistics extends Component {
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
             history:[]
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
    }

    // for validate statistics 
    onClickValidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/infectedregion/${id}/validate/`;
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
        const token = localStorage.getItem("login")
     let url = `${API_URL}/infectedregion/${id}/invalidate/`;
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
        const token = localStorage.getItem("login")
     let url = `${API_URL}/infectedregion/get-history/`;
     axios.get(url,{
        headers: {
          'content-type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    this.setState({ history: response.data})
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

        const {history}= this.state
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
                <table id="example1" className="table table-striped table-valign-middle">
                    <thead>
                        <tr>
                        <th id="th1">Username</th>
                        <th id="th2">Date</th>
                        <th id="th3">Place</th>
                        <th id="th4">State</th>
                        <th id="th5">More</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                history.length ? 
                                history.map(hist => 
                        <tr key={hist.id}>
                        <td>
                            <img src="../dist/img/avatar04.png" alt="Product 1" className="img-circle img-size-32 mr-2" />
                            User {hist.agentid}
                        </td>
                        <td>{hist.date}</td>
                                <td>{hist.region.country_detail.name}-{hist.region.region_name}</td>
                        <td>
                        {(hist.valide===true) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this statistic?')) this.onClickInvalidate(hist.id) } }  style={validatedButton}>VALIDATED</button>
                          :(hist.valide===false) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this statistic?')) this.onClickValidate(hist.id) } } style={greenButton}  >VALIDATE</button>
                          :null}

                        </td>
                        <td>
                        <button type="button" className="btn"  data-toggle="modal" data-target={"#exampleModal" + hist.id}  style={blueStyle}>
                        <i className="fas fa-search" />
                        </button>
                                    
                     {/*<!-- Modal -->*/}
                     <div className="modal fade" id={"exampleModal" + hist.id} tabIndex="-1" role="dialog" aria-labelledby={"exampleModalLabel"+hist.id} aria-hidden="true" >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                <div className="user-block">
                                <h5 className="modal-title" id={"exampleModalLabel"+hist.id}  style={blueStyle}>
                                         <b>{hist.region.country_detail.name}-{hist.region.region_name}</b>
                                         </h5>
                                            <span style={{color:'gray', fontSize:'13px'}} > {hist.date}</span>
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
                                        <b>{hist.nb_suspected}</b>
                                        
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
                                        <b>{hist.nb_recovered}</b>
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
                                        <b>{hist.nb_death}</b>
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
                                        <b>{hist.nb_confirmed}</b>
                                        </div>
                                        </div>
                                    </div>
                                    {/* END timeline item */}
                                    <div>
                                        <i className="fas bg-gray"></i>
                                        <div className="timeline-item">
                                        <h3 className="timeline-header">INFECTED BUT NOT YET SICK</h3>
                                        <div className="timeline-body">
                                        <b>{hist.nb_notyetsick}</b>
                                        </div>
                                        </div>
                                    </div>
                                    
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
                        <td></td>
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

                <br/><br/><br/><br/><br/><br/><br/>
                </div>


                <Footer/>
                
            </div>
        )
    }
}
