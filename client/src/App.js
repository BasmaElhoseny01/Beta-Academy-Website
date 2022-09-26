import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './Common/Components/Home';

import Login from './Login_and_Register/Components/Login';
import Signup from './Login_and_Register/Components/Signup';
import AllCourses from './Common/Components/AllCourses';

import Instructor from './Instructors/Components/Instructor';
import Admin from './Admins/Components/Admin';
import Student from './Students/Components/Student';
import Footer from './Common/Components/Footer';

function App() {
  useEffect(() => {
    ///
    document.title = "Beta Academy"
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>

          <Route path='/Login/*' element={<Login />}></Route>
          <Route path='/Signup/*' element={<Signup />}></Route>

          <Route path='/Instructor/:ID/*' element={<Instructor></Instructor>}></Route>
          <Route path='/Admin/:ID/*' element={<Admin />}></Route>
          <Route path='/Student/:ID/*' element={<Student />}></Route>

          <Route path='/WorkShops' element={<AllCourses />}></Route>
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
