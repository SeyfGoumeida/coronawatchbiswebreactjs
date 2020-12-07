import React, { Component } from 'react'

export default class Err404 extends Component {
    render() {
        return (
            <body className="hold-transition login-page">
                <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>404 Error Page</h1>
                        </div>
                        </div>
                    </div>{/* /.container-fluid */}
                    </section>
                    {/* Main content */}
                    <section className="content">
                    <div className="error-page">
                        <h2 className="headline text-warning"> 404</h2>
                        <div className="error-content">
                        <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Account not found.</h3>
                        <p>
                            We could not find this account.
                            Meanwhile, you may <a href="/login">return to login page</a>.
                        </p>
                        </div>
                        {/* /.error-content */}
                    </div>
                    {/* /.error-page */}
                    </section>
                    {/* /.content */}
                    <br/>
                    <br/>
                </div>

                </div>
                </body>

        )
    }
}
