import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';  

export default function useAuth() {
    let history = useHistory();
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    //set user
    const setUserContext = async () => {
        return axios.get('http://localhost:5000/user/jwtTest').then(res => {         
            setUser(res.data.userName);
            history.push('/');                     
            }).catch((err) => {
            setError(err);
        })
    }

    //register user  
    const registerUser = async (data) => {
        console.log(data);
        const { username, email, password, passwordConfirm } = data;
            return axios.post(`http://localhost:5000/user/signup`, {
                  username,
                  email,
                  password,
                  passwordConfirm
                }).then(async () => {
                    setUserContext();
                })
                .catch((err) => {
                   return setError(err);
            })
        };

    //login user 
    const loginUser = async (data) => {
        const { username, password } = data;
        console.log("loging user")
            return axios.post('http://localhost:5000/user/login', {
                userName: username,
                password: password,
            }).then(async () => {
                
                setUserContext();
            }).catch((err) => {
                setError(err);
            })
        };

    return {
        registerUser,
        loginUser,
        error
    }
}