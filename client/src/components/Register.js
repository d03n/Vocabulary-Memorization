import React, { useState } from 'react';

import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:3070/api/users/register', { username, email, password });
            localStorage.setItem('token', data.token); // Save token to local storage
            console.log(data);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type='name' placeholder='Name' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export {Register};