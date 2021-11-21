import React, {useEffect} from 'react';
import axiosInstance from '../axios/login';
import { useNavigate } from 'react-router-dom';


export default function SignOut() {
    const history = useNavigate();

    useEffect(() => {
        // const response = axiosInstance.post('#', {
        //     token: localStorage.getItem('token')
        // });
        localStorage.removeItem('token');
        axiosInstance.defaults.headers['Authorization'] = null;
        history('/login');
    });
    return <div>Logout</div>
}