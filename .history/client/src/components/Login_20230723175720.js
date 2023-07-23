import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import img1 from '../Assets/img1.png';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
 
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  
  const login = (event) => {
    event.preventDefault();
    axios.post('https://job-new-portal.onrender.com/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        navigate('/main-job')
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='login-container'>

      <div className='login-left-container'>
        <div style={{marginLeft:'4rem'}}>
          <h1 style={{}}>Already have an account?</h1>
          <p style={{fontWeight:500,  color:'#525252', marginBottom:'2rem', marginTop:0}}>Your personal job finder is here</p>
        </div>
        
        <form>
          <div style={{marginLeft:'5rem'}}>
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
          <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
      
          </div>
          <button type='submit' style={{cursor:'pointer'}} onClick={login} >Login</button>
          <span style={{marginLeft:'5rem'}}>Don’t have an account? <a href="/register">Sign Up</a></span>
        </form>
      </div>
      <div className='login-right-container' style={{backgroundImage:`url(${img1})`}}></div>
      
    </div>
  );
}

export default Login;
