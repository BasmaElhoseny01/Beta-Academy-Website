import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import StudentCard from '../../Admins/Components/StudentCard'
function AllStudents() {
  const [Students, setStudents] = useState([])

  useEffect(() => {
      axios.get(`/FindStudents`).then((response) => {
          if (response.data.status == -1) {
              alert(response.data.Message)
              return
          }
          setStudents(response.data)
          console.log(response.data)
      }).catch((error) => alert(error))

  }, [])

  return (
      <div className='WorkShopsContainer'>
          <h2 className='WorkShopsContainerTitle'>Students</h2>
          <hr className='HorizontalLine' />
          {Students ? (Students.map((student) => {
              return <StudentCard Student={student} key={student._id} />
          })) : <p>Loading Students....</p>}
      </div >
  )
}

export default AllStudents