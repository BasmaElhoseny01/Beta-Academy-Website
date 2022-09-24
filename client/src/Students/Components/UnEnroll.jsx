import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';

function UnEnroll({ Student }) {
    const [WorkShops, setWorkShops] = useState([]);
    // const [MyWorkshops,setMyWorkShops]=useState([]);
    const [WorkShopID, setWorkShopID] = useState("");
    useEffect(() => {
        axios.get(`/FindWorkShops`).then((response) => {
            if (response.data.status == -1) {
                alert(response.data.Message)
            }
            else
                setWorkShops(response.data)
        }).catch((error) => alert(error))
        //   setWorkShops(Student.WorkShops)
    }, [])


    const unenroll = (event) => {
        console.log(WorkShopID, Student._id)
        // 👇️ prevent page refresh
        event.preventDefault();
        if (WorkShopID === "default") {
            alert("Fill Workshop Name Feild")
            return;
        }
        else {
            axios.put(`/UnEnroll`, { Student_ID: Student._id, WorkShop_ID: WorkShopID }).then((response) => {
                if (response.data.status === -1) {
                    // console.log("err")
                    alert(response.data.err)
                    return;
                }
                else if (response.data.status === 404) {
                    console.log("404")
                    alert(response.data.Message)
                    return;
                }
                alert(response.data.Message)
                window.location.href = './';

            }, []).catch((error) => alert(error))
        }
    }
    let obj;
    return (
        <div className='AdminHome'>
            <form onSubmit={unenroll}>
                <h2 className='WorkShopsContainerTitle'>UnEnroll Student</h2>
                <hr className='HorizontalLine' />

                {/* Name */}
                <div className='RowProfileAdmin'>
                    <h4>Workshop</h4>
                    <select defaultValue="default" onChange={(e) => {
                        setWorkShopID(e.target.value)
                    }
                    }>
                        <option value="default" disabled>Select WorkShop</option>
                        {Student ? (Student.WorkShops ? Student.WorkShops.map((workshop) => {
                            obj = WorkShops.find(o => o._id == workshop);
                            if (obj)
                                return (<option value={obj._id} key={obj._id} disabled={obj.Status == "Past"}>{obj.Name}</option>)
                            else return null
                        }) : null) : null}
                    </select>
                    <div className="ProfileButtonsAdmin">
                        <button type='submit'>UnEnroll</button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default UnEnroll