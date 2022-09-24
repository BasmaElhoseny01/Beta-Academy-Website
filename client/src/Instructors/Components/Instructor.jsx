import React from 'react'
import { useState, useEffect } from 'react'
import { resolvePath, useParams } from 'react-router-dom'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

import NavBar from './NavBar'
import Home from './Home';
import AllCourses from '../../Common/Components/AllCourses';
import MyStudents from './MyStudents';
import Profile from './Profile';
import Logout from '../../Login_and_Register/Components/Logout';

import About from '../../Common/Components/About';


function Instructor() {

    const [Instructor, setInstructor] = useState({})
    const [User, setUser] = useState({})


    let { ID } = useParams()

    useEffect(() => {
        //calling API to get Instrcutor Object
        axios.get(`/FindInstructorByID/${ID}`).then((response) => {
            if (response.data.status !=200) {
                alert(response.data.Message)
                return;
            }
            setInstructor(response.data.InstructorObj[0])
            setUser(response.data.UserObj[0])
        }).catch((error) => alert(error))
    }, [])

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home Instructor={Instructor} />}></Route>
                <Route path='/AllCourses' element={<AllCourses flag={false} />}></Route>
                <Route path='/MyStudents' element={<MyStudents Instructor={Instructor} />}></Route>
                <Route path='/MyProfile' element={<Profile Instructor={Instructor} User={User} />}></Route>
                <Route path='/Logout' element={<Logout />}></Route>
                <Route path='/About' element={<About />}></Route>

            </Routes>
        </div>
    )
}

export default Instructor