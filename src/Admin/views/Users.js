import React, { Component } from 'react';
import '../adminStyle.css';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:8080';
//const API_URL = 'https://coronawatchbis.herokuapp.com';


//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const blueStyle={
    color:'#172B4D' 
};
const whiteStyle={
    color: 'white'
}; 

const buttonStyle={
    borderColor:'#172B4D',
    color:'#172B4D',
    float:'right'
};
const deleteButtonStyle={
    borderColor:'#FFFFFF',
    color:'#FFFFFF',
    backgroundColor:'#CB0630',    
};


export default class Users extends Component {
 
    constructor(props) {
        super(props)
        const accessToken = localStorage.getItem("accessToken")
        let loggedIn =true
        if(accessToken==null){
            loggedIn = false
        }

        this.state = {
             loggedIn,
             users_list: [],
             userName :'',
             password :'',
             email : '',
             firstName : '',
             lastName: '',
             userType: ''
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
        this.onClickDeleteUser =this.onClickDeleteUser.bind(this)

    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
       // const accessToken = localStorage.getItem("accessToken")
        // axios.defaults.headers = {
        //     "Content-Type" : "application/json",
        //     "Authorization": `Token ${token}`
        // };
    
        axios.post(`${API_URL}/Users/AddUser`,{
            "idUser":"",
            "userName":this.state.userName,
            "firstName":this.state.firstName,
            "lastName":this.state.lastName,
            "email":this.state.email,
            "passWord":this.state.passWord,
            "userType":this.state.userType
        })
            .then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("User created successfully");
                    alert('User created successfully');
                     window.location.reload();
                  }
                
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                console.log("userName or email already used")
                alert('the userName or email are already used !');
            })
            console.log(this.state)
    }

    //for deleting a USEr 
    onClickDeleteUser = (username) =>{

        //const accessToken = localStorage.getItem("accessToken")
        let url = `${API_URL}/Users/DeleteUser?username=${username}`;
        axios.delete(url/*,{
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
        .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 204) {
                    console.log ("User deleted successfully")
                    alert('User deleted successfully');
                        window.location.reload();
                }
                window.location.reload();

            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                
            })

    }
    componentDidMount(){
        //get list of users
        //const token = localStorage.getItem("login")
      

        axios.get( `${API_URL}/Users `)
        .then(response => {
            console.log("hadi esmha response a chikh",response)
            this.setState({ users_list: response.data})
            console.log("hadi esmha users list a chikh",this.state.users_list)
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
            console.log("User list not found")
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
       
        if(this.state.type ==='Moderator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        if(this.state.type ==='HealthAgent'){
            return <Redirect to="/halthAgent_dashboard"/>
        }
        if(this.state.type ==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        if(this.state.userType ==='WebUser'){
            return <Redirect to="/webuser_dashboard"/>
        }

        const {users_list,userType,userName,password, email, firstName, lastName} = this.state
        return (
            <div>
                <Header/>
                <Menu/>

            {/*Users.js*/}
            <div className="content-wrapper" style={bodyStyle}>
                {/* Content Header (Page header) */}
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 style={whiteStyle}>Users</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Users</li>
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
                        <h5 className="card-title" style={{color:'#172B4D'}}>Users</h5>
                        <button id="add_user" type="button" className="btn  btn-outline-light" data-toggle="modal" data-target="#exampleModal" style={buttonStyle} >
                            ADD USER</button>
                            {/*<!-- Modal -->*/}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" style={blueStyle}> <b>Create a new user account</b></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <form onSubmit={this.submitHandler}>
                                    <br></br>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-question-circle" />
                                    </div>
                                    </div>
                                    <select id="userType" className="form-control" name="userType" value={userType} onChange={this.changeHandler} style={{borderColor:'#009F95'}} required>
                                        <option value="">Select a Type</option>
                                        <option value="Moderator">Moderator</option>
                                        <option value="Redactor">Redactor</option>
                                        <option value="HealthAgent">Health Agent</option>
                                    </select>
                                </div>
                                <br></br>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="firstName"  type="text" name="firstName" className="form-control" placeholder="First Name" value={firstName} onChange={this.changeHandler}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="lastName"  type="text" name="lastName"  className="form-control" placeholder="Last Name"  value={lastName} onChange={this.changeHandler}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="userName"  type="text" name="userName"  className="form-control" placeholder="userName"  value={userName} onChange={this.changeHandler}/>
                                </div>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                                </div>
                                <input id="email"   type="email" name="email"  className="form-control" placeholder="Email"  value={email} onChange={this.changeHandler}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                                </div>
                                <input id="password"  type="password" name="password"  className="form-control" placeholder="Password"  value={password} onChange={this.changeHandler}/>
                            </div>
                            
                            <br></br>
                            <div className="row">
                                {/* /.col */}
                                
                                <div className="col-4">
                                <button id="add_account" type="submit" className="btn btn-info btn-block " style={{backgroundColor:'#009F95', marginLeft:'150px'}}>
                                    Add account</button>
                                </div>
                                {/* /.col */}
                            </div>
                            </form>
                                </div>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th id="th3">TYPE</th>
                                <th id="th1">USERNAME</th>
                                <th id="th2">EMAIL</th>
                                <th id="th4">FIRST NAME</th>
                                <th id="th5">LAST NAME</th>
                                <th id="th5">DELITE</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                users_list.length ? 
                                users_list.map(post =>  { return post.userType==="Moderator" ? 
                                    <tr key={post.idUser}>
                                        <td>
                                            <i className='fas fa-user-secret m-r-15'></i>
                                            <i className='bg-danger'>Moderator</i>
                                        </td>
                                        <td>{post.userName}</td>
                                        <td>{post.email}</td>
                                        <td>{post.firstName}</td>
                                        <td>{post.lastName}</td>
                                        <td>
                                            <button type="button" className="btn btn-sm" style={deleteButtonStyle} onClick={() =>{ if (window.confirm('Are you sure you wish to delete this User?')) this.onClickDeleteUser(post.userName) } }> Delete </button>

                                        </td>
                                    </tr> 
                                : post.userType==="HealthAgent"? 
                                    <tr key={post.id}>
                                        <td>
                                            <i className='fas fa-user-md m-r-15'></i>
                                            <i className='bg-success'>Health Agent</i>
                                        </td>
                                        <td>{post.userName}</td>
                                        <td>{post.email}</td>
                                        <td>{post.firstName}</td>
                                        <td>{post.lastName}</td>
                                        <td>
                                            <button type="button" className="btn btn-sm" style={deleteButtonStyle} onClick={() =>{ if (window.confirm('Are you sure you wish to delete this User?')) this.onClickDeleteUser(post.userName) } }> Delete </button>

                                        </td>
                                    </tr> 
                                : post.userType==="Redactor"? 
                                <tr key={post.id}>
                                    <td>
                                        <i className='fas fa-user-edit m-r-15'></i>
                                        <i className='bg-primary'>Redactor</i>
                                    </td>
                                    <td>{post.userName}</td>
                                    <td>{post.email}</td>
                                    <td>{post.firstName}</td>
                                    <td>{post.lastName}</td>
                                    <td>
                                            <button type="button" className="btn btn-sm" style={deleteButtonStyle} onClick={() =>{ if (window.confirm('Are you sure you wish to delete this User?')) this.onClickDeleteUser(post.userName) } }> Delete </button>

                                    </td>
                                </tr> 
                                
                                :null}
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
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
                </section>
                {/* /.content */}
                <br/><br/> <br/><br/><br/> <br/>
            </div>

            {/* /.Users.js*/}
            <Footer/>
        </div>

        )
    }
}
