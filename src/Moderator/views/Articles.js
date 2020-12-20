import React, { Component } from 'react';
import Header from '../../Header';
import Menu from '../Menu';
import Footer from '../../Footer';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import "../../../node_modules/video-react/dist/video-react.css";

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
 const appropriateButton={
    backgroundColor:'#009F95',
    color: 'white',
    float:'right' 
 };
 const redBackground={
    backgroundColor:'#F9A2B2',
    
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
        
        let type = 'Moderator'
        if(userType==='SuperAdmin'){
           type='SuperAdmin'
        }
        if(userType==='Redactor'){
            type='Redactor'
        }
        if(userType==='HealthAgent'){
            type='HealthAgent'
        }
        if(userType==='WebUser'){
            type='WebUser'
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
        this.onClickInappropriateComment =this.onClickInappropriateComment.bind(this)
    }
//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          VALIDATE ARTICLE        ------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------    
onClickValidate = (id) =>{

        console.log(this.state)
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Articles/Article/Validate?id=${id}&validate=true`;
        axios.put(url/*,{
            headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
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

//--------------------------------------------------------------------------------------------------------------------
//----------------------------------          INVALIDATE ARTICLE        ----------------------------------------------
//--------------------------------------------------------------------------------------------------------------------    
    onClickInvalidate = (id) =>{

        console.log(this.state)
        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Articles/Article/Validate?id=${id}&validate=false`;
        axios.put(url/*,{
            headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
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
    //--------------------------------------------------------------------------------------------------------------------
    //----------------------------------          ARTICLE'S COMMENTS     -------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
     onClickGetComments = (id) =>{
    
        console.log(this.state)
        //const accessT oken = localStorage.getItem("accessToken")
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
    //----------------------------------          Inappropriate Comment     ----------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    onClickInappropriateComment = (idarticle,idcomment) =>{

    //const token = localStorage.getItem("login")
    let url = `${API_URL}/Articles/Article/Comments?id=${idarticle}&commentId=${idcomment}&inappropriate=true`;
    axios.put(url/*,{
    headers: {
        'content-type': 'application/json',
        Authorization: `Token ${token}`
    }
    }*/)
    .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.status === 200) {
                    console.log ("Comment declared Inappropriate successfully ")
                    alert('Comment declared Inappropriate successfully');
                        window.location.reload();
                }
            })
            .catch(error => {
                console.log(error.message)
                console.log(error)
                
            })

}

 //--------------------------------------------------------------------------------------------------------------------
    //----------------------------------          Inappropriate Comment     ----------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------
    onClickappropriateComment = (idarticle,idcomment) =>{

        //const token = localStorage.getItem("login")
        let url = `${API_URL}/Articles/Article/Comments?id=${idarticle}&commentId=${idcomment}&inappropriate=false`;
        axios.put(url/*,{
        headers: {
            'content-type': 'application/json',
            Authorization: `Token ${token}`
        }
        }*/)
        .then(response => {
                    console.log(response)
                    console.log(response.data)
                    if (response.status === 200) {
                        console.log ("Comment declared appropriate successfully ")
                        alert('Comment declared appropriate successfully');
                            window.location.reload();
                    }
                })
                .catch(error => {
                    console.log(error.message)
                    console.log(error)
                    
                })
    
    }
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
        if(this.state.type ==='Redactor'){
            return <Redirect to="/redactor_dashboard"/>
        }
        if(this.state.type ==='WebUser'){
            return <Redirect to="/webuser_dashboard"/>
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
                                      <div className="col-md-6" key={post.idArticle}>
                                          {/* Box Comment */}
                                        <div className="card card-widget collapsed-card">  
                                        <div className="card-header">
                                            <div className="user-block">
                                            <span  style={{color:'blue',fontSize:'20px'}}><b>{post.title}</b></span>
                                            <br/>
                                            {/*<span style={{color:'gray', fontSize:'13px'}} >Shared publicly - {post.date}</span>*/}
                                            </div>
                                            {/* /.user-block */}
                                            <div className="card-tools">
                                            {(post.articleValidate===true) ? 
                                            <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to invalidate this article?')) this.onClickInvalidate(post.idArticle) } }  style={validatedButton}>VALIDATED</button>
                                            :(post.articleValidate===false) ? 
                                            <button  className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish to validate this article?')) this.onClickValidate(post.idArticle) } } style={greenButton}  > VALIDATE </button>
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
                                            {/* Attachment 
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
                                            */}
                                            {/* /.attachment-block */}
                                            <hr/>
                                            <button type="button" onClick={() =>this.onClickGetComments(post.idArticle)} className="btn btn-default btn-sm  "><i className="fas fa-plus"></i> See Comments</button>
                                        
                                            </div>
                                         {/* /.card-body */}
                                         <div className="card-footer card-comments">
                                            {comment_list.length ? 
                                                comment_list.map(comment =>
                                                <div className="card-comment" key={comment.idCommentary}  >
                                                    {/* User image */}
                                                    <img className="img-circle img-sm" src="../dist/img/user5-128x128.jpg" alt="User_Image" />
                                                    <div className="comment-text">
                                                        <span className="username" >
                                                            User {comment.mobileuserid}
                                                        </span>{/* /.username */}
                                                        {(comment.inappropriate===false) ? 
                                                        <p >{comment.commentContent }    </p> 
                                                        :(comment.inappropriate===true) ?
                                                        <p style={redBackground}>{comment.commentContent }    </p> 
                                                        :null}                              
                                                        {(comment.inappropriate===false) ? 
                                                            <button type="button" className="btn btn-sm" onClick={() =>{ if (window.confirm('Are you sure you wish declare this comment as Inappropriate?')) this.onClickInappropriateComment(post.idArticle,comment.idCommentary) } }style={orangeButton}  > Declare as Inappropriate</button>
                                                        :(comment.inappropriate===true) ? 
                                                            <button type="button" className="btn btn-sm"  onClick={() =>{ if (window.confirm('Are you sure you wish declare this comment as appropriate?')) this.onClickappropriateComment(post.idArticle,comment.idCommentary) } }style={appropriateButton}> Declare as Appropriate </button>
                                                        :null}
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
