import { useState, useEffect } from 'react';
import axios from 'axios';
export default function useFindUser() {
   const [user, setUser] = useState(null);
   const [isLoading, setLoading] = useState(true);
useEffect(() => {
   async function findUser() {
     await axios.get('http://localhost:5000/user/jwtTest')
        .then(res => {
        setUser(res.data.currentUser);
        setLoading(false);
        console.log(user)
     }). catch(err => {
        setLoading(false);
    });
  }
   findUser();
}, []);
return {
   user,
   isLoading
   }
}