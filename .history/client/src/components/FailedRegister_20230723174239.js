import React from 'react';
import { useNavigate } from 'react-router-dom';

function FailedRegister() {
  const navigate=useNavigate();
  return (
    <div style={{display:'flex', width:'100vw', height:'50vh', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <h1>User already Registered. Please Sign in.</h1>
      <button onClick={() => navigate(`/main-job`)} style={{backgroundColor:'#ED5353', border:'none', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'white', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem'}}>Login</button>
    </div>
  )
}

export default FailedRegister