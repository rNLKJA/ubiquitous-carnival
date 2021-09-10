import React,{useEffect,useState}  from 'react';
import {Route} from 'react-router-dom';
import Axios from 'axios'
import Login from "./Login"

Axios.defaults.withCredentials=true

const ProtectedRouters = ({component : Component, ...rest}) => {
    const [verify, setVerified] = useState(false);

    useEffect(() => {
        Axios.get('http://localhost:5000/user/jwtTest')
        .then((response) => {setVerified(response.data.status)}).catch((error) => setVerified(false))
        console.log(verify)
    }
    );


    return (
    <Route {...rest} render = {
         (props) => {
            if (verify) {
                console.log(' is authenticated')
                return <Component {...props} />
            }else{
                console.log( "need login");
                return <Login />
            }
        }
    }/>)
}



export default ProtectedRouters
   