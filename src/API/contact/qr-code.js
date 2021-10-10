
import React, { useState, Component, useRef} from "react";
import "./contact.css";
import fetchClient from "../axiosClient/axiosClient";
// import qr_code from "./qr-code.png";
// import hand_write from "./notes.png";
import QrReader from "react-qr-reader";

const AddUser = () => {
    const qrRef = useRef(null);
    //const [state,setState]=useState(false);
    const [scanResultWebCam, setScanResultWebCam] = useState("");
    const [userName, setUserName] = useState("");
    const BASE_URL = "https://crm4399.herokuapp.com";
    const submitUserID = async (e) => {
        e.preventDefault();

        const contact = {
            userName,
        };

        await fetchClient
            .post(BASE_URL + "/contact/createContactByUserName", contact)
            .then(res => console.log(res)) // TODO: duplicate account issue
            .catch((err) => {
                console.error(err);
            });

        setUserName("");
    };

/*    const [scanResultFile, setScanResultFile] =useState("");
    const handleErrorFile = (error) =>{
        console.log(error);
    }
    const handleScanFile = (result) => {
        if (result){
            setScanResultFile(result);
        }
    }

    const onScanFile = () => {
        qrRef.current.openImageDialog();

    }*/

    const handleErrorWebCam = (error) => {
        console.log(error)

    }

    const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
        }

    }


    return (
        <React.Fragment>
            <div className="sub-container">
                <h1 className="add-contact-container">QR Code</h1>
                <div>
{/*                    <button onClick={onScanFile}>Scan Qr Code</button>
                    <QrReader
                        ref={qrRef}
                        delay = {300}
                        style = {{width: '100%'}}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                    />
                    <div>Scanned Code:{scanResultFile}</div>*/}

                    <QrReader
                        delay = {300}
                        style={{width: '100%'}}
                        onError = {handleErrorWebCam}
                        onScan = {handleScanWebCam}
                    />
                    <h3>UserID: {scanResultWebCam}</h3>
                    <form className="newID" method="POST" onSubmit={submitUserID}>
                        {setUserName.bind(this,scanResultWebCam)}
                        <input type="submit" value="Confirm"/>
                    </form>

                </div>


            </div>
        </React.Fragment>

    )

}

export default AddUser;
