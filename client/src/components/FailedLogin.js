import React from 'react';
import { useNavigate } from 'react-router-dom';

function FailedLogin() {
  const navigate=useNavigate();
  return (
    <div style={{display:'flex', width:'100vw', height:'50vh', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <h1>User not Signed Up. Please Register.</h1>
      <button onClick={() => navigate(`/register`)} style={{backgroundColor:'#ED5353', border:'none', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'white', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem'}}>Register</button>
    </div>
  )
}

export default FailedLogin