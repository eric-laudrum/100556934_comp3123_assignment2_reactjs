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
  

        // Verify password
        if(password !== confirmPassword){
            return alert("Error: Sign in failed");
        }

        try{
            const res = await api.post('/signup', {email, password});

            alert(res.data.message);
            navigate('/login');
        } catch(e){

            // Add additonal checks for debugging
            if(e.response){
                console.error('Error response: ' , e.response?.data || e);
                alert("Error: Sign up failed - " + e)

            }
            else if(e.request){
                console.error('Error request: ', e.response?.data || e);
                alert("Error: Failed to connect to server - " + e)
            }
            else{
                console.error('Error: ', e.response?.data || e);
                alert("Error: " + e)
            }
            
        }
    };

    return(

        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Email: </label>
                    <input
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type='password'
                        value={password}
                        onChange = {e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Confirm Password: </label>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required />
                </div>

                <button type='submit'>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;