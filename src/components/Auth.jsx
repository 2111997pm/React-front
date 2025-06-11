import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const toggle = () => setIsLogin(!isLogin);

    const handleSubmit = async () => {
        try {
            const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const payload = isLogin ? { email, password } : { name, email, password };
            const res = await axios.post(`http://localhost:4000${url}`, payload);

            if (isLogin) {
                localStorage.setItem('token', res.data.token);
                navigate('/');
            } else {
                alert('Registered successfully! You can login now.');
                setIsLogin(true);
            }
        } catch (err) {
            alert(err.response?.data || 'Authentication failed');
        }
    };

    return (
        <div className='auth-box'>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            {!isLogin && <input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />}
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Signup'}</button>
            <p onClick={toggle} className='switch-auth'>
                {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
            </p>
        </div>
    );
}