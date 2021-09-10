import React from 'react'
import Axios from 'axios'


const LogOut = () =>{
    Axios.get('http://localhost:5000/user/logout')
    return (
                
        <div className="sub-container">
            <h2>you successfully logged out , now you can not access protected router anymore</h2>
        </div>
        )
}

export default  LogOut