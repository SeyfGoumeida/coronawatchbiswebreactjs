import React, { Component } from 'react';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

const API_URL = 'https://coronawatch.herokuapp.com/api/article';


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

export default class Articles extends Component {

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
             article_list: [],
             comment_list: []
        }
        this.onClickValidate =this.onClickValidate.bind(this)
        this.onClickInvalidate =this.onClickInvalidate.bind(this)
        this.onClickGetComments =this.onClickGetComments.bind(this)
        this.onClickDeleteComment =this.onClickDeleteComment.bind(this)
    }
    // for validate an article
    onClickValidate = (id) =>{

        console.log(this.state)
        const token = localStorage.getItem("login")
     let url = `https://coronawatch.herokuapp.com/api/article/${id}/validate/`;
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
                    console.log ("Article validated successfully");
                    
                alert('Article validated successfully');
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
     let url = `https://coronawatch.herokuapp.com/api/article/${id}/invalidate/`;
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
                    console.log ("Article invalidated successfully");
                    
                alert('Article invalidated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }

    //for get article's Comments
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

//for delete an comment 
onClickDeleteComment = (id) =>{

    const token = localStorage.getItem("login")
 let url = `${API_URL}/detailComment/${id}/`;
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
        //get list of articles
        const token = localStorage.getItem("login")
        let url='https://coronawatch.herokuapp.com/api/article/'
        axios.get(url, {
            headers: {
              'content-type': 'multipart/form-data',
              Authorization: `Token ${token}`
            }
          })
        .then(response => {
            console.log(response)
            this.setState({ article_list: response.data})
        })
        .catch(error => {
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

        const {article_list,comment_list}= this.state

        return (
            <div>
             
                <Header/>
                <Menu/>

            {/*Articles.js*/}
            <div className="content-wrapper" style={bodyStyle}>
                {/* Content Header (Page header) */}
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 style={whiteStyle}>Articles</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/admin_dashboard" style={whiteStyle}>Home</a></li>
                        <li className="breadcrumb-item active" style={whiteStyle}>Articles</li>
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
                        <h5 className="card-title" style={{color:'#172B4D'}}>Articles</h5>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="row">
                            {
                                      article_list.length ? 
                                      article_list.map(post =>  
                                      <div className="col-md-6" key={post.id}>
                                          {/* Box Comment */}
                                        <div className="card card-widget collapsed-card">  
                                        <div className="card-header">
                                            <div className="user-block">
                                            <span  style={{color:'blue',fontSize:'20px'}}><b>{post.title}</b></span>
                                            <br/>
                                            <span style={{color:'gray', fontSize:'13px'}} >Shared publicly - {post.date}</span>
                                            </div>
                                            {/* /.user-block */}
                                            <div className="card-tools">
                                            {(post.valide===true) ? 
                                            <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this article?')) this.onClickInvalidate(post.id) } }  style={validatedButton}>VALIDATED</button>
                                            :(post.valide===false) ? 
                                            <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this article?')) this.onClickValidate(post.id) } } style={greenButton}  >VALIDATE</button>
                                            :null}
                                                
                                            <button type="button" className="btn " data-card-widget="maximize" style={blueStyle}><i className="fas fa-expand"></i></button>
                                            <button type="button" className="btn " data-card-widget="collapse"style={blueStyle}><i className="fas fa-plus" />
                                            </button>
                                            <button type="button" className="btn " data-card-widget="remove"style={blueStyle}><i className="fas fa-times" />
                                            </button>
                                            </div>
                                            {/* /.card-tools */}
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body">
                                            {/* post text */}
                                            <div dangerouslySetInnerHTML={{ __html: post.content }}/>
                                            {/* Attachment */}
                                            {
                                                post.attachments.length ?
                                                post.attachments.map(attach => { return attach.attachment_type==='photo' ?
                                                    <div key={attach.id}>
                                                    <img className="img-fluid pad" src={attach.path} alt="Attachment_Image" style={{ width:'400px', height:'270px'}}/>
                                                    </div>
                                                    :attach.attachment_type==='video' ?
                                                    <div key={attach.path}>
                                                    <Player playsInline src={attach.path} 
                                                    className="img-fluid pad"
                                                    fluid={false}
                                                    width={480}
                                                    height={272}/>
                                                    </div>

                                                :null}
                                                ):null
                                            }
                                            {/* /.attachment-block */}
                                            <hr/>
                                            <button type="button" onClick={() =>this.onClickGetComments(post.id)} className="btn btn-default btn-sm  "><i className="fas fa-plus"></i> See Comments</button>
                                        
                                            </div>
                                         {/* /.card-body */}
                                         <div className="card-footer card-comments">
                                         {
                                      comment_list.length ? 
                                      comment_list.map(comment =>  
                                      <div className="card-comment" key={comment.id}>
                                      
                                      {/* User image */}
                                      <img className="img-circle img-sm" src="../dist/img/user5-128x128.jpg" alt="User_Image" />
                                        <div className="comment-text">
                                          <span className="username">
                                          User {comment.mobileuserid}
                                          <span className="text-muted float-right">{comment.date}</span>
                                          </span>{/* /.username */}
                                         {comment.content}
                                         <button type="button" className="btn btn-sm" style={orangeButton} onClick={() =>{ if (window.confirm('Are you sure you wish to delete this comment?')) this.onClickDeleteComment(comment.id) } }>Delete</button>
                                            
                                      </div>
                                      {/* /.comment-text */}
                                      </div>
                                      
                                      ): null}
                                           
                                        </div>
                                            
                                       </div>    
                                      </div>
                                  ): null
                                 }    
                            </div>
                            {/* /.row */}

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
                <br/><br/><br/> <br/><br/><br/> <br/><br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>

            {/* /.Articles.js*/}
            <Footer/>

        </div>

        )
    }
}
