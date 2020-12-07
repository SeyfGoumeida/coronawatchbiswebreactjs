import React, { Component } from 'react';

//Styles
const bodyStyle={
    backgroundColor:'#172B4D' 
};
const writeStyle={
    color:'#009F95'
};

export default class Footer extends Component {
    render() {
        return (
            <div>
               <footer className="main-footer" style={bodyStyle}>
                <strong>Copyright © 2020-2021 <a href="SITE.COM" style={writeStyle}> Erifai_Goumeida</a>.</strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 1.0.0
                </div>
                </footer>

            </div>
        )
    }
}
