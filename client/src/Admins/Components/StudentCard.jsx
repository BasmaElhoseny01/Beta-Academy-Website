import React from 'react'
import { useState, useEffect } from 'react'

import WorkShopInTable from './WorkShopInTable'
//styling 
import '../Styling/InstructorCard.css'
function StudentCard({ Student }) {


  const [Student_eff, setStudent] = useState({})

  useEffect(() => {
    if (Student) {
      setStudent(Student)
    }
  },[])
  
  return (
    <div className='InstructorCard'>
    <h2>{Student_eff.Name}</h2>
    <div className='InstructorCardBody'>
      <p>📱: {Student_eff.Mobile}</p>
      <p>📧: {Student_eff.Email}</p>
      <p>🏫: {Student_eff.University}, {Student_eff.Faculty}</p>
      <p>📚: {Student_eff.Department}</p>
      <p>Academic Year: {Student_eff.Academic_Year}</p>
      </div>
      <h3>WorkShops 💼</h3>




      {Student_eff.WorkShops ?
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
            Object.values(Student_eff.WorkShops).map((value) => {
              return <WorkShopInTable WorkShopID={value} key={value} />
            })
          }

        </table>
        : <h1>loading.....</h1>}


    </div>
  )
}

export default StudentCard