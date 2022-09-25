import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import AllInstructors from './AllInstructors'
import AllStudents from '../../Common/Components/AllStudents';
import AllCourses from '../../Common/Components/AllCourses';
import Edit from './Edit';
import Logout from '../../Login_and_Register/Components/Logout';
import About from '../../Common/Components/About';
function Admin() {

    const [User, setUser] = useState({})
    let { ID } = useParams()

    useEffect(() => {
        //calling API to get Admin Object
        axios.get(`/FindUserByID/${ID}`).then((response) => {
            if (response.data.status != 200)
                alert(response.data.Message);
            else
                setUser(response.data.UserObj[0])

        }).catch((error) => alert(error))
    }, [])



    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home User={User} />}></Route>
                <Route path='/AllInstructors' element={<AllInstructors />}></Route>
                <Route path='/AllStudents' element={<AllStudents />}></Route>
                <Route path='/AllCourses' element={<AllCourses flag={true} />}></Route>
                <Route path='/Edit' element={<Edit User={User} />}></Route>
                <Route path='/Logout' element={<Logout />}></Route>
                <Route path='/About' element={<About />}></Route>
            </Routes>
        </div>
    )
}

export default Admin