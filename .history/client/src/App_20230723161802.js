import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import AddJob from './components/AddJob';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Success from './components/Success';
import JobMainPage from './components/JobMainPage';
import EditJob from './components/EditJob';
import JobDetails from './components/JobDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<JobMainPage/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/add' element={<AddJob/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/main-job' element={<JobMainPage/>}/>
          <Route path='/edit-job/:id' element={<EditJob/>}/>
          <Route path="/job-det/:id" element={<JobDetails/>}/>
          <Route path='/success' element={<Success/>}/>
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
