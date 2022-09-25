import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Edit({ User }) {

    const [NewUser, setNewUser] = useState({})
    const [Edit, setEdit] = useState(false)

     useEffect(() => {
        setNewUser({ _id: User._id })
    }, [])




    const saveChanges = event => {
        // 👇️ prevent page refresh
        event.preventDefault();

        axios.put("/UpdateUser", { User: NewUser }).then((response) => {
            alert(response.data.Message)
            window.location.href = './';
        }).catch((error)=>alert(error))
    };

    return (
        <div className='Profile'>{Edit == false ?
            <div>
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
    )
}

export default Edit