import React, { useState } from 'react';
import './AddJob.css';
import img2 from '../Assets/img2.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddJob() {
  const navigate=useNavigate()
  const[jobs, setJobs]=useState({
    companyName:'',
    logoURL : '', 
    jobPosition : '', 
    monthlySalary : '', 
    jobType : '', 
    remoteOrOffice : '', 
    location : '', 
    jobDesc : '', 
    aboutComp : '', 
    skills : [], 
    additionalInfo : ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'skills') {
      const skillsArray = value.split(',').map((skill) => skill.trim());
      setJobs({
        ...jobs,
        [name]: skillsArray,
      });
    } else {
      setJobs({
        ...jobs,
        [name]: value,
      });
    }
  };
  
  const sendJob = (event) => {
    event.preventDefault();
    axios.post('https://job-new-portal.onrender.com/create-job', jobs, {
      headers: {
        'token': localStorage.getItem('token')
      }
    })
      .then(res => {
        navigate('/success')
      })
      .catch(err => console.log(err));
  };

  const inputStyle1={
    width:'60%',
    height:'1.7rem'
  }
  const inputStyle2={
    width:'60%',
    height:'5rem'
  }
  const divStyles={
    width:'80%', display:'flex', justifyContent:'space-between'
  }
  const divStyles1={
    width:'80%', display:'flex', justifyContent:'space-between', marginBottom:'1rem'
  }

  return (
    <div className='add-container'>
      <div className='add-left-container'>
        <h1 style={{width:'100%', textAlign:'left', paddingLeft:'20%', marginTop:0}}>Add job description</h1>
        <form>
          <div style={divStyles}><label htmlFor="company-name">Company Name</label><input name='companyName' style={inputStyle1} type="text" onChange={handleChange} placeholder="Enter your company name here" /></div>
          <div style={divStyles}><label htmlFor="add-logo">Add logo URL</label><input name='logoURL' style={inputStyle1}  type="text" onChange={handleChange} placeholder="Enter the link" /></div>
          <div style={divStyles}><label htmlFor="job-position">Job position</label><input name='jobPosition' style={inputStyle1}  type="text" onChange={handleChange} placeholder="Enter job position" /></div>
          <div style={divStyles}><label htmlFor="monthlysalary">Monthly salary</label><input name='monthlySalary' style={inputStyle1}  type="text" onChange={handleChange}  placeholder="Enter Amount in rupees"/></div>
          <div style={divStyles1}>
            <label htmlFor="job-type">Job Type</label> 
            <div style={{width:"63%", textAlign:'start'}}>
              <select style={{border:'1.84px solid #C2C2C2', borderRadius:'0.2rem', height:'2rem', color:'#C2C2C2'}} name='jobType' value={jobs.jobType} onChange={handleChange} placeholder='Select'>
                <option style={{textAlign:'center', color:'#C2C2C2'}} value="">Select</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Semi-Full Time">Semi-Full Time</option>
              </select>
            </div>
            
          </div>
          <div style={divStyles1}>
            <label htmlFor="remote-office">Remote/Office</label>
            <div style={{width:"63%", textAlign:'start'}}>
              <select style={{border:'1.84px solid #C2C2C2', borderRadius:'0.2rem', height:'2rem', color:'#C2C2C2'}} name='remoteOrOffice' value={jobs.remoteOrOffice} onChange={handleChange} placeholder='Select'>
                <option style={{textAlign:'center', color:'#C2C2C2'}} value="">Select</option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
              </select>

            </div> 
            
          </div>
          <div style={divStyles}><label htmlFor="location">Location</label><input name='location' style={inputStyle1}  type="text" onChange={handleChange} placeholder="Enter Location" /></div>
          <div style={divStyles}><label htmlFor="jobDesc">Job Description</label><input name='jobDesc' style={inputStyle2}  type="text" onChange={handleChange} placeholder="Type the job description" /></div>
          <div style={divStyles}><label htmlFor="aboutComp">About Company</label><input name='aboutComp' style={inputStyle2}  type="text" onChange={handleChange} placeholder="Type about your company" /></div>
          <div style={divStyles}><label htmlFor="skills">Skills Required</label><input name='skills' style={inputStyle1}  type="text" onChange={handleChange} placeholder="Enter the must have skills" /></div>
          <div style={divStyles}><label htmlFor="additionalInfo">Addition Information</label><input name='additionalInfo' style={inputStyle1} onChange={handleChange} placeholder="Enter the additional information"  type="text" /></div>
          <div style={{width:'80%', textAlign:'end'}}>
            <button className='btn-add-page-cancel'onClick={()=>{navigate('/main-job')}}  >Cancel</button>
            <button type='submit' onClick={sendJob} className='btn-add-page-add'  >Add Job +</button>
          </div>
          
        </form>
      </div>
      <div className='add-right-container' style={{backgroundImage:`url(${img2})`, color:'white', textAlign:'center', paddingTop:'1rem'}}>
        <h1>Recruiter add job details here</h1>
      </div>
    </div>
  )
}

export default AddJob