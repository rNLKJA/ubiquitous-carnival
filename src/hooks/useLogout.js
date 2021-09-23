
import { useHistory } from 'react-router-dom';
import axios from 'axios';

    const LogoutUser = async () => {
        try {
            console.log('trying to logout')
           await axios({
                method: 'GET',
                url: `http://localhost:5000/user/logout`,
            }).then(res => { 
                console.log(res); 
                window.location.href = "/login"
            })
        } catch(err) {
            console.log(err);
        } 
    }

    export default LogoutUser;


