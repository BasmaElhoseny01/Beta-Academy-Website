import React from 'react'
import { useEffect } from 'react'

function Logout() {
  useEffect(() => {
    localStorage.removeItem("Beta_user")//remove user from local storgae

    window.location.href = "/Login"

  })
  return (
    <div>Home</div>
  )

}

export default Logout