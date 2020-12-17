import React, { Component } from 'react';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';

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
 const blueStyle={
    color:'#172B4D' 
};

export default class Robots extends Component {

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
             type
        }
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
                        <h1 style={whiteStyle}>Robots Content</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Robots content</li>
                        </ol>
                    </div>
                    </div>
                </div>{/* /.container-fluid */}
                </section>
                {/* Main content */}

<br/><br/><br/>
                <div className="container">
                <div className="row justify-content-around">

                <div className="card" style={{width: '18rem'}}>
               <img src="../dist/img/facebook.jpg"  className="card-img-top" alt="..." />
                <div className="card-body">
                    <h4 id="h4_facebook" className="card-title font-weight-bold " style={blueStyle}>FACEBOOK POSTS</h4>
                   
                    <br/><br/>
                    <div className="col text-center">
                    <a id="btn1" href="/moderator_dashboard/robots/robots_facebook" className="btn btn-primary" style={greenButton}>CHECK CONTENT</a>
                    </div>
                </div>
                </div>
                {/* /.card */}


                <div className="card" style={{width: '18rem'}}>
               <img src="../dist/img/youtube.png"  className="card-img-top" alt="..." />
                <div className="card-body">
                    <h4 id="h4_youtube" className="card-title font-weight-bold" style={blueStyle}>YOUTUBE VIDEOS</h4>
                  
                    <br/><br/>
                    <div className="col text-center">
                    <a id="btn2" href="/moderator_dashboard/robots/robots_youtube" className="btn btn-primary" style={greenButton}>CHECK CONTENT</a>
                    </div>
                </div>
                </div>
                {/* /.card */}

                <div className="card" style={{width: '18rem'}}>
               <img src="../dist/img/web.png"  className="card-img-top" alt="..." />
                <div className="card-body">
                
                    <h4 id="h4_web" className="card-title font-weight-bold" style={blueStyle}>WEBSITES ARTICLES</h4>
            
                    <br/><br/>
                    <div className="col text-center">
                    <a id="btn3" href="/moderator_dashboard/robots/robots_webSites" className="btn btn-primary" style={greenButton}>CHECK CONTENT</a>
                    </div>
                </div>
                </div>
                {/* /.card */}

                </div>
                </div>

                    <br/><br/><br/>

                </div>

                <Footer/>
            </div>
        )
    }
}
