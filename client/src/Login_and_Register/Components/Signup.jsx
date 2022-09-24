import React from 'react'
import { useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import axios from 'axios'

//components
import NavBar from './NavBar'
import About from '../../Common/Components/About'

//styling
import '../Styling/SignUp.css'

function Signup() {
  const [NewStudent, setNewStudent] = useState({})
  useEffect(() => { setNewStudent({ Name: "", Mobile: "", Email: "", University: "", Faculty: "", Department: "", Academic_Year: "", User_Name: "", Password: "" }) }, [])
  const SignUp = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();

    if (NewStudent.Name === "") {
      alert("Please Fill Name fields")
      return
    }
    else if (NewStudent.Mobile === "") {
      alert("Please Fill Mobile fields")
      return
    }
    else if (NewStudent.Email === "") {
      alert("Please Fill Email fields")
      return
    }
    else if (NewStudent.University === "") {
      alert("Please Fill University fields")
      return
    }
    else if (NewStudent.Faculty === "") {
      alert("Please Fill Faculty fields")
      return
    }
    else if (NewStudent.Department === "") {
      alert("Please Fill DEpART fields")
      return
    }
    else if (NewStudent.Academic_Year === "") {
      alert("Please Fill ACYEAR fields")
      return
    }
    else if (NewStudent.User_Name === "") {
      alert("Please Fill User_Name fields")
      return
    }
    else if (NewStudent.Password === "") {
      alert("Please Fill Password fields")
      return
    }
    axios.post("/AddStudent", { Name: NewStudent.Name, Mobile: NewStudent.Mobile, Email: NewStudent.Email, University: NewStudent.University, Faculty: NewStudent.Faculty, Department: NewStudent.Department, Academic_Year: NewStudent.Academic_Year, User_Name: NewStudent.User_Name, Password: NewStudent.Password }).then((response) => {


      if (response.data.status === 200) {
        alert(response.data.Message)

        window.location.href = `/Student/${response.data.Student}`
      }
      //error
      else {
        alert(response.data.Message)
      }

    }).catch((error)=>alert(error))
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <div className='SugnupConatiner'>
            <div className='welcomeToBeta'>Welcome To Beta 👋</div>

            <form onSubmit={SignUp}>

              <h2 className='studentContainerTitle'>Student</h2>
              <hr className='HorizontalLine' />

              {/* Name */}
              <div className='RowProfileAdmin'>
                <h4>Name</h4>
                <input
                  type="text"
                  placeholder="Ali Elsayed Example"
                  onChange={event => {
                    NewStudent.Name = event.target.value

                  }}
                />

              </div>

              {/* Mobile */}
              <div className='RowProfileAdmin'>
                <h4>Mobile</h4>
                <input
                  type="tel"
                  placeholder="01158416485"
                  pattern="[0-9]{11}"
                  onChange={event => {
                    NewStudent.Mobile = event.target.value.trim()
                  }}

                />
              </div>

              {/* Email */}
              <div className='RowProfileAdmin'
              >
                <h4>Email</h4>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  onChange={event => {
                    NewStudent.Email = event.target.value.trim()
                  }}

                />
              </div>


              {/* Study */}
              <div className='RowProfileAdmin'>
                <h4>University</h4>
                <input
                  type="text"
                  placeholder="Cairo University"
                  onChange={event => {
                    NewStudent.University = event.target.value.trim()
                  }}

                />
              </div>


              <div className='RowProfileAdmin'>
                <h4>Faculty</h4>
                <input
                  type="text"
                  placeholder="Faculty of Engineering"
                  onChange={event => {
                    NewStudent.Faculty = event.target.value.trim()
                  }}
                  min={0}
                />
              </div>

              <div className='RowProfileAdmin'>
                <h4>Department</h4>
                <input
                  type="text"
                  placeholder="Computer Department"
                  onChange={event => {
                    NewStudent.Department = event.target.value.trim()
                  }}
                  min={0}
                />
              </div>

              <div className='RowProfileAdmin'>
                <h4>Academic_Year</h4>
                <input
                  type="text"
                  placeholder="Second Year"
                  onChange={event => {
                    NewStudent.Academic_Year = event.target.value.trim()
                  }}
                  min={0}
                />
              </div>

              {/* User Name */}
              <div className='RowProfileAdmin'>
                <h4> User_Name</h4>
                <input
                  type="text"
                  placeholder="Ali_Gamal03"
                  onChange={event => {
                    NewStudent.User_Name = event.target.value.trim()
                  }}
                />
              </div>

              <div className='RowProfileAdmin'>
                <h4> Password</h4>
                <input
                  type="password"
                  placeholder="prefer numbers and letters"
                  onChange={event => {
                    NewStudent.Password = event.target.value.trim()
                  }}
                />
              </div>

              <div className="ProfileButtonsAdmin">
                <button type='submit'>Add Student</button>
              </div>
            </form>
          </div>} />
        <Route path="/About" element={<About/>} />
      </Routes>
    </div>
  )
}

export default Signup