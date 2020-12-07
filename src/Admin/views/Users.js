import React, { Component } from 'react';
import '../adminStyle.css';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


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

export default class Users extends Component {
 
    constructor(props) {
        super(props)
        const token = localStorage.getItem("login")
        const user_type =localStorage.getItem("user_type")

        
        let loggedIn =true
        // if(token==null){
        //     loggedIn = false
        // }
        let type = ''
        if(user_type==='Moderator'){
           type='Moderator'
        }
        if(user_type==='Redactor'){
            type='Redactor'
         }
    
         if(user_type==='HealthAgent'){
            type='HealthAgent'
         }
        this.state = {
             loggedIn,
             type,
             users_list: [],
             username :'',
             password :'',
             email : '',
             first_name : '',
             last_name: '',
             user_type: ''
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)
        const token = localStorage.getItem("login")
        axios.defaults.headers = {
            "Content-Type" : "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .post('http://localhost:8080/Users/AddUser',{"idUser":"aa","userName":this.state.userName,"firstName":this.state.firstName,"secondName":this.state.last_name,"email":this.state.email,"passWord":this.state.passWord,"userType":this.state.userType})
            .then(response => {
                console.log(response)
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
                console.log("username or email already used")
                alert('the username or email are already used !');
            })

    }

     
    componentDidMount(){
        //get list of users
        const token = localStorage.getItem("login")
      
        axios.get('http://localhost:8080/Users/', {
            headers: {  
              'content-type': 'multipart/form-data',
              Authorization: `Token ${token}`
            }
          })
        .then(response => {
            console.log(response)
            this.setState({ users_list: response.data})
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

        const {users_list,user_type,username,password, email, first_name, last_name} = this.state
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
                                    <select id="user_type" className="form-control" name="user_type" value={user_type} onChange={this.changeHandler} style={{borderColor:'#009F95'}}>
                                    <option value="1">Moderator</option>
                                    <option value="3">Redactor</option>
                                    <option value="2">Health Agent</option>
                                    </select>
                                </div>
                                <br></br>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="first_name"  type="text" name="first_name" className="form-control" placeholder="First Name" value={first_name} onChange={this.changeHandler}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="last_name"  type="text" name="last_name"  className="form-control" placeholder="Last Name"  value={last_name} onChange={this.changeHandler}/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                    </div>
                                    <input id="username"  type="text" name="username"  className="form-control" placeholder="Username"  value={username} onChange={this.changeHandler}/>
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
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                                </div>
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
                                <th id="th1">USERNAME</th>
                                <th id="th2">EMAIL</th>
                                <th id="th3">TYPE</th>
                                <th id="th4">FIRST NAME</th>
                                <th id="th5">LAST NAME</th>
                            </tr>
                            </thead>
                           
                            <tbody>
                            {
                                users_list.length ? 
                                users_list.map(post =>  { return post.user_type==="Moderator" ? 
                                    <tr key={post.id}>
                                        <td>{post.username}</td>
                                        <td>{post.email}</td>
                                        <td><i className='fas fa-user-secret m-r-15'></i><i className='bg-danger'>Moderator</i></td>
                                        <td>{post.first_name}</td>
                                        <td>{post.last_name}</td>
                                    </tr> 
                                : post.user_type==="HealthAgent"? 
                                    <tr key={post.id}>
                                        <td>{post.username}</td>
                                        <td>{post.email}</td>
                                        <td><i className='fas fa-user-md m-r-15'></i><i className='bg-success'>Health Agent</i></td>
                                        <td>{post.first_name}</td>
                                        <td>{post.last_name}</td>
                                    </tr> 
                                : post.user_type==="Redactor"? 
                                <tr key={post.id}>
                                    <td>{post.username}</td>
                                    <td>{post.email}</td>
                                    <td><i className='fas fa-user-edit m-r-15'></i><i className='bg-primary'>Redactor</i></td>
                                    <td>{post.first_name}</td>
                                    <td>{post.last_name}</td>
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
