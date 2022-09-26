import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

//styling
import '../Styling/Profile.css'

function Profile({ Instructor, User }) {

  const [NewIntructor, setNewInstructor] = useState({})
  const [NewUser, setNewUser] = useState({})

  const [Edit, setEdit] = useState(false)

  useEffect(() => {
    setNewInstructor({ _id: Instructor._id })
    setNewUser({ _id: User._id })
  }, [])


  const saveChanges = event => {
    // 👇️ prevent page refresh
    event.preventDefault();

    axios.put("/UpdateInstructor", { Instructor: NewIntructor, User: NewUser }).then((response) => {
      alert(response.data.Message)

      window.location.href = './';
    }).catch((error)=>alert(error))
  };

  return (
    <div className='Profile'>{Edit == false ?
      <div>
        <div className='RowProfile'>
          <h4>Name</h4>
          <p className='InfoShowProfile'>{Instructor.Name}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Mobile</h4>
          <p className='InfoShowProfile'>{Instructor.Mobile}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Email</h4>
          <p className='InfoShowProfile'>{Instructor.Email}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Study</h4>
          <p className='InfoShowProfile'>{Instructor.Study}</p>
        </div>

        <hr className="LineSplitterProfile" />

        <div className='RowProfile'>
          <h4>Salary</h4>
          <p className='InfoShowProfile'>{Instructor.Salary} LE</p>
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
            placeholder={Instructor.Name}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewIntructor.Name = x
              x.length === 0 ? delete NewIntructor.Name : dumm = null
            }}
          />
        </div>

        {/* Mobile */}
        <div className='RowProfile'>
          <h4>Mobile</h4>
          <input
            type="text"
            placeholder={Instructor.Mobile}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewIntructor.Mobile = x
              x.length === 0 ? delete NewIntructor.Mobile : dumm = null
            }}
          />
        </div>

        {/* Email */}
        <div className='RowProfile'>
          <h4>Email</h4>
          <input
            type="text"
            placeholder={Instructor.Email}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewIntructor.Email = x
              x.length === 0 ? delete NewIntructor.Email : dumm = null
            }}
          />
        </div>

        {/* Study */}
        <div className='RowProfile'>
          <h4>Study</h4>
          <input
            type="text"
            placeholder={Instructor.Study}
            onChange={event => {
              const x = event.target.value.trim()
              let dumm
              NewIntructor.Study = x
              x.length === 0 ? delete NewIntructor.Study : dumm = null
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