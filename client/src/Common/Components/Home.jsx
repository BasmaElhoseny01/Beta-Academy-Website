import React from 'react'
import { useEffect } from 'react'
function Home() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("Beta_user"))//get user from local storage & convert to JSON
        if (user) {
            window.location.href=`/${user.Type}/${user.User_ID}`
        }
        else {
            window.location.href = "/Login"
        }
    })
    return (
        <div>Home</div>
    )
}

export default Home