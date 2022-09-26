import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function WorkShopInTable({ WorkShopID, InstructorName }) {

    const [workShop, setWorkShop] = useState({})
    const [Status, setStatus] = useState("")

    useEffect(() => {
        axios.get(`/FindWorkShopByID/${WorkShopID}`).then((response) => {
            if (response.data.status != 200) {
                alert(response.data.Message)
                return;
            }
            setWorkShop(response.data.WorkShopObj[0])
  {/* Available */}
            if (response.data.WorkShopObj[0].Status === "Past")
                setStatus("⚫")
            else if (response.data.WorkShopObj[0].Status === "Available")
                setStatus("🟢")

            else if (response.data.WorkShopObj[0].Status === "Full")
                setStatus("🔴")

        }).catch((error)=>alert(error))
    }, [])


    return (<tbody>
        {workShop ?
            <tr>
                <td>{workShop.Name}</td>
                <td>{workShop.Field}</td>
                <td>{Status}</td>
                <td>{workShop.StartDate?workShop.StartDate.split("T")[0]: <p>NULL</p>}</td>
                <td>{workShop.Duration}</td>
                <td>{workShop.SessionsPerWeek}</td>
                <td>{workShop.SessionTime}</td>
                <td>{workShop.Location}</td>
                <td>{workShop.Price}</td>
                <td>{workShop.MaxCapacity}</td>
                <td>{workShop.EnrolledStudents ?
                    (Object.keys(workShop.EnrolledStudents) ? Object.keys(workShop.EnrolledStudents).length : null)
                    : null}</td>
            </tr>

            : <p>Loading..........</p>
        }
    </tbody>
    )
}

export default WorkShopInTable