import React, { Component } from 'react'
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
//import ReactPlayer from 'react-player/youtube';
//import YouTube from '@u-wave/react-youtube';
import Iframe from 'react-iframe'
import axios from 'axios';
const API_URL = 'https://coronawatch.herokuapp.com/api/robot';

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
 const orangeButton={
    backgroundColor:'#e65c00',
    color: 'white',
    float:'right'
    
 };
 const blueStyle={
    color:'#172B4D' 
};
const buttonStyle={
    borderColor:'#172B4D',
    color:'#172B4D',
    float:'right'
};

export default class Robots_youtube extends Component {
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
             videos_list: [],
             comment_list:[],
             setting_list:[],
             q:[],
             maxResults:'',
             order:''
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
        this.onClickGetComments =this.onClickGetComments.bind(this)
        this.onClickDeleteComment =this.onClickDeleteComment.bind(this)
        this.onClickGetSettings =this.onClickGetSettings.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
        this.changeHandler =this.changeHandler.bind(this)
        
    }

    //for change the state from inputs value
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

    //for set new settings to youtube robot
   submitHandler = e =>{
    e.preventDefault();
    console.log(this.state)
    const token = localStorage.getItem("login")
    let form_data = new FormData();
    //this.state.q.map((qq) => form_data.append('q', qq));
    form_data.append('q', this.state.q);
    form_data.append('maxResults', this.state.maxResults);
    form_data.append('order', this.state.order);
    let url = `${API_URL}/config/youtube/`;
 axios.post(url, form_data, {
   headers: {
     'content-type': 'application/json',
     Authorization: `Token ${token}`
   }
 })
 .then(response => {
            console.log(response)
            console.log(response.data)
            if (response.status === 201) {
                console.log ("New youtube robot configuration seted successfully");
                alert('New youtube robot configuration seted successfully');
                 window.location.reload();
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

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
                console.log ("Youtube video validated successfully");
                
            alert('Youtube video validated successfully');
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
                console.log ("Youtube video invalidated successfully");
                
            alert('Youtube video invalidated successfully');
                 window.location.reload();
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

//for get youtube video's Comments
onClickGetComments = (id) =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/${id}/comments/`;
 axios.get(url,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
        .then(response => {
            console.log(response)
            this.setState({ comment_list: response.data})
            if (response.status === 200) {
                console.log("List comment getted")
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}
//for get Settigs of yotube robot search
onClickGetSettings = () =>{

    console.log(this.state)
    const token = localStorage.getItem("login")
 let url = `${API_URL}/config/youtube/`;
 axios.get(url,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  })
        .then(response => {
            console.log(response)
            this.setState({ setting_list: response.data})
            this.setState({ q: response.data.q})
            this.setState({ maxResults: response.data.maxResults})
            this.setState({ order: response.data.order})
            if (response.status === 200) {
                console.log("Settings of youtube robot getted")
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

//for delete an comment 
onClickDeleteComment = (id) =>{

    const token = localStorage.getItem("login")
 let url = `${API_URL}/comments/${id}/`;
 axios.delete(url,{
   headers: {
     'content-type': 'application/json',
     Authorization: `Token ${token}`
   }
 })
 .then(response => {
            console.log(response)
            console.log(response.data)
            if (response.status === 204) {
                console.log ("Comment deleted successfully")
                alert('Comment deleted successfully');
                    window.location.reload();
              }
        })
        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

    componentDidMount(){
        //for get the list of youtube videos
        const token = localStorage.getItem("login")
        let url = `${API_URL}/?source=youtube`;
        axios.get(url, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Token ${token}`
            }
          })
        .then(response => {
            console.log(response)
            this.setState({ videos_list: response.data})
            if (response.status === 200) {
                console.log("List of youtube videos getted")
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

        const {videos_list,comment_list,q,maxResults,order}= this.state

        /*const opts = {
            height: '600',
            width: '1200',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };*/

        return (
            <div>
             
                <Header/>
                <Menu/>

                <div className="content-wrapper" style={bodyStyle}>
                {/* Content Header (Page header) */}
               {/* Content Header (Page header) */}
               <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 style={whiteStyle}>Youtube videos</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Youtube videos</li>
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
                        <h5 className="card-title" style={{color:'#172B4D'}}>Youtube Videos</h5>
                        <button  type="button" onClick={() =>this.onClickGetSettings()} className="btn  btn-outline-light" data-toggle="modal" data-target="#exampleModal" style={buttonStyle} >
                            Configure Youtube Search</button>
                            {/*<!-- Modal -->*/}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" style={blueStyle}> <b>Configure Youtube Search</b></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.submitHandler}>
                                <div className="modal-body">
                                {/* Content Wrapper. Contains page content */}
                                    
                                        {/* Main content */}
                                        <label style={{color:'gray'}}>Keyword for research : </label>
                                        <div className="input-group mb-3">
                                            <input type="text" name="q" value={q} onChange={this.changeHandler}  required className="form-control" placeholder="Title..."/>
                                        </div>

                                        <label style={{color:'gray'}}>Maximum number of results : </label>
                                        <div className="input-group mb-3">
                                            <input type="text" name="maxResults" value={maxResults} onChange={this.changeHandler}  required className="form-control" placeholder="Title..."/>
                                        </div>
                                        
                                        <label style={{color:'gray'}}>Order by : </label>
                                        <div className="input-group mb-3">
                                   
                                    <select id="user_type" className="form-control" name="order" value={order} onChange={this.changeHandler} style={{borderColor:'#009F95'}}>
                                    <option value="date">Date</option>
                                    <option value="rating">Rating</option>
                                    <option value="relevance">Relevance</option>
                                    <option value="viewCount">View Count</option>
                                    </select>
                                </div>
                                       
                                        
                                        {/* /.content */}
                                    
                                </div>
                                
                                <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" id="save-btn" className="btn btn-info " style={{backgroundColor:'#009F95'}}>
                                    Save</button>
                                </div>
                                </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* /.card-header */}
                
                <div className="card-body ">
                    {/* Video cards */}
                    {
                        videos_list.length ? 
                        videos_list.map(video =>  
                    <div className="card" key={video.id}> 

                    <div className="card-header">
                    <div className="user-block">
                        <span className="description">Shared publicly - {video.date}</span>
                    </div>
                    </div>

                   <div className="card-body" >

                   {/*<ReactPlayer className="img-fluid pad" 
                    url={'https://www.youtube.com/watch?v='+ video.url} />*/}

                   
                   {/*
                   <hr/>
                   <YouTube
                        video={video.url}
                        opts={opts}
                        onReady={this._onReady}
                   />
                   <hr/>*/}

                    <Iframe url={"http://www.youtube.com/embed/"+video.url }
                        width="100%" 
                        height="275"
                        allowfullscreen
                        id={video.id}
                        display="initial"
                        position="relative"
                        />
                    

                        </div>
                    

                        <div className="card-footer card-comment">
                            <div className="row">
                            <div className="col-8">
                            <button type="button" onClick={() =>this.onClickGetComments(video.id)} className="btn btn-default btn-sm "><i className="fas fa-plus"></i> See Comments</button>          
                            </div>
                            <div className="col-4 text-right">
                            {(video.valide===true) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this youtube video?')) this.onClickInvalidate(video.id) } }  style={validatedButton}>VALIDATED</button>
                          :(video.valide===false) ? 
                         <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this youtube video?')) this.onClickValidate(video.id) } } style={greenButton}  >VALIDATE</button>
                          :null}
                          </div>
                          {/*Comments*/}
                          
                          {
                                      comment_list.length ? 
                                      comment_list.map(comment =>  
                                      <div className="card-comment col-12" key={comment.id}>
                                      <hr/>
                                      {/* User image */}
                                      <img className="img-circle img-sm" src="../../dist/img/avatar3.png" alt="User_Image" />
                                        <div className="comment-text">
                                          <span className="username">
                                          User{comment.mobileuserid}
                                          <span className="text-muted float-right">{comment.date}</span>
                                          </span>{/* /.username */}
                                          &nbsp;
                                         {"   "+comment.content}
                                         <button type="button" className="btn btn-sm" style={orangeButton} onClick={() =>{ if (window.confirm('Are you sure you wish to delete this comment?')) this.onClickDeleteComment(comment.id) } }>Delete</button>
                                            
                                      </div>
                                      {/* /.comment-text */}
                                      </div>
                                      
                                      
                         ): null}   
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
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
}
