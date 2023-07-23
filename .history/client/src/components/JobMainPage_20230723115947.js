import React, { useEffect, useState } from 'react';
import './JobMainPage.css';
import img3 from '../Assets/Rectangle1.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import peopleImg from '../Assets/people.png';
import flagImg from'../Assets/flag.png';


function JobMainPage() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [skillsDet, setSkillsDet]=useState([]);
  const [position, setPosition]=useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange=(event)=>{
    const skillGroup = event.target.value;
    if (!skillsDet.includes(skillGroup)) {
      setSkillsDet([...skillsDet, skillGroup]);
    }
  }
  
  const handleSearchChange=(event)=>{
    setPosition( [event.target.value])
  }
  const handleClose=(event)=>{
    setSkillsDet([]);
  }
  const removeSkill = (skillToRemove) => {
    setSkillsDet(skillsDet.filter(skill => skill !== skillToRemove));
  }
  
  
  useEffect(() => {
    
    const skills = skillsDet;
    const jobPositions = position;
    axios.get(`http://localhost:4000/get-jobs?skills=${skills.join(',')}&jobPosition=${jobPositions.join(',')}`)
      .then(res => {
        setJobs(res.data.jobs);
        console.log(res.data)
      })
      .catch(err => console.log(err));
  }, [skillsDet, position]);

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

  const styles = {
    body: {
      margin: 0,
      padding: 0,
    },
    container: {
      width: '100%',
      padding: '0 0rem',
    },
    searchAndTags: {
      flexDirection: window.innerWidth > 768 ? 'row' : 'column',
    },
    jobCards: {
      flexDirection: window.innerWidth > 768 ? 'row' : 'column',
    },
    jobCard: {
      flexDirection: window.innerWidth > 768 ? 'row' : 'column',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    // ... add more styles as needed ...
  };

  return (
    <div style={{...styles.container, fontFamily:'DM Sans'}} className='main-page-container'>
      <div className='main-upper-container' style={{backgroundImage:`url(${img3})`, }}>
        
        <div style={{display:'flex',width:'100%', justifyContent:' space-between', alignItems:'center',}}>
        <h3 style={{marginLeft:'5rem', color:'white', fontSize:'1.5rem'}}>JobFinder</h3>
        <div style={{display:'flex', marginRight:'5rem'}}>
            {isLoggedIn ? (
              <>
                <button style={{background:'none', fontSize:'large', border:'none', fontFamily:'DM Sans', color:'white'}} onClick={handleLogout}>Logout</button>
                <span style={{color:'white', fontFamily:'DM Sans', fontSize:'large', display:'flex', alignItems:'center', marginLeft:'1rem'}}>Hello! {user}</span>
                <img src={flagImg} alt="" height={50} width={50} style={{borderRadius:'100%', marginLeft:'1rem'}} />
              </>
            ) : (
              <>
                <button className='btn-main-page-login' onClick={()=>{navigate('/login')}} type='submit'  >Login</button>
                <button type='submit'  onClick={()=>{navigate('/register')}} className='btn-main-page-register'  >Register</button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="main-lower-container">
        <div style={{width:'80%'}}>
          <div className='search-and-tags'style={{...styles.searchAndTags, boxShadow:'0 0 1rem 0rem #FF202050', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', marginTop:"2rem", marginBottom:'1rem'}}>
              <input onChange={handleSearchChange} type="text" placeholder='Type any job title' style={{paddingLeft:'3rem', height:'3rem', width:'80%', borderRadius:'0.5rem', border:'1.8px solid #E3E3E3', fontSize:'1.3rem', marginTop:'1.2rem ', marginBottom:'1.2rem'}} />
              <div style={{width:'84%', display:'flex', marginBottom:"3rem", marginTop:'1rem'}}>
                <select onChange={handleChange} style={{border:'1.84px solid #C2C2C2', borderRadius:'0.5rem', height:'2rem', color:'#C2C2C2', width:'7rem', marginRight:'1rem'}} name='remoteOrOffice'  placeholder='Select'>
                  <option style={{textAlign:'center', color:'#C2C2C2'}} value="">Skills</option>
                  <option value="Node">Node</option>
                  <option value="React">React</option>
                  <option value="CSS">CSS</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML</option>
                  <option value="Wordpress">Wordpress</option>
                  <option value="php">php</option>
                  
                  <option value="C">C</option>
                  <option value="Python">Python</option>
                </select>
                <div style={{display:'flex', flexWrap:'wrap'}}>
                  {
                    skillsDet.map((skill, key) => (
                      <span style={{marginRight:'1rem', backgroundColor:'#FFEEEE', height:'2rem', width:'6rem', fontSize:'small',display:'flex', justifyContent:'space-between', alignItems:'center', paddingLeft:'1rem', borderRadius:'0.2rem', marginBottom:'1rem'}} id={key}>
                        {skill} 
                        <button style={{height:'inherit', border:'none', backgroundColor:'#FF6B6B', width:'30%', color:'white', cursor:'pointer'}} onClick={() => removeSkill(skill)}>X</button>
                      </span>
                    ))
                    
                  }
                </div>
                <div style={{width:'31%', textAlign:'end'}}>
                  {
                    skillsDet.length > 0 && (
                      <button onClick={handleClose} style={{border:'none', background:'none',fontSize:'0.9rem', color:'#ED5353'}}>Clear</button>
                    )
                  }
                  {
                    isLoggedIn&&(
                      <button onClick={()=>{navigate('/add')}} style={{backgroundColor:'#ED5353', border:'none', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'white', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem', cursor:'pointer'}}>Add Job +</button>
                    )
                  }
                 
                </div>
                
                
              </div>
              
          </div>
          <div className="job-cards" style={styles.jobCards}>
              {
                jobs.map((job, idx)=>(
                  <div key={idx} style={{...styles.jobCard, boxShadow:'0 0 1rem 0rem #FF202030', width:'100%', display:'flex', marginBottom:'2rem',paddingTop:'2rem',paddingBottom:'2rem', alignItems:'center'}}>
                    <div style={{width:'8%', height:'100%', textAlign:'center'}}>
                      <img src={job.logoURL} alt="" height={40} />
                    </div>
                    <div style={{width:'80%', display:'flex', justifyContent:'space-between'}}>
                      <div style={{display:'flex', flexDirection:'column'}}>
                        <b>{job.jobPosition}</b>
                        <div style={{display:'flex', alignItems:'center', color:'#9C9C9C'}}>
                          <img src={peopleImg} alt="" height={15} style={{marginRight:'2rem'}}/>
                          <p style={{marginRight:'2rem'}}>11-50</p>
                          <span style={{marginRight:'2rem'}}>₹{job.monthlySalary}</span>
                          <div style={{display:'flex', alignItems:'center', marginRight:'2rem'}}>
                            <img src={flagImg} alt="" height={30} style={{marginRight:'1rem'}} />
                            <p>{job.location}</p>
                          </div>
                        </div>
                        <div style={{display:'flex', fontSize:'0.8rem', width:'8rem', justifyContent:'space-between', color:'#ED5353'}}>
                          <p style={{}}>{job.remoteOrOffice}</p>
                          <p>{job.jobType}</p>
                        </div>
                      </div>
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
                        <div style={{...styles.skillsContainer,display:'flex', marginTop:'1rem', marginBottom:'2rem'}}>
                          {
                            position!=''&&<span style={{marginRight:'1rem', backgroundColor:'#FFEEEE', height:'2rem', width:'5rem', fontSize:'small',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'0.2rem', fontWeight:'bold'}} >{position}</span>
                          }
                          {
                            job.skills.map((skill, idx)=>(
                              <span style={{marginRight:'1rem', backgroundColor:'#FFEEEE', height:'2rem', width:'5rem', fontSize:'small',display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'0.2rem', fontWeight:'bold', marginBottom:'1rem'}} key={idx}>{skill}</span>
                            ))
                          }
                        </div>
                        <div>
                          {isLoggedIn && <button style={{backgroundColor:'white', border:'2px solid #ED5353', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'#ED5353', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem', cursor:'pointer'}} onClick={() => navigate(`/edit-job/${job._id}`)}>Edit job</button>}
                          <button style={{backgroundColor:'#ED5353', border:'none', borderRadius:'0.2rem', height:'2rem', width:'8rem', color:'white', fontFamily:'DM Sans', fontSize:'medium', marginRight:'0.5rem', cursor:'pointer'}} onClick={() => navigate(`/job-det/${job._id}`)} > View Details
                          </button>
                        </div>
                        
                      </div>
                    </div>
                    
                  </div>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobMainPage