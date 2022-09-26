import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

//styling
import '../Styling/WorkShop.css'


function WorkShop({ WorkShopID, SeeFlag, WorkShop }) {

    const [workShop, setWorkShop] = useState({})
    const [instructor, setInstructor] = useState({})

    const [Status, setStatus] = useState("")

    useEffect(() => {
        // calling API to get WorkShop Object
        if (WorkShop) {
            setWorkShop(WorkShop)
            if (WorkShop.Status == "Past")
                setStatus("⚫ Past")
            else if (WorkShop.Status == "Available")
                setStatus("🟢  Available")

            else if (WorkShop.Status == "Full")
                setStatus("🔴 Full")


            if (WorkShop.Instructor_ID === "-1") {
                setInstructor({ Name: "No instructor" })
                return;
            }
            //get instructor
            //calling API to get Instrcutor Object
            axios.get(`/FindInstructorByID/${WorkShop.Instructor_ID}`).then((response) => {
                // console.log(response)
                if (response.data.status === -1) {
                    alert(response.err)
                    return;
                }
                else if (response.data.status === 404) {
                    alert(response.Message)
                    return;
                }
                setInstructor(response.data.InstructorObj[0])
            }).catch((error) => alert(error))

        }
        else { //get workshop
            axios.get(`/FindWorkShopByID/${WorkShopID}`).then((response) => {
                if (response.data.status !== 200) {
                
                    alert(response.data.Message)
                    return;
                }
                

                setWorkShop(response.data.WorkShopObj[0])
                setInstructor(response.data.InstructorObj)
                // console.log(response.data.InstructorObj)
              {/* Available */}

                if (response.data.WorkShopObj[0].Status == "Past")
                    setStatus("⚫ Past")
                else if (response.data.WorkShopObj[0].Status == "Available")
                    setStatus("🟢  Available")

                else if (response.data.WorkShopObj[0].Status == "Full")
                    setStatus("🔴 Full")

            }).catch((error) => alert(error))
        }
    }, [])

    return (
        <div className='WorkShop'>
                    <div className='WorkShopTop'>
                <div className='WorkShopTitle'><h2>{workShop.Name}</h2>
                    <h4 className='WorkShopfield'>{workShop.Field}</h4></div>
                <h4>{Status}</h4>
            </div>


            {workShop.StartDate ? <p>Starts at 📅: {workShop.StartDate.split("T")[0]}</p> : <p>NULL</p>}
            <p>⌛: {workShop.Duration} weeks</p>

            <p>{workShop.SessionsPerWeek} Sessions/week</p>
            <p>Session Time⏱️: {workShop.SessionTime} hours</p>

            <p>🗺️: {workShop.Location}</p>
            <p>👨‍🏫:{instructor.Name}</p>

            <p>💰:{workShop.Price} LE/Session</p>
            <p>Capacity: {workShop.MaxCapacity} Students</p>

            {SeeFlag ? <p>Total No of enrolled Students: {workShop.EnrolledStudents ? workShop.EnrolledStudents.length : null}</p> : <p></p>}
        </div>
    )
}

export default WorkShop