import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';

import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import axios from 'axios';


const API_URL = 'https://coronawatch.herokuapp.com/api/video';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
};
const blueStyle={
    color: '#172B4D'
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

export default class Client_videos extends Component {
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
             videos_list:[]
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
    }

    // for validate client video 
    onClickValidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/${id}/validate/`;
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
                    console.log ("Client video validated successfully");
                    
                alert('Client video validated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    // for invalidate client video
    onClickInvalidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `${API_URL}/${id}/invalidate/`;
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
                    console.log ("Client video invalidated successfully");
                    
                alert('Client video invalidated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    componentDidMount(){
        //for getting the list of client video
        const token = localStorage.getItem("login")
        let url = `${API_URL}/`;
        axios.get(url, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Token ${token}`
            }
          })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                this.setState({ videos_list: response.data})
                console.log("List videos client getted")
              }
            
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })
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

        const {videos_list}= this.state
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
                        <h1 style={whiteStyle}>Client videos</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Cilent videos</li>
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
                    <h3 className="card-title"  style={{color:'#172B4D'}}>Client Videos</h3> 
                </div>
                
                <div className="card-body ">
                    {/* Video cards */}
                    {
                        videos_list.length ? 
                        videos_list.map(post => 
                    <div className="card" key={post.id}>
                    <div className="card-header">
                    <div className="user-block">
                        <img className="img-circle" src="../dist/img/user8-128x128.jpg" alt="user"/>
                        <span className="username" style={{color:'blue',fontSize:'20px'}}><b>User {post.mobileuserid}</b></span>
                        <span className="description">Shared publicly - {post.date}</span>
                    </div>
                    </div>
                        <div className="card-body">
                        <b style={blueStyle}>Title : </b> {post.title} <br/><br/>
                        <Player playsInline src={post.path} 
                        className="img-fluid pad "
                        fluid={false}
                            width={1200}
                            height={272}/>

                        </div>

                        <div className="card-footer">
                            <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4 text-right">
                            {(post.valide===true) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this client video?')) this.onClickInvalidate(post.id) } }  style={validatedButton}>VALIDATED</button>
                          :(post.valide===false) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this client video?')) this.onClickValidate(post.id) } } style={greenButton}  >VALIDATE</button>
                          :null}
                        </div>
                        </div>
                        </div>
                    </div>
                    ): null}
                   

                </div>
                </div>
                </div>
                </div>
                </section>


                </div>

                <Footer/>
                
            </div>
        )
    }
}
