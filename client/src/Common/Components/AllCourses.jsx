import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import WorkShop from './WorkShop'

//styling
import '../Styling/WorkShop.css'

function AllCourses({flag}) {

    const [Courses, setCourses] = useState([])

    //get all courses
    useEffect(() => {
        axios.get(`/FindWorkShops`).then((response) => {
            if (response.data.status == -1) {
                alert(response.err)
                console.log(response)
                return;
            }
            setCourses(response.data)
        }).catch((error) => alert(error))

    }, [])

    return (
        <div className='WorkShopsContainer'>
            <h2 className='WorkShopsContainerTitle'>Work Shops</h2>
            <hr className='HorizontalLine'/>
            {Courses.map((course) => {
                return <WorkShop WorkShop={course} SeeFlag={flag} key={course._id} />
                // return <h1>{course.Name}</h1>

            })}
        </div>
    )
}

export default AllCourses