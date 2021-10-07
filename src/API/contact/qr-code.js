
import React, { useState, Component } from "react";
import "./contact.css";
import fetchClient from "../axiosClient/axiosClient";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import QrReader from "react-qr-scanner";

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 'Hold QR Code Steady and Clear to Scan',
        }
        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(result){
        this.setState({
            result: ''
        })
    }

    handleError(err){
        console.error(err)
    }
    render() {
        const previewStyle={
            height:700,
            width:1000,
            display: 'flex',
            justifyContent:"center"
        }
        const camStyle={
            display: 'flex',
            justifyContent: "center",
            marginTop: '-50px'
        }
        const textStyle={
            fontSize: '30px',
            textAlign: 'center',
            marginTop: '-50px'
        }
        return(
            <React.Fragment>
                <div style={camStyle}>
                    <QrReader
                        delay={100}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    />
                </div>
                <p style={textStyle}>
                    {this.state.result}
                </p>
            </React.Fragment>
        )
    }

}

export default AddUser;
