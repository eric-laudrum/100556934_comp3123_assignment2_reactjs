import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';


function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
  

    if(password !== password){
        return alert("Error: Sign in failed");
    }

    try{
        const res = await api.post('/signup', {email, password});

        alert(res.data.message);
        navigate('/login');
    } catch(e){
        console.error(e.response?.data || e);
        alert("Error: Sign up failed - " + e)
    };
};}