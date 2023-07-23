import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import img1 from '../Assets/img1.png';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [ischecked, setChecked]=useState(false);
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const navigate=useNavigate();
  const buttonStyle = {
    backgroundColor: ischecked ? '#ED5353' : '#999999', 
    transition: 'background-color 0.3s ease',
  };

  const setCheckedValue=(event)=>{
    setChecked(event.target.checked);
  }

  const register = (event) => {
    event.preventDefault();
    axios.post('https://job-new-portal.onrender.com/register', user)
      .then(res => {
        localStorage.setItem('token', res.data.jwtToken);
        localStorage.setItem('user', res.data.name);
        const tokenData=localStorage.getItem('token')
        if(tokenData!=='undefined') {
          navigate('/main-job')
        }
        else{
          navigate('/failed-signup')
        }
        
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="reg-container">
      <div className='reg-left-container'>
        <div style={{marginLeft:'4rem'}}>
          <h1 style={{}}>Create an Account</h1>
          <p style={{fontWeight:500,  color:'#525252', marginBottom:'2rem', marginTop:0}}>Your personal job finder is here</p>
        </div>
        
        <form>
          <div style={{marginLeft:'5rem'}}>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name"/>
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="mobile" value={user.mobile} onChange={handleChange} placeholder="Mobile" />
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
          </div>
          <div style={{marginLeft:'5rem', marginBottom:'2rem'}}>
           <input type="checkbox" name="check" id="check" onChange={setCheckedValue} required /><label htmlFor="check" >By creating an account, I agree to our terms of use and privacy policy</label>
          </div>
          

          <button type="submit" style={{...buttonStyle, '@media (maxWidth: 768px)': {fontSize:'small', 
          }, cursor:'pointer'}} onClick={register} disabled={!ischecked}>Create Account</button>

          <span style={{marginLeft:'5rem'}}>Already have an account? <button style={{background:'none', color:'black', fontSize:'medium', marginLeft:0, padding:0, width:'5rem', cursor:'pointer'}} onClick={()=>{navigate('/login')}}>Sign In</button></span>
        </form>
      </div>
      <div className='reg-right-container' style={{backgroundImage:`url(${img1})`}}></div>
    </div>
    
  );
}

export default Register;
