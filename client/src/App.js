import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react' 
import Footer from './components/footer';
import Landing from './pages/landing';
import Navbar from './components/navBar';
import Login from './pages/login';
import Signup from './pages/signup';
import Files from './pages/files';
import SingleF from './pages/singlef';
import Voting from './pages/voting';
import VInfo from './pages/vinfo';
import Admin from './pages/admin';
import FileAdding from './pages/fileadding';
import NewCollege from './pages/newcollege';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className='routes'> 
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/files" element={<Files />}/>
            <Route exact path="/files/:id" element={<SingleF />} />
            <Route exact path="/voting" element={<Voting />} />
            <Route exact path="/vinfo" element={<VInfo />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/addfile" element={<FileAdding />} />
            <Route exact path="/newcollege" element={<NewCollege />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;