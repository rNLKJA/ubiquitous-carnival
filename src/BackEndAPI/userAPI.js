import { useState, useEffect } from "react";

import axios from 'axios';
const BASE_URL = "http://localhost:5000";

function getProfile() {
    const endpoind = BASE_URL+'/profile/showProfile'
    return axios.get(endpoind).then(res => res.data)
}

export function useProfile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfile()
          .then(profile => {
            setProfile(profile);
            setLoading(false);
          })
          .catch(e => {
            console.log(e);
            setError(e);
            setLoading(false);
          });
      }, []);

    return {
        loading,
        profile,
        error
    }
    
}