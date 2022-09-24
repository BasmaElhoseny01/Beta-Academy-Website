import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import AllCourses from '../../Common/Components/AllCourses';
import Enroll from './Enroll';
import Profile from './Profile';
import Home from './Home';
import Logout from '../../Login_and_Register/Components/Logout';
import UnEnroll from './UnEnroll'

import About from '../../Common/Components/About';
function Student() {
    {

        const [Student, setStudent] = useState("")
        // const [WorkShops, setWorkShops] = useState([])
        const [User, setUser] = useState({})
        let { ID } = useParams()

        useEffect(() => {
            //calling API to get Instrcutor Object
            axios.get(`/FindStudentByID/${ID}`).then((response) => {
                if (response.data.status === -1) {
                    console.log("err")
                    alert(response.data.err)
                    return;
                }
                else if (response.data.status === 404) {
                    console.log("404")
                    alert(response.data.Message)
                    return;
                }
                // console.log(response.data)
                setStudent(response.data.Studentobj[0])
                setUser(response.data.UserObj[0])
            }).catch((error) => alert(error))
        }, [])

        return (
            <div>
                <Navbar/>
                <Routes>   
                <Route path='/' element={<Home Student={Student} />}></Route>
                <Route path='/AllCourses' element={<AllCourses flag={false}/>}></Route>
                <Route path='/Enroll' element={<Enroll Student={Student}/>}></Route>
                <Route path='/MyProfile' element={<Profile Student={Student} User={User} />}></Route>
                <Route path='/Logout' element={<Logout/>}></Route>
                {/* <Route path='/*' element={<ErrorPage/>}></Route> */}
                {/* <Route path='/UnEnroll' element={<UnEnroll/>}></Route> */}
                <Route path='/About' element={<About/>}></Route>
                </Routes>


            </div>
        )
    }
}

export default Student