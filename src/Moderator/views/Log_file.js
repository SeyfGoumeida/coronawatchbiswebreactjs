import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const whiteStyle={
    color: 'white'
};
const blueStyle={
    color:'#009F95' 
};

export default class Log_file extends Component {
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
    componentDidMount(){

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
                        <h1 style={whiteStyle}>Log file</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Log file</li>
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
                        <th>Modification date</th>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Size</th>
                        <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>13/05/2020 </td>
                        <td style={{color:'blue'}}>Apache error</td>
                        <td>logs/error_log</td>
                        <td>1KB</td>
                        <td>
                        <button type="button" className="btn"  style={blueStyle}>
                        <i className="fa fa-download" />
                        </button>     
                        </td>
                        </tr>
                        <tr>
                        <td>15/03/2020</td>
                        <td style={{color:'blue'}}>Apache access(rotated)</td>
                        <td>logs/access_log_processed</td>
                        <td>2.18KB</td>
                        <td>
                        <button type="button" className="btn" style={blueStyle}>
                        <i className="fa fa-download" />
                        </button>   
                        </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                </div>
                    </div>
                </div>
                </section>

                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                

                </div>

                <Footer/>
                
            </div>
        )
    }
}
