import React from 'react'
import { useState, useEffect } from 'react'

import WorkShopInTable from './WorkShopInTable'
//styling 
import '../Styling/InstructorCard.css'
function InstructorCard({ instructor }) {


  const [Instructor, setInstructor] = useState({})

  useEffect(() => {
    if (instructor) {
      setInstructor(instructor)
    }
  },[])
  
  return (
    <div className='InstructorCard'>
      <h2>{Instructor.Name}</h2>
      <div className='InstructorCardBody'>
        <p>📱: {Instructor.Mobile}</p>
        <p>📧: {Instructor.Email}</p>
        <p>📚: {Instructor.Study}</p>
        <p>💰: {Instructor.Salary} LE</p>
      </div>
      <h3>WorkShops 💼</h3>




      {Instructor.WorkShops ?
        <table>
          <tbody>
            <tr className='TableHeader'>
              <th>WorkShop</th>
              <th>Field</th>
              <th>Status</th>
              <th>Start Date 📅</th>
              <th>Duration ⌛ (weeks)</th>
              <th>Sessions/week</th>
              <th>Time⏱️ (hours)</th>
              <th>Location 🗺️</th>
              <th>Price 💰 (LE/Session)</th>
              <th>Max Cpacity</th>
              <th>No. Students 🧑‍🎓</th>
            </tr>
          </tbody>


          {
            Object.values(Instructor.WorkShops).map((value) => {
              return <WorkShopInTable WorkShopID={value} key={value} />
            })
          }

        </table>
        : <h1>loading.....</h1>}
    </div>
  )
}

export default InstructorCard