import React, { Component } from 'react';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};

const writeStyle={
    color:'#172B4D' 
};

const buttonStyle={
    backgroundColor:'#009F95'
};


export default class Forgot_password extends Component {
   
    render() {
        return (
           <div>
               <body class="hold-transition login-page" style= {bodyStyle}>
              <div className="login-box">
                
                <div className="card">
                <div className="card-body login-card-body">
                <div className="login-logo">
                <a href="/forgot_password" style={writeStyle}><b>Corona</b>Watch</a>
                </div>
                {/* /.login-logo */}
                    <p className="login-box-msg" style={writeStyle}>You forgot your password? Here you can easily retrieve a new password.</p>
                    <form action="/recover_password" method="post">
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" />
                        <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-envelope" />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <button type="submit" className="btn btn-info btn-block" style={buttonStyle}>Request new password</button>
                        </div>
                        {/* /.col */}
                    </div>
                    </form>
                    <p className="mt-3 mb-1">
                    <a href="/login" style={writeStyle}>Go to Login-page</a>
                    </p>
                </div>
                {/* /.login-card-body */}
                </div>
            </div>
            {/* /.login-box */}
            </body>
        </div>

        )
    }
}
