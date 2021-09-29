import { useState, useEffect } from "react";

import axios from 'axios';
const BASE_URL = "https://crm4399.herokuapp.com";

function loginUser(user){
    const {userName, password} = user;

    if (!userName || !password){
        alert("must provide an email and a password")
        return;
    }

    const endpoint = BASE_URL + '/user/login'

    let data = await axios(endpoint, {userName:userName, password:password}).then(res => res.data)

}