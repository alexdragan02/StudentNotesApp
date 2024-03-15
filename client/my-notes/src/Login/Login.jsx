import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './finaltoolbar.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const fetchLogin = async (e) => {
        e.preventDefault();
    
        if (!email.endsWith('@stud.ase.ro')) {
            setError('Te rog să folosești un cont instituțional.');
            return;
        }
    
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        };
    
        try {
            const result = await fetch(`http://localhost:9000/auth/login`, options);
            if (!result.ok) {
                throw new Error('Parola sau email-ul sunt greșite.');
            }
            const response = await result.json();
            console.log(response.user);
            if (response.success) {
                localStorage.setItem('userId', response.user.id);
                localStorage.setItem('email', response.user.email);

                localStorage.setItem('isAuthenticated', 'true');
              const emailParts = email.split('@'); 
              const username = emailParts[0]; 
               localStorage.setItem('username', username); 
                  navigate('/');
            } else {
                setError(response.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError(`An error occurred while trying to log in: ${err.message}`);
        }
    };



    return (
        <div>
              
            <div className="toolbar">
                <Link to="/">Acasă</Link>
                <Link to="/add">Adaugă</Link>

                <div className="dropdown">
                    <select id="filter-options">
                        <option value="">Filtrează</option>
                        <option value="title">După Titlu</option>
                        <option value="description">După Descriere</option>
                    </select>
                </div>

                <div className="dropdown">
                    <select id="sort-options">
                        <option value="">Sortează</option>
                        <option value="newest">Cele mai noi</option>
                        <option value="longest">Cele mai lungi</option>
                    </select>
                </div>

                <div className="login-shortcut">
                    <Link to="/login">Logare</Link>
                </div>
            </div>
            <div className="login-container">
                <form className="login-form" onSubmit={fetchLogin}>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="password">Parola:</label>
                    <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Login;