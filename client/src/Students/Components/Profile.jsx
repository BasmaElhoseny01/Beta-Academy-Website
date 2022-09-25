import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

//styling
import '../Styling/Profile.css'

function Profile({ Student, User }) {

  const [NewStudent, setNewStudent] = useState({})
  const [NewUser, setNewUser] = useState({})

  const [Edit, setEdit] = useState(false)

  useEffect(() => {
    setNewStudent({ _id: Student._id })
    setNewUser({ _id: User._id })
  }, [])


  const saveChanges = event => {
    // 👇️ prevent page refresh
    event.preventDefault();

    axios.put(`/UpdateStudent`, { Student: NewStudent, User: NewUser }).then((response) => {
      alert(response.data.Message)

      console.log('form submitted ✅');
      console.log(NewStudent)

      window.location.href = './';
    }).catch((error) => alert(error))
  };

  return (
    <div className='Profile'>{Edit == false ?
      <div>
        <div className='RowProfile'>
          <h4>Name</h4>
          <p className='InfoShowProfile'>{Student.Name}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Mobile</h4>
          <p className='InfoShowProfile'>{Student.Mobile}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Email</h4>
          <p className='InfoShowProfile'>{Student.Email}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>University</h4>
          <p className='InfoShowProfile'>{Student.University}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Faculty</h4>
          <p className='InfoShowProfile'>{Student.Faculty}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Department</h4>
          <p className='InfoShowProfile'>{Student.Department}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Academic_Year</h4>
          <p className='InfoShowProfile'>{Student.Academic_Year}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>User Name</h4>
          <p className='InfoShowProfile'>{User.User_Name}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Password</h4>
          <p className='InfoShowProfile'>{User.Password ? "●".repeat(4) : ""}</p>
        </div>

        <div className="ProfileButtons">
          <button onClick={() => { setEdit(true) }}>Edit</button>
        </div>

      </div>
      :
      <form onSubmit={saveChanges}>
        {/* Name */}
        <div className='RowProfile'>
          <h4>Name</h4>
          <input
            type="text"
            placeholder={Student.Name}
            onChange={event => {
              const x = event.target.value.trim();
              let dumm
              NewStudent.Name = x
              x.length === 0 ?delete NewStudent.Name : dumm = null
            }}
          />
        </div>

        {/* Mobile */}
        <div className='RowProfile'>
          <h4>Mobile</h4>
          <input
            type="text"
            placeholder={Student.Mobile}
            onChange={event => {
              const x = event.target.value.trim()
              let  dumm
              NewStudent.Mobile = x
              x.length === 0 ?delete NewStudent.Mobile : dumm = null
            }}
          />
        </div>

        {/* Email */}
        <div className='RowProfile'>
          <h4>Email</h4>
          <input
            type="text"
            placeholder={Student.Email}
            onChange={event => {
              const x = event.target.value.trim()
              let  dumm
              NewStudent.Email = x
              x.length === 0 ?delete NewStudent.Email : dumm = null
            }}
          />
        </div>

        {/* Study */}
        <div className='RowProfile'>
          <h4> University</h4>
          <input
            type="text"
            placeholder={Student.University }
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewStudent.University = x
              x.length === 0 ?delete NewStudent.University : dumm = null
            }}
          />
        </div>

        <div className='RowProfile'>
          <h4> Faculty</h4>
          <input
            type="text"
            placeholder={Student.Faculty}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewStudent.Faculty = x
              x.length === 0 ?delete NewStudent.Faculty : dumm = null
            }}
          />
        </div>

        <div className='RowProfile'>
          <h4> Department</h4>
          <input
            type="text"
            placeholder={Student.Department}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewStudent.Department = x
              x.length === 0 ?delete NewStudent.Department : dumm = null
            }}
          />
        </div>

        <div className='RowProfile'>
          <h4> Academic_Year</h4>
          <input
            type="text"
            placeholder={Student.Academic_Year}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewStudent.Academic_Year= x
              x.length === 0 ?delete NewStudent.Academic_Year : dumm = null
            }}
          />
        </div>

        {/* User_Name */}
        <div className='RowProfile'>
          <h4>User Name</h4>
          <input
            type="text"
            placeholder={User.User_Name}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewUser.User_Name = x
              x.length === 0 ? delete NewUser.User_Name : dumm = null
            }}
          />
        </div>


        {/* Password */}
        <div className='RowProfile'>
          <h4>Password</h4>
          <input
            type="password"
            placeholder={User.Password ? "●".repeat(4) : ""}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewUser.Password = x
              x.length === 0 ? delete NewUser.Password : dumm = null
            }}
          />
        </div>

        <div className='ProfileButtons'>
          <button type="submit" onClick={saveChanges}>Save</button>
          <button type="button" onClick={() => { setEdit(false) }}>Cancel</button>
        </div>
      </form>
    }
    </div>
  );
}
export default Profile