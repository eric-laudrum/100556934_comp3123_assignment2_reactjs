import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        // Send login req
        const res = await api.post('/login', { email, password });
        alert(res.data.message || 'Login successful');

        // Save token
        localStorage.setItem('token', res.data.token || 'fake-token');

        // Navigate to the EmployeeList from login
        navigate('/employees');
        } catch (err) {
        console.error(err.response?.data || err);
        alert('Login failed: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                </div>

                <div>
                <label>Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
