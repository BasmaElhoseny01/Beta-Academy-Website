import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'

import StudentCard from '../../Admins/Components/StudentCard'

//styling
import '../Styling/MyStudents.css'

function MyStudents({ Instructor }) {

    const [Students, SetStudents] = useState([])

    useEffect(() => {
        if (Instructor._id) {

            axios.get(`/MyStudents/${Instructor._id}`).then((response) => {
                if (response.data.status != 200) {
                    alert(response.data.Message)
                    return;
                }
                else {
                    SetStudents(response.data.MyStudents)
                }
            }).catch((error) => alert(error))
        }
        else {
            window.location.href = './';
        }
    }, [])

    return (
        <div className='MyStudentsContainer'>
            <h2 className='MyStudentsContainerTitle'>My Students 👨🏼‍🎓</h2>
            <hr className='HorizontalLine' />

            {Students ? Students.map((student) => {
                return <StudentCard Student={student} key={student._id} />
                // return <h1 key={student._id}>{student.Name}</h1>//waiting for Zeianb Student Component
            }) : <p>Loading Students.....</p>}
        </div>
    )
}

export default MyStudents