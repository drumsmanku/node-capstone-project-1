import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';
import back from '../Assets/backnew.png'
import { useNavigate } from 'react-router-dom';
import profile from '../Assets/profilepic.webp';
import money from '../Assets/money.png';
import duration from '../Assets/duration.png';

function JobDetails() {
  const { id } = useParams(); 
  const [jobDets, setJobDets]=useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const randomMonths = Math.floor(Math.random() * 12) + 1;

  useEffect(() => {
    axios.get(`https://job-new-portal.onrender.com/get-jobs-desc/${id}`) 
      .then(res => {
        setJobDets(res.data.job);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const navigate=useNavigate();
  
  return (
    <div>
      <div className='details-container'>
        <div className='details-upper-container' style={{backgroundImage:`url(${back})`, }}>
          
          <div style={{display:'flex',width:'100%', justifyContent:' space-between', alignItems:'center'}}>
          <h3 style={{marginLeft:'5rem', color:'white', fontSize:'1.5rem'}}>JobFinder</h3>
          <div style={{display:'flex', marginRight:'5rem'}}>
              {isLoggedIn ? (
                <>
                  <button style={{background:'none', fontSize:'large', border:'none', fontFamily:'DM Sans', color:'white',zIndex:999}} onClick={handleLogout}>Logout</button>
                  <span style={{color:'white', fontFamily:'DM Sans', fontSize:'large', display:'flex', alignItems:'center', marginLeft:'1rem'}}>Hello! {user}</span>
                  <img src={profile} alt="" height={50} width={50} style={{borderRadius:'100%', marginLeft:'1rem'}} />
                </>
              ) : (
                <>
                  <button className='btn-details-page-login' onClick={()=>{navigate('/login')}} type='submit'  >Login</button>
                  <button type='submit'  onClick={()=>{navigate('/register')}} className='btn-details-page-register'  >Register</button>
                </>
              )}
            </div>
          </div>
        </div>
      <div className='details-lower-container'>
        <div style={{width:'80%', position:'relative', top:'7rem'}}>
          <div style={{backgroundColor:'white',color:'black', paddingTop:'2rem',textAlign:'center',  height:'20%', marginBottom:'3rem', boxShadow:'0 0 1rem 0rem #0000001A'}} >
            <h1 style={{width:'90%', margin:0}}>{jobDets.jobPosition} {jobDets.remoteOrOffice} job/internship at {jobDets.companyName}</h1>
          </div>
          <div style={{backgroundColor:'white', boxShadow:'0 0 1rem 0rem #0000001A',display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'2.5rem' }}>
            <div style={{display:'flex', width:'90%',color:'#999999'}}>
                <span style={{marginRight:'0.7rem'}}>1w ago</span>.
                <span style={{marginLeft:'0.7rem'}}>{jobDets.jobType}</span>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:'90%', alignItems:'center',}}>
                <h1>{jobDets.jobPosition}</h1>
                {
                    isLoggedIn&&(
                      <button onClick={() => navigate(`/edit-job/${jobDets._id}`)} style={{backgroundColor:'#ED5353', border:'none', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'white', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem'}}>Edit Job</button>
                    )
                  }
            </div>
            <div style={{display:'flex', color:'#ED5353', width:'90%'}}>
                <span>{jobDets.location} | India</span>
            </div>
            <div style={{display:'flex', width:'90%', marginTop:'3rem' ,marginBottom:'3rem'}}>
                <div style={{display:'flex', flexDirection:'column', height:"4rem", justifyContent:'space-between', marginRight:'5rem'}}>
                  <div style={{display:'flex', alignItems:"center", color:'#999999'}}>
                    <img src={money} alt="" style={{marginRight:'0.8rem'}} />
                    <span>Stipend</span>
                  </div>
                  <span>₹ {jobDets.monthlySalary}/month</span>
                </div>
                <div style={{display:'flex', flexDirection:'column', height:"4rem", justifyContent:'space-between'}}>
                  <div style={{display:'flex', alignItems:"center", color:'#999999'}}>
                    <img src={duration} alt="" style={{marginRight:'0.8rem'}} />
                    <span>Duration</span>
                  </div>
                  <span>{randomMonths} Months</span>
                </div>
                
                
            </div>
            <div style={{width:'90%'}}>
              <h3 style={{marginBottom:0}} ><b>About company</b></h3><br />
              <p style={{width:'80%', color:'#999999', marginTop:'0rem'}}>{jobDets.aboutComp}</p>
              
            </div>
            <div style={{width:'90%'}}>
              <h3 style={{marginBottom:0}} ><b>About the job/internship</b></h3><br />
              <div style={{width:'80%', color:'#999999',  marginTop:'0rem', wordWrap: 'break-word'}} 
                dangerouslySetInnerHTML={{ __html: jobDets.jobDesc }}>
              </div>


            </div>

            <div style={{width:'90%'}}>
              <h3 style={{marginBottom:0}} ><b>Skills Required</b></h3><br />
              <div style={{display:'flex'}}>
                {
                  jobDets.skills && jobDets.skills.map((skill, idx)=>(
                    <span key={idx}style={{height:'1.7rem', display:'flex', justifyContent:'center', alignItems:'center', fontSize:'small', marginRight:"1rem", backgroundColor:'#FFEEEE', width:'6rem', borderRadius:'2rem'}}>{skill}</span>
                  ))
                }
              </div>
              
              
              
            </div>
            <div style={{width:'90%'}}>
              <h3 style={{marginBottom:0}} ><b>Additional Information</b></h3><br />
              <p style={{width:'80%', color:'#999999', marginTop:'0rem'}}>{jobDets.additionalInfo}</p>
              
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
  )
}

export default JobDetails