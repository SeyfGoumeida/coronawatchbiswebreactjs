import React, { Component } from 'react';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

//const API_URL = 'http://localhost:8080';
const API_URL = 'https://coronawatchbis.herokuapp.com';

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
const orangeButton={
    backgroundColor:'#e65c00',
    color: 'white',
    float:'right'
    
 };
 const blueButton={
    backgroundColor:'#5c5cd6',
    color: 'white',
    float:'right'
    
 };


export default class Articles extends Component {
    constructor(props) {
        super(props)
        const accessToken = localStorage.getItem("accessToken")

        let loggedIn =true
        if(accessToken==null){
            loggedIn = false
        }

        const userType =localStorage.getItem("usertype")
        
        let type = 'Redactor'
        if(userType==='SuperAdmin'){
           type='SuperAdmin'
        }
        if(userType==='HealthAgent'){
            type='HealthAgent'
         }
    
         if(userType==='Moderator'){
            type='Moderator'
         }
        this.state = {
             loggedIn,
             type,
             article_list: [],
             comment_list: [],
             content:'',
             title:'',
             attachments:null,
             attachments_get:[],
             article_detail:null
        }
        this.changeHandler =this.changeHandler.bind(this)
        this.submitHandler =this.submitHandler.bind(this)
        this.onClickDelete =this.onClickDelete.bind(this)
        this.onClickGet =this.onClickGet.bind(this)
        this.onClickGetComments =this.onClickGetComments.bind(this)
        this.onSubmitEdit =this.onSubmitEdit.bind(this)
        this.onClickDeleteAttachment =this.onClickDeleteAttachment.bind(this)
        this.onClickAddAttachment =this.onClickAddAttachment.bind(this)
    }

    updateContent = (value) => {
        this.setState({content:value})
    }
    /**
     * @property Jodit jodit instance of native Jodit
     */
    jodit;
    setRef = jodit => this.jodit = jodit;
    
    config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }
//for change the state from inputs value
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

//for put the file 
    onChangeFile(e){
        this.setState({
            attachments: e.target.files[0]
          })
        
    }

//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          GET ARTICLE DETAILS     ------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
   onClickGet = (id) =>{

    console.log(this.state)
    //const accessToken = localStorage.getItem("accessToken")

    let url = `${API_URL}/Articles/Article?id=${id}`;
    axios.get(url/*,{
        headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`
        }
    }*/)
        .then(response => {
            console.log(response)
            this.setState({ article_detail: response.data})
            if (response.status === 200) {
                this.setState({ content: this.state.article_detail.content})
                this.setState({ title: this.state.article_detail.title})
                //this.setState({ attachments_get: this.state.article_detail.attachments})
              }
        })

        .catch(error => {
            console.log(error.message)
            console.log(error)
              
        })

}

//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          ARTICLE'S COMMENTS     -------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
 onClickGetComments = (id) =>{

    console.log(this.state)
    //const accessToken = localStorage.getItem("accessToken")
    let url = `${API_URL}/Articles/Article/Comments?id=${id}`;
    axios.get(url/*,{
    headers: {
      'content-type': 'application/json',
      Authorization: `Token ${token}`
    }
  }*/)
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

//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          EDIT ARTICLE    --------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
onSubmitEdit = e =>{
    e.preventDefault();
        console.log(this.state)
        let id= this.state.article_detail.idArticle
        //const accessToken = localStorage.getItem("accessToken")
        let url =`${API_URL}/Articles/EditArticle?id=${id}`;
        let form_data = new FormData();
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
   
        axios.put(url,{  
            "title": this.state.title,
            "content": this.state.content
        }/*,{
         headers: {
            'content-type': 'application/json',
             Authorization: `Token ${token}`
       }
         }*/)
         .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Article updated successfully");
                    alert('Article updated successfully');
                     window.location.reload();
                  }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                  
            })
 
    }
  
    //--------------------------------------------------------------------------------------------------------------------
    //----------------             Add an attachment in edit the article        ------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    
        onClickAddAttachment = e =>{
            e.preventDefault();
            console.log(this.state)
            let id= this.state.article_detail.id
            //const accessToken = localStorage.getItem("accessToken")
            let form_data = new FormData();
        form_data.append('attachments', this.state.attachments, this.state.attachments.name);
        let url = `${API_URL}/${id}/attachments/`;
        axios.post(url/*, form_data, {
        headers: {
            'content-type': 'multipart/from-data',
            Authorization: `Token ${token}`
        }
        }*/)
        .then(response => {
                    console.log(response)
                    console.log(response.data)
                    if (response.status === 201) {
                        console.log ("Attachment added successfully")
                        alert('Attachment added  successfully');
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(error)
                    
                })

        } 
            
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          DELETE ARTICLE     --------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
    onClickDelete = (idArticle) =>{

        console.log(this.state)
        //const accessToken = localStorage.getItem("accessToken")
        let url = `${API_URL}/Articles/DeleteArticle?id=${idArticle}`;
        
        axios.delete(url/*,{
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
        .then(response => {
                    console.log(response)
                    console.log(response.data)
                    if (response.status === 200) {
                        console.log ("Article deleted successfully");
                        
                    alert('Article deleted successfully');
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(error)
                    
                })
 
    }
 //--------------------------------------------------------------------------------------------------------------------
//----------------------------------          DELETE ATTACHEMENT     --------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
    onClickDeleteAttachment = (id) =>{

        console.log(this.state)
        //const accessToken = localStorage.getItem("accessToken")
        let url = `${API_URL}/attachment/${id}/`;
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
                        console.log ("Attachement deleted successfully")
                        alert('Attachement deleted successfully');
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(error)
                    
                })
    
    }
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          NEW ARTICLE     --------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

   submitHandler = e =>{
        e.preventDefault();
        console.log(this.state)
        let url = `${API_URL}/Articles/AddArticle`;
        let form_data = new FormData();
        //const accessToken = localStorage.getItem("accessToken")
        //    if(this.state.attachments!=null){ 
        //        form_data.append('attachments', this.state.attachments, this.state.attachments.name);
        //     } else 
        //       form_data.append('attachments', this.state.attachments);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
    
        /*axios.post(url, form_data, {
        headers: {
            'content-type': 'multipart/from-data',
            Authorization: `Token ${token}`
        }
        })*/
        axios.post(url,
            {  
                "title": this.state.title,
                "content": this.state.content
               // "articleRedactor": this.state.
            }
        )
        .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Article Created successfully");
                    
                    alert('Article Created successfully');
                        window.location.reload();
                    }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                    
            })

   }
    //--------------------------------------------------------------------------------------------------------------------
    //----------------------------------       LIST OF ARTICLES   --------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    componentDidMount(){
        //const accessToken = localStorage.getItem("accessToken")
        let url = `${API_URL}/Articles`;
        axios.get(url/*, {
            headers: {
              'content-type': 'application/json',
              Authorization: `Token ${token}`
            }
          }*/)
        .then(response => {
            console.log(response)
            this.setState({ article_list: response.data})
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
        if(this.state.type ==='SuperAdmin'){
            return <Redirect to="/admin_dashboard"/>
        }
        if(this.state.type ==='HealthAgent'){
            return <Redirect to="/halthAgent_dashboard"/>
        }
        if(this.state.type ==='Moderator'){
            return <Redirect to="/moderator_dashboard"/>
        }
        

        const {article_list,content,title,attachments_get,comment_list}= this.state
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
                        <button id="add-btn" type="button" className="btn  btn-outline-light" data-toggle="modal" data-target="#exampleModal" style={buttonStyle} >
                            ADD NEW ARTICLE</button>
                            {/*<!-- Modal -->*/}
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" style={blueStyle}> <b>Add a new article</b></h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form onSubmit={this.submitHandler}>
                                <div className="modal-body">
                                {/* Content Wrapper. Contains page content */}
                                    
                                        {/* Main content */}
                                        <label style={{color:'gray'}}>Article's title : </label>
                                        <div className="input-group mb-3">
                                            
                                            
                                            <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-text-height" />
                                            </div>
                                            </div>
                                            <input id="titre1" type="text" name="title" value={title} onChange={this.changeHandler}  required className="form-control" placeholder="Title..."/>
                                        </div>
                                        <hr/>
                                        <label style={{color:'gray'}}>Article's Content : </label>
                                        <div className="card-body pad">
                                            <div className="mb-3">
                                            <JoditEditor
                                                id="contenu1"
                                                editorRef={this.setRef}
                                                    value={content}
                                                    config={this.config}
                                                    onChange={this.updateContent} 
                                                />
                                            </div>
                                        </div>
                                        <hr/>
                                        <label style={{color:'gray'}}>Article's attachments (Photo or video) : </label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fa fa-file" />
                                            </div>
                                            </div>
                                            <input type="file" id="file1"  name="attachments" onChange={(e)=>this.onChangeFile(e)} accept="image/*|video/*" className="form-control" placeholder="Attachement..."/>
                                            
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
                        <div className="card-body">
                            <div className="row">
                                 {
                                      article_list.length ? 
                                      article_list.map(post =>  
                                      <div className="col-md-6" key={post.idArticle}>
                                          {/* Box Comment */}
                                        <div className="card card-widget collapsed-card">  
                                        <div className="card-header">
                                            <div className="user-block">
                                            <span  style={{color:'black',fontSize:'20px'}}><b>{post.title}</b></span>
                                            <br/>
                                            <span style={{color:'gray', fontSize:'13px'}} >Shared publicly - {post.title}</span>
                                            </div>
                                            {/* /.user-block */}
                                            <div className="card-tools">
                                            <button type="button" className="btn" onClick={() =>this.onClickGet(post.idArticle)} data-toggle="modal" data-target="#editModal" style={blueStyle} >
                                            <i className="fas fa-edit"/> </button>
                                            {/*<!-- Modal -->*/}
                                            <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true" >
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="editModalLabel" style={blueStyle}> <b>Edit article</b></h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <form onSubmit={this.onSubmitEdit}>
                                                    <div className="modal-body">
                                                    {/* Content Wrapper. Contains page content */}
                                                
                                                    {/* Main content */}
                                                    <label style={{color:'gray'}}>Article's title : </label>
                                                    <div className="input-group mb-3">
                                                    
                                                        <div className="input-group-append">
                                                        <div className="input-group-text">
                                                            <span className="fa fa-text-height" />
                                                        </div>
                                                        </div>
                                                        <input type="text" name="title" value={title} onChange={this.changeHandler}  required className="form-control" placeholder="Title..."/>
                                                    </div>
                                                    <hr/>
                                                    <label style={{color:'gray'}}>Article's Content : </label>
                                                        <div className="mb-3">
                                                        <JoditEditor
                                                            editorRef={this.setRef}
                                                                value={content}
                                                                config={this.config}
                                                                onChange={this.updateContent} 
                                                            />
                                                            
                                                        </div>
                                                    
                                                    <hr/>
                                                    <label style={{color:'gray'}}>Article's attachments (Photo or video) : </label>
                                                    {/* Attachment */}
                                            {
                                                attachments_get.length ?
                                                attachments_get.map(attach => { return attach.attachment_type==='photo' ?
                                                    <div key={attach.id}>
                                                    <img className="img-fluid pad" src={attach.path} alt="Attachment_Image" style={{ width:'400px', height:'272px'}}/>
                                                    <button type="button" onClick={() =>{ if (window.confirm('Are you sure you wish to delete this attachment?')) this.onClickDeleteAttachment(attach.id) } } className="btn btn-sm" style={orangeButton}>Delete</button>
                                                    </div>
                                                    :attach.attachment_type==='video' ?
                                                    <div key={attach.path}>
                                                    <Player className="img-fluid pad"
                                                    playsInline src={attach.path} 
                                                    fluid={false}
                                                    width={480}
                                                    height={272}/>
                                                     <button type="button" onClick={() =>{ if (window.confirm('Are you sure you wish to delete this attachment?')) this.onClickDeleteAttachment(attach.id) } } className="btn btn-sm" style={orangeButton}>Delete</button>
                                                    
                                                    </div>

                                                :null}
                                                ):null
                                            }
                                            {/* /.attachment-block */}
                                            <hr/>
                                             <label style={{color:'gray'}}>Add a new attachment (Photo or video) : </label>
                                              <div>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-append">
                                                        <div className="input-group-text">
                                                            <span className="fa fa-file" />
                                                        </div>
                                                        </div>
                                                        <input type="file"  name="attachments" onChange={(e)=>this.onChangeFile(e)} accept="image/*|video/*" className="form-control" placeholder="Attachement..."/>
                                                        
                                                    </div>
                                                    <button  onClick={this.onClickAddAttachment} className="btn btn-sm" style={blueButton}>
                                                        Add this attachment</button>
                                             </div> 
                                             <br/>
                                             <br/>
                                           

                                                    {/* /.content */}
                                                
                                            </div>
                                            
                                            <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                            <button type="submit" id="edit-btn" className="btn btn-info " style={{backgroundColor:'#009F95'}}>
                                                Edit</button>
                                            </div>
                                            </form>
                                            
                                                    </div>
                                                </div>
                                                </div>
                                            <button type="button" className="btn " onClick={() =>{ if (window.confirm('Are you sure you wish to delete this article?')) this.onClickDelete(post.idArticle) } }><i className="fas fa-trash-alt"/></button>
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
                                            {/*
                                                post.attachments.length ?
                                                post.attachments.map(attach => { return attach.attachment_type==='photo' ?
                                                    <div key={attach.id}>
                                                    <img className="img-fluid pad" src={attach.path} alt="Attachment_Image" style={{ width:'400px', height:'272px'}}/>
                                                    </div>
                                                    :attach.attachment_type==='video' ?
                                                    <div key={attach.path}>
                                                    <Player className="img-fluid pad"
                                                    playsInline src={attach.path} 
                                                    fluid={false}
                                                    width={480}
                                                    height={272}/>
                                                    </div>

                                                :null}
                                                ):null
                                            */}
                                            {/* /.attachment-block */}
                                            <hr/>
                                            <button type="button" onClick={() =>this.onClickGetComments(post.idArticle)} className="btn btn-default btn-sm  "><i className="fas fa-plus"></i> See Comments</button>
                                        
                                        </div>
                                         {/* /.card-body */}
                                        <div className="card-footer card-comments">
                                        {
                                      comment_list.length ? 
                                      comment_list.map(comment =>  
                                      <div className="card-comment" key={comment.idCommentary}>
                                      
                                      {/* User image */}
                                      <img className="img-circle img-sm" src="../dist/img/user5-128x128.jpg" alt="User_Image" />
                                        <div className="comment-text">
                                          <span className="username">
                                          User {comment.mobileuserid}
                                          <span className="text-muted float-right">{comment.date}</span>
                                          </span>{/* /.username */}
                                         {comment.commentContent}
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
                <br/><br/><br/> <br/><br/><br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>

            {/* /.Articles.js*/}
            <Footer/>

        </div>

        )
    }
}
