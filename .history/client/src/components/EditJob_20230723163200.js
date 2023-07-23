import React, { useEffect, useState } from 'react';
import './EditJob.css';
import img2 from '../Assets/img2.png';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditJob({jobId}) {
  const [newJobDet, setNewJobDet]=useState([])
  const {id}=useParams()
  const navigate=useNavigate();

  const [jobs, setJobs] = useState({
    companyName: '' ,
    logoURL: '' ,
    jobPosition:  '',
    monthlySalary: '',
    jobType:  '',
    remoteOrOffice: '',
    location:  '',
    jobDesc: '',
    aboutComp: '' ,
    skills:[] ,
    additionalInfo: '',
  });
  useEffect(() => {
    axios.get(`http://localhost:4000/get-jobs-desc/${id}`) 
      .then(res => {
        setNewJobDet(res.data.job);
        console.log(res.data);
        setJobs({
          companyName: res.data.job.companyName,
          logoURL: res.data.job.logoURL,
          jobPosition: res.data.job.jobPosition,
          monthlySalary: res.data.job.monthlySalary,
          jobType: res.data.job.jobType,
          remoteOrOffice: res.data.job.remoteOrOffice,
          location: res.data.job.location,
          jobDesc: res.data.job.jobDesc,
          aboutComp: res.data.job.aboutComp,
          skills: res.data.job.skills,
          additionalInfo: res.data.job.additionalInfo,
        });
      })
      .catch(err => console.log(err));
  }, [id]);
  
  

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
  
  const handleEditJob = (event) => {
    event.preventDefault();
    axios
      .patch(`https://job-new-portal.onrender.com/edit-job/${id}`, jobs)
      .then(() => {
        navigate('/success')
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className='edit-container'>
      <div className='edit-left-container'>
        <h1 style={{width:'100%', textAlign:'left', paddingLeft:'20%', marginTop:0}}>Add job description</h1>
        <form>
          <div style={divStyles}><label htmlFor="company-name">Company Name</label><input name='companyName' style={inputStyle1} type="text" onChange={handleChange} value={jobs.companyName} placeholder="Enter your company name here" /></div>
          <div style={divStyles}><label htmlFor="add-logo">Add logo URL</label><input name='logoURL' style={inputStyle1} value={jobs.logoURL}  type="text" onChange={handleChange} placeholder="Enter the link" /></div>
          <div style={divStyles}><label htmlFor="job-position">Job position</label><input name='jobPosition' style={inputStyle1} value={jobs.jobPosition} type="text" onChange={handleChange} placeholder="Enter job position" /></div>
          <div style={divStyles}><label htmlFor="monthlysalary">Monthly salary</label><input name='monthlySalary' style={inputStyle1} value={jobs.monthlySalary} type="text" onChange={handleChange}  placeholder="Enter Amount in rupees"/></div>
          <div style={divStyles1}>
            <label htmlFor="job-type">Job Type</label> 
            <div style={{width:"63%", textAlign:'start'}}>
              <select style={{border:'1.84px solid #C2C2C2', borderRadius:'0.2rem', height:'2rem', color:'#C2C2C2'}} name='jobType' value={jobs.jobType} onChange={handleChange} placeholder='Select'>
                <option style={{textAlign:'center', color:'#C2C2C2'}} value="">Select</option>
                <option value="Full time">Full Time</option>
                <option value="Part time">Part Time</option>
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
          <div style={divStyles}><label htmlFor="location">Location</label><input name='location' style={inputStyle1}  type="text" value={jobs.location} onChange={handleChange} placeholder="Enter Location" /></div>
          <div style={divStyles}><label htmlFor="jobDesc">Job Description</label><input name='jobDesc' style={inputStyle2}  type="text" value={jobs.jobDesc} onChange={handleChange} placeholder="Type the job description" /></div>
          <div style={divStyles}><label htmlFor="aboutComp">About Company</label><input name='aboutComp' style={inputStyle2} value={jobs.aboutComp}  type="text" onChange={handleChange} placeholder="Type about your company" /></div>
          <div style={divStyles}><label htmlFor="skills">Skills Required</label><input name='skills' style={inputStyle1}  type="text" onChange={handleChange} value={jobs.skills} placeholder="Enter the must have skills" /></div>
          <div style={divStyles}><label htmlFor="additionalInfo">Addition Information</label><input name='additionalInfo' style={inputStyle1} onChange={handleChange} value={jobs.additionalInfo} placeholder="Enter the additional information"  type="text" /></div>
          <div style={{width:'80%', textAlign:'end'}}>
            <button className='btn-edit-page-cancel'onClick={()=>{navigate('/main-job')}}  >Cancel</button>
            <button type='submit' onClick={handleEditJob} className='btn-edit-page-edit'  >Edit Job</button>
          </div>
          
        </form>
      </div>
      <div className='edit-right-container' style={{backgroundImage:`url(${img2})`, color:'white', textAlign:'center', paddingTop:'1rem'}}>
        <h1>Recruiter add job details here</h1>
      </div>
    </div>
  )
}

export default EditJob