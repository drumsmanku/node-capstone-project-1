import React from 'react'
import img3 from '../Assets/Rectangle1.png';
import './ViewDetailsWithoutLogin.css'
import { useNavigate } from 'react-router-dom';

function ViewDetailsWithoutLogin() {

  const navigate=useNavigate()
  return (
    <div className='view-container'>
      <div className='view-upper-container' style={{backgroundImage:`url(${img3})`}}>
        
        <div style={{display:'flex',width:'100%', justifyContent:' space-between', alignItems:'center'}}>
        <h3 style={{marginLeft:'5rem'}}>JobFinder</h3>
          <div style={{display:'flex', marginRight:'5rem'}}>
            <button className='btn-view-page-login' onClick={()=>{navigate('/')}} type='submit'  >Login</button>
            <button type='submit' onClick={()=>{navigate('/register')}} className='btn-view-page-register'  >Register</button>
          </div>
        </div>
      </div>
      <div className='view-lower-container'>
        <div style={{width:'80%', position:'relative', top:'5rem'}}>
          <div style={{backgroundColor:'white',color:'black', paddingTop:'2rem',textAlign:'center',  height:'20%', marginBottom:'3rem', boxShadow:'0 0 1rem 0rem gray'}} >
            <h1 style={{width:'90%', margin:0}}>WordPress Development work from home job/internship at Adyaka Infosec Private Limited</h1>
          </div>
          <div style={{backgroundColor:'white', height:'100%', boxShadow:'0 0 1rem 0rem gray' }}></div>
        </div>
      </div>
   </div>
  )
}

export default ViewDetailsWithoutLogin