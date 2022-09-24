import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import UnEnroll from './UnEnroll'

function Enroll({ Student }) {
  const [WorkShops, setWorkShops] = useState([])
  const [WorkshopID, setWorkshopID] = useState("")
  // const [Student, setStudent] = useState({})


  useEffect(() => {
    //getting all WorkShops
    axios.get(`/FindWorkShops`).then((response) => {
      if (response.data.status == -1) {
        alert(response.data.Message)
      }
      else
        setWorkShops(response.data)
    }).catch((error) => alert(error))
  }, [])



  const enroll = (event) => {
    // 👇️ prevent page refresh
    event.preventDefault();
    if (WorkshopID === "default") {
      alert("Fill Workshop Name Feild")
      return;
    }
    else {

      axios.put(`/Enroll`, { Student_ID: Student._id, WorkShop_ID: WorkshopID }).then((response) => {
        // console.log(response.data) 
        if (response.data.status === -1) {
          console.log("err")
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
  return (
    <div className='AdminHome'>


      <form onSubmit={enroll}>
        <h2 className='WorkShopsContainerTitle'>Enroll in WorkShop</h2>
        <hr className='HorizontalLine' />

        {/* Name */}
        <div className='RowProfileAdmin'>
          <h4> Workshop</h4>
          <select defaultValue="default" onChange={(e) => {
            setWorkshopID(e.target.value)
          }
          }>
            <option value="default" disabled>Select WorkShop</option>
            {WorkShops ? WorkShops.map((workshop) => {
              return (<option value={workshop._id} key={workshop._id} disabled={workshop.Status != "Avaliable"}>{workshop.Name}</option>)
            }) : null}
          </select>
          <div className="ProfileButtonsAdmin">
            <button type='submit'>Enroll</button>
          </div>

        </div>
      </form>

      <UnEnroll Student={Student}/>

    </div>
  )
}

export default Enroll