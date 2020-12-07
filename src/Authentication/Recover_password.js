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


export default class Recover_password extends Component {
    render() {
        return (
            <div>
            <body class="hold-transition login-page" style={bodyStyle}>
            <div className="login-box">
                <div className="card">
                <div className="card-body login-card-body">  
                <div className="login-logo">
                <a href="/recover_password" style={writeStyle}><b>Corona</b>Watch</a>
                </div>
                {/* /.login-logo */}
                    <p className="login-box-msg" style={writeStyle}>You are only one step a way from your new password, recover your password now.</p>
                    <form action="/login" method="post">
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" />
                        <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock" />
                        </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Confirm Password" />
                        <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock" />
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-block" style={buttonStyle}>Change password</button>
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
