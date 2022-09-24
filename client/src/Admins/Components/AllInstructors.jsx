import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import InstructorCard from './InstructorCard'

function AllInstructors() {
    const [Instructors, setInstructors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/FindInstructors`).then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
                return
            }
            setInstructors(response.data)
            console.log(response.data)
        })

    }, [])

    return (
        <div className='WorkShopsContainer'>
            <h2 className='WorkShopsContainerTitle'>Instructors</h2>
            <hr className='HorizontalLine' />
            {Instructors ? (Instructors.map((instructor) => {
                return <InstructorCard instructor={instructor} key={instructor._id} />
            })) : <p>Loading Instructors....</p>}
        </div >
    )
}

export default AllInstructors