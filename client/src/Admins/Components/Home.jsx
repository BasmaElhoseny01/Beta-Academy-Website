import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

//styling
import '../Styling/Home.css'

function Home({ User }) {
    const [NewWorkShop, setNewWorkShop] = useState({})
    const [Instructors, setInstructors] = useState([])


    const [NewInstructor, setNewInstructor] = useState({})
    const [NewUserInst, setNewUserInst] = useState({})
    const [Edit, setEdit] = useState(false)

    const [NewUserAdmin, SetNewUserAdmin] = useState({})


    const [EditedWorkShop, setEditedWorkShop] = useState({})

    const [NewEditedWorkShop, setNewEditedWorkShop] = useState({})

    const [NewEditedInsructor, setNewEditedInsructor] = useState({_id:"default",Salary: "" })
    const [NewInstructorUser, setNewInstructorUser] = useState({})

    const [WorkShops, setWorkShops] = useState([])
    const [WorkShopDeleted, setWorkShopDeleted] = useState("")

    const [Students, setStudents] = useState([])
    const [StudentWorkShops, setStudentWorkShops] = useState([])

    const [Student_unenrolled, setStudent_unenrolled] = useState("")
    const [WorkShop_unenrolled, setWorkShop_unenrolled] = useState("")



    const [InstructorDeleted, setInstructorDeleted] = useState("")

    const [Admins, setAdmins] = useState([])
    const [AdminDeleted, setAdminDeleted] = useState("")

    const [ResetedUser, setResetUser] = useState("")

    useEffect(() => {
        setNewWorkShop({ Name: "", Field: "", StartDate: "", Duration: "", SessionsPerWeek: "", SessionTime: "", Instructor_ID: "", Location: "", Price: "", MaxCapacity: "", Status: "" })
        //getting all instructors
        axios.get(`/FindInstructors`).then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
                return
            }
            setInstructors(response.data)
        }).catch((error) => alert(error))

        setNewInstructor({ Name: "", Mobile: "", Email: "", Study: "", Salary: "" })
        setNewUserInst({ User_Name: "" })

        SetNewUserAdmin({ User_Name: "" })

        //getting all WorkShops
        axios.get('/FindWorkShops').then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
            }
            else
                setWorkShops(response.data)
        }).catch((error) => alert(error))

        //getting all Students
        axios.get('/FindStudents').then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
            }
            else
                setStudents(response.data)
        }).catch((error) => alert(error))


        //getting all admins
        axios.get('/allAdmins').then((response) => {
            if (response.data.status == 200) {
                setAdmins(response.data.AdminsObj)
            }
            else
                alert(response.data.Message)
        }).catch((error) => alert(error))
    }, [])

    const AddWorkShop = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();

        if (NewWorkShop.Name === "" || NewWorkShop.Field === "" || NewWorkShop.StartDate === "" || NewWorkShop.Duration === "" ||
            NewWorkShop.SessionsPerWeek === "" || NewWorkShop.SessionTime === "" || NewWorkShop.Instructor_ID === "" || NewWorkShop.Location === "" || NewWorkShop.Price === "" || NewWorkShop.MaxCapacity === ""
            || NewWorkShop.Status === "") {
            alert("Please Fill All fields")
            return
        }
        axios.post("/AddWorkShop", {
            Name: NewWorkShop.Name, Field: NewWorkShop.Field,
            StartDate: NewWorkShop.StartDate, Duration: NewWorkShop.Duration, SessionsPerWeek: NewWorkShop.SessionsPerWeek, SessionTime: NewWorkShop.SessionTime, Instructor_ID: NewWorkShop.Instructor_ID, Location: NewWorkShop.Location, Price: NewWorkShop.Price, MaxCapacity: NewWorkShop.MaxCapacity, Status: NewWorkShop.Status
        }).then((response) => {
            console.log(response)
            console.log(typeof (response.data.status))
            console.log(typeof (200))

            if (response.data.status == 200) {
                alert(response.data.Message)
                window.location.reload();
                return;
            }
            //error
            alert(response.data.Message)

        }).catch((error) => alert(error))
    }


    const AddInstructor = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();

        if (NewInstructor.Name === "" || NewInstructor.Mobile === "" || NewInstructor.Email === "" || NewInstructor.Study === "" || NewInstructor.Salary === "" || NewUserInst.User_Name === "") {
            alert("Please Fill All fields")
            return
        }
        axios.post("/AddInstructor", { Name: NewInstructor.Name, Mobile: NewInstructor.Mobile, Email: NewInstructor.Email, Study: NewInstructor.Study, Salary: NewInstructor.Salary, User_Name: NewUserInst.User_Name }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.Message)
                window.location.reload();
                return;
            }
            //error
            alert(response.data.Message)

        }).catch((error) => alert(error))
    }

    const AddAdmin = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();

        if (NewUserAdmin.User_Name === "") {
            alert("Please Fill All fields")
            return
        }
        axios.post("/AddUser", { User_Name: NewUserAdmin.User_Name, Password: "0000", Type: "Admin" }).then((response) => {
            if (response.data.status === 200) {
                alert(response.data.Message)
                window.location.reload();
                return;
            }
            else {
                alert(response.data.Message)
            }

        }).catch((error) => alert(error))

    }


    const EditWorkShop = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        axios.put("/UpdateWorkShop", { WorkShop: NewEditedWorkShop }).then((response) => {
            alert(response.data.Message)
            window.location.reload();
        }).catch((error) => alert(error))
    }

    const EditInsructor = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (NewEditedInsructor.Salary == "" ||NewEditedInsructor._id=="default") {
            alert("Please Fill All fields")
            return
        }
        let obj = Instructors.find(o => o._id == NewEditedInsructor._id);
        NewInstructorUser._id = obj.User_ID;
        axios.put("/UpdateInstructor", { Instructor: NewEditedInsructor, User: NewInstructorUser }).then((response) => {
            alert(response.data.Message)
            window.location.reload();
        }).catch((error) => alert(error))

    }

    const UnEnroll = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (Student_unenrolled == "default" || WorkShop_unenrolled == "default") {
            alert("Please Fill All fields")
            return
        }

        axios.put(`/UnEnroll`, { Student_ID: Student_unenrolled, WorkShop_ID: WorkShop_unenrolled }).then((response) => {
            alert(response.data.Message)
            window.location.reload();
        }).catch((error) => alert(error))
    }

    const DeleteWorkShop = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (WorkShopDeleted === "") {
            alert("Please Fill All fields")
            return
        }
        else {
            axios.post(`/DeleteWorkShop`, { ID: WorkShopDeleted }).then((response) => {
                alert(response.data.Message)
                window.location.reload();
            }).catch((error) => alert(error))
        }
    }

    const DeleteInstructor = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (InstructorDeleted === "") {
            alert("Please Fill All fields")
            return
        }
        else {
            axios.post(`/DeleteInstructor`, { ID: InstructorDeleted }).then((response) => {
                alert(response.data.Message)
                window.location.reload();
            }).catch((error) => alert(error))
        }
    }

    const DeleteAdmin = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (AdminDeleted === "") {
            alert("Please Fill All fields")
            return
        }
        else {
            axios.post(`/DeleteUser`, { ID: AdminDeleted }).then((response) => {
                alert(response.data.Message)
                window.location.reload();
            }).catch((error) => alert(error))
        }

    }

    const ResetUser = (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        if (ResetedUser === "") {
            alert("Please Fill All fields")
            return
        }
        else {
            axios.put(`/ResetUser`, { User_Name: ResetedUser }).then((response) => {
                alert(response.data.Message)
                if (response.data.status == 200)
                    window.location.reload();
            }).catch((error) => alert(error))
        }
    }

    return (
        <div className='AdminHome'>
            <div className='Welcome'>Welcome {User.User_Name} 👋</div>

            <form onSubmit={AddWorkShop}>
                <h2 className='WorkShopsContainerTitle'>WorkShop</h2>
                <hr className='HorizontalLine' />

                {/* Name */}
                <div className='RowProfileAdmin'>
                    <h4>Name</h4>
                    <input
                        type="text"
                        placeholder="Web Development Round 10"
                        onChange={event => {
                            NewWorkShop.Name = event.target.value.trim()
                        }}
                    />
                </div>

                {/* Field */}
                <div className='RowProfileAdmin'>
                    <h4>Field</h4>
                    <input
                        type="text"
                        placeholder="Web"
                        onChange={event => {
                            NewWorkShop.Field = event.target.value.trim()
                        }}
                    />
                </div>


                {/* StartDate */}
                <div className='RowProfileAdmin'>
                    <h4>StartDate</h4>
                    <input
                        type="date"
                        placeholder="01/12/2022"
                        onChange={event => {
                            NewWorkShop.StartDate = event.target.value
                        }}
                    />
                </div>

                {/* Duration */}
                <div className='RowProfileAdmin'>
                    <h4>Duration(Weeks)</h4>
                    <input
                        type="number"
                        placeholder="4"
                        onChange={event => {
                            NewWorkShop.Duration = event.target.value
                        }}
                        min={0}
                    />
                </div>

                {/* SessionsPerWeek */}
                <div className='RowProfileAdmin'>
                    <h4>SessionsPerWeek</h4>
                    <input
                        type="number"
                        placeholder="2"
                        onChange={event => {
                            NewWorkShop.SessionsPerWeek = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                {/* SessionTime */}
                <div className='RowProfileAdmin'>
                    <h4>SessionTime(hours)</h4>
                    <input
                        type="number"
                        placeholder="2.5"
                        onChange={event => {
                            NewWorkShop.SessionTime = event.target.value.trim()
                        }}
                        min={0}
                        step="any"
                    />
                </div>



                {/* Instructor_ID */}
                <div className='RowProfileAdmin'>
                    <h4>Instructor</h4>
                    <select defaultValue={"default"} onChange={(e) => { NewWorkShop.Instructor_ID = (e.target.value) }}>
                        <option value="default" disabled>Select Instructor</option>
                        {Instructors ? Instructors.map((item) => {
                            return (<option value={item._id} key={item._id}>{item.Name}</option>)
                        }) : null}
                        <option value="-1">Not Assigned Yet ⏳</option>
                    </select>
                </div>

                {/* Location */}
                <div className='RowProfileAdmin'>
                    <h4>Location</h4>
                    <input
                        type="text"
                        placeholder="Task,El Dokki"
                        onChange={event => {
                            NewWorkShop.Location = event.target.value.trim()
                        }}
                    />
                </div>


                {/* Price */}
                <div className='RowProfileAdmin'>
                    <h4>Price(LE/Session)</h4>
                    <input
                        type="number"
                        placeholder="50"
                        onChange={event => {
                            NewWorkShop.Price = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                {/* MaxCapacity */}
                <div className='RowProfileAdmin'>
                    <h4>MaxCapacity</h4>
                    <input
                        type="number"
                        placeholder="20"
                        onChange={event => {
                            NewWorkShop.MaxCapacity = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>


                {/* Status */}
            {/* Available */}
                <div className='RowProfileAdmin'>
                    <h4>Status</h4>
                    <select defaultValue={"default"} onChange={(e) => { NewWorkShop.Status = (e.target.value) }}>
                        <option value="default" disabled>Select Status</option>
                        <option value="Available">🟢 Available</option>
                        <option value="Full">🔴 Full</option>
                        <option value="Past">⚫ Past</option>
                    </select>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Add WorkShop</button>
                </div>
            </form>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <form onSubmit={AddInstructor}>
                <h2 className='WorkShopsContainerTitle'>Instructor</h2>
                <hr className='HorizontalLine' />

                {/* Name */}
                <div className='RowProfileAdmin'>
                    <h4>Name</h4>
                    <input
                        type="text"
                        placeholder="Ali Elsayed Example"
                        onChange={event => {
                            NewInstructor.Name = event.target.value.trim()
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
                            NewInstructor.Mobile = event.target.value.trim()
                        }}

                    />
                </div>

                {/* Email */}
                <div className='RowProfileAdmin'>
                    <h4>Email</h4>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        onChange={event => {
                            NewInstructor.Email = event.target.value.trim()
                        }}

                    />
                </div>


                {/* Study */}
                <div className='RowProfileAdmin'>
                    <h4>Study</h4>
                    <input
                        type="text"
                        placeholder="Cairo University Faculty of Engineering"
                        onChange={event => {
                            NewInstructor.Study = event.target.value.trim()
                        }}

                    />
                </div>

                {/* Salary */}
                <div className='RowProfileAdmin'>
                    <h4>Salary</h4>
                    <input
                        type="number"
                        placeholder="1350"
                        onChange={event => {
                            NewInstructor.Salary = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                {/* User Name */}
                <div className='RowProfileAdmin'>
                    <h4>User Name</h4>
                    <input
                        type="text"
                        placeholder="Ali_Gamal03"
                        onChange={event => {
                            NewUserInst.User_Name = event.target.value.trim()
                        }}
                    />
                </div>

                {/* Password */}
                <div className='RowProfileAdmin'>
                    <p style={{ color: "red", fontSize: "11pt", margin: "auto" }}>*Password by default is 0000</p>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Add Instructor</button>
                </div>
            </form>

            <form onSubmit={AddAdmin}>
                <h2 className='WorkShopsContainerTitle'>Admin</h2>
                <hr className='HorizontalLine' />
                {/* User Name */}
                <div className='RowProfileAdmin'>
                    <h4>User Name</h4>
                    <input
                        type="text"
                        placeholder="Ali_Gamal03"
                        onChange={event => {
                            NewUserAdmin.User_Name = event.target.value.trim()
                        }}
                    />
                </div>

                {/* Password */}
                <div className='RowProfileAdmin'>
                    <p style={{ color: "red", fontSize: "11pt", margin: "auto" }}>*Password by default is 0000</p>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Add Admin</button>
                </div>
            </form>


            {/* ********************************************************************************************************** */}
            <form onSubmit={EditWorkShop}>
                <h2 className='WorkShopsContainerTitle'>Edit WorkShop</h2>
                <hr className='HorizontalLine' />

                <div className='RowProfileAdmin'>
                    <h4>WorkShop</h4>
                    <select defaultValue="default" onChange={(e) => {
                        NewEditedWorkShop._id = (e.target.value)
                        let obj = WorkShops.find(o => o._id == e.target.value);
                        { (obj.Instructor_ID == -1 ? obj.InstructorName = "Not Assigned yet ⏳" : obj.InstructorName = (Instructors.find(o => o._id == obj.Instructor_ID)).Name) }
                        setEditedWorkShop(obj);
                        setEdit(true)

                    }
                    }>
                        <option value="default" disabled>Select WorkShop</option>
                        {WorkShops ? WorkShops.map((workshop) => {
                            return (<option value={workshop._id} key={workshop._id}>{workshop.Name}</option>)
                        }) : null}
                    </select>
                </div>

                {/* Name */}
                <div className='RowProfileAdmin'>
                    <h4>Name</h4>
                    <input disabled={Edit == false}
                        type="text"
                        placeholder={EditedWorkShop.Name}
                        onChange={event => {
                            const x = event.target.value.trim()
                            let dumm
                            NewEditedWorkShop.Name = x
                            x.length === 0 ? delete NewEditedWorkShop.Name : dumm = null
                        }}
                    />
                </div>

                {/* Field */}
                <div className='RowProfileAdmin'>
                    <h4>Field</h4>
                    <input
                        type="text"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.Field}
                        onChange={event => {
                            const x = event.target.value.trim()
                            let dumm
                            NewEditedWorkShop.Field = x
                            x.length === 0 ? delete NewEditedWorkShop.Field : dumm = null
                        }}
                    />
                </div>

                {/* StartDate */}
                <div className='RowProfileAdmin'>
                    <h4>StartDate</h4>
                    <input
                        type="date"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.StartDate}
                        onChange={event => {
                            NewEditedWorkShop.StartDate = event.target.value
                        }}
                    />
                </div>


                {/* Duration */}
                <div className='RowProfileAdmin'>
                    <h4>Duration(Weeks)</h4>
                    <input
                        type="number"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.Duration}
                        onChange={event => {
                            NewEditedWorkShop.Duration = event.target.value
                        }}
                        min={0}
                    />
                </div>

                {/* SessionsPerWeek */}
                <div className='RowProfileAdmin'>
                    <h4>SessionsPerWeek</h4>
                    <input
                        type="number"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.SessionsPerWeek}
                        onChange={event => {
                            NewEditedWorkShop.SessionsPerWeek = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                {/* SessionTime */}
                <div className='RowProfileAdmin'>
                    <h4>SessionTime(hours)</h4>
                    <input
                        type="number"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.SessionTime}
                        onChange={event => {
                            NewEditedWorkShop.SessionTime = event.target.value.trim()
                        }}
                        min={0}
                        step="any"
                    />
                </div>

                {/* Instructor_ID */}
                <div className='RowProfileAdmin'>
                    <h4>Instructor</h4>
                    <select defaultValue={"default"} onChange={(e) => {
                        NewEditedWorkShop.Instructor_ID = (e.target.value)
                    }}
                        disabled={Edit == false}>
                        <option value="default" disabled>
                            {EditedWorkShop && Object.keys(EditedWorkShop).length === 0 ? "Select Status" : EditedWorkShop.InstructorName}</option>

                        {Instructors ? Instructors.map((item) => {
                            return (<option value={item._id} key={item._id}>{item.Name}</option>)
                        }) : null}
                        <option value="-1">Not Assigned Yet ⏳</option>
                    </select>
                </div>

                {/* Location */}
                <div className='RowProfileAdmin'>
                    <h4>Location</h4>
                    <input
                        type="text"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.Location}
                        onChange={event => {
                            NewEditedWorkShop.Location = event.target.value.trim()
                        }}
                    />
                </div>


                {/* Price */}
                <div className='RowProfileAdmin'>
                    <h4>Price(LE/Session)</h4>
                    <input
                        type="number"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.Price}
                        onChange={event => {
                            NewEditedWorkShop.Price = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                {/* MaxCapacity */}
                <div className='RowProfileAdmin'>
                    <h4>MaxCapacity</h4>
                    <input
                        type="number"
                        disabled={Edit == false}
                        placeholder={EditedWorkShop.MaxCapacity}
                        onChange={event => {
                            NewEditedWorkShop.MaxCapacity = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>


                {/* Status */}
                <div className='RowProfileAdmin'>
                    <h4>Status</h4>
                    <select defaultValue={"default"} onChange={(e) => { NewEditedWorkShop.Status = (e.target.value) }} disabled={Edit == false}>
                        <option value="default" disabled>{EditedWorkShop && Object.keys(EditedWorkShop).length === 0 ? "Select Status" : EditedWorkShop.Status}</option>
                        <option value="Available">🟢 Available</option>
                        <option value="Full">🔴 Full</option>
                        <option value="Past">⚫ Past</option>
                    </select>
                </div>




                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Edit WorkShop</button>
                </div>
            </form>

            {/* ********************************************************************************************************** */}
            <form onSubmit={EditInsructor}>
                <h2 className='WorkShopsContainerTitle'>Edit Instructor</h2>
                <hr className='HorizontalLine' />

                {/* Instructor */}
                <div className='RowProfileAdmin'>
                    <h4>Instructor</h4>
                    <select defaultValue={"default"} onChange={(e) => {
                        NewEditedInsructor._id = (e.target.value)
                    }}>
                        <option value="default" disabled>Select Instructor</option>
                        {Instructors ? Instructors.map((item) => {
                            return (<option value={item._id} key={item._id}>{item.Name}</option>)
                        }) : null}
                    </select>
                </div>

                {/* Salary */}
                <div className='RowProfileAdmin'>
                    <h4>Salary</h4>
                    <input
                        type="number"
                        placeholder="1350"
                        onChange={event => {
                            NewEditedInsructor.Salary = event.target.value.trim()
                        }}
                        min={0}
                    />
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Edit Salary</button>
                </div>
            </form>


            {/* *******************************************************************************88 */}
            <form onSubmit={UnEnroll}>
                <h2 className='WorkShopsContainerTitle'>UnEnroll Student</h2>
                <hr className='HorizontalLine' />

                <div className='RowProfileAdmin'>
                    <h4>Student</h4>
                    <select defaultValue="default" onChange={(e) => {
                        setStudent_unenrolled(e.target.value)

                        let obj = Students.find(o => o._id == e.target.value);
                        setStudentWorkShops(obj.WorkShops);

                        document.getElementById('Work_shop').selectedIndex = "default"
                        // console.log(obj.WorkShops)

                    }
                    }>
                        <option value="default" disabled>Select Student</option>
                        {Students ? Students.map((student) => {
                            return (<option value={student._id} key={student._id}>{student.Name}</option>)
                        }) : null}
                    </select>

                    <select id="Work_shop" defaultValue="default" onChange={(e) => {
                        setWorkShop_unenrolled(e.target.value)
                    }
                    }>
                        <option value="default" disabled>Select WorkShop</option>

                        {StudentWorkShops ? StudentWorkShops.map((workShop) => {
                            let Wobj = WorkShops.find(o => o._id == workShop);
                            return (<option value={Wobj._id} key={Wobj._id}>{Wobj.Name}</option>)
                        }) : null}
                    </select>
                </div>


                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Unenroll</button>
                </div>
            </form>


            {/* ********************************************************************************************************** */}
            <form onSubmit={DeleteWorkShop}>
                <h2 className='WorkShopsContainerTitle'>Delete WorkShop</h2>
                <hr className='HorizontalLine' />
                <div className='RowProfileAdmin'>
                    <h4>Name</h4>
                    <select defaultValue={"default"} onChange={(e) => { setWorkShopDeleted(e.target.value) }}>
                        <option value="default" disabled>Select WorkShop</option>
                        {WorkShops ? WorkShops.map((Workshop) => {
                            return (<option value={Workshop._id} key={Workshop._id}>{Workshop.Name}</option>)
                        }) : null}
                    </select>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Delete WorkShop</button>
                </div>
            </form>


            {/* ********************************************************************************************************** */}
            <form onSubmit={DeleteInstructor}>
                <h2 className='WorkShopsContainerTitle'>Delete Instructor</h2>
                <hr className='HorizontalLine' />
                <div className='RowProfileAdmin'>
                    <h4>Name</h4>
                    <select defaultValue={"default"} onChange={(e) => { setInstructorDeleted(e.target.value) }}>
                        <option value="default" disabled>Select Instructor</option>
                        {Instructors ? Instructors.map((instructor) => {
                            return (<option value={instructor._id} key={instructor._id}>{instructor.Name}</option>)
                        }) : null}
                    </select>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Delete Instructor</button>
                </div>
            </form>
            {/* ************************************************************************************************************* */}

            <form onSubmit={DeleteAdmin}>
                <h2 className='WorkShopsContainerTitle'>Delete Admin</h2>
                <hr className='HorizontalLine' />
                <div className='RowProfileAdmin'>
                    <h4>User Name</h4>
                    <select value="default" onChange={(e) => { setAdminDeleted(e.target.value) }}>
                        <option value="default" disabled>Select Admin's User Name</option>
                        {Admins ? Admins.map((admin) => {
                            return (<option value={admin._id} key={admin._id} disabled={admin._id == User._id}>{admin.User_Name}</option>)
                        }) : null}
                    </select>
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Delete Admin</button>
                </div>
            </form>
            {/* ************************************************************************************************************* */}

            <form onSubmit={ResetUser}>
                <h2 className='WorkShopsContainerTitle'>Reset Password</h2>
                <hr className='HorizontalLine' />
                <div className='RowProfileAdmin'>
                    <h4>User Name</h4>
                    <input
                        type="text"
                        placeholder="Ali_Gamal03"
                        onChange={event => {
                            setResetUser(event.target.value.trim())
                        }}
                    />
                </div>

                <div className="ProfileButtonsAdmin">
                    <button type='submit'>Reset</button>
                </div>
            </form>

        </div>
    )
}
export default Home