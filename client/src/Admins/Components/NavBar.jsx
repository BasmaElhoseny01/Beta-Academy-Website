import React from 'react'
import { Link } from 'react-router-dom'

import AboutBar from '../../Common/Components/AboutBar'

import Logo from '../../Common/Images/Logo.png'
import Account from '../Images/account.png'
import LogOut from '../../Common/Images/Logout.png'
function NavBar() {
  return (
    <div>
      <div className='NavBar_Instructor'>
        <ul className='NavBarIcons _1'>
          <li><Link to="./">Home</Link></li>
          <li><Link to="./AllInstructors">Instructors</Link></li>

        </ul>
        <img src={Logo} alt="logo" className='Logo'></img>
        <ul className='NavBarIcons _2'>
          <li><Link to="./AllStudents">Students</Link></li>
          <li><Link to="./AllCourses">WorkShops</Link></li>
          <li><Link to="./Edit"><img src={Account} alt="Account" className='Logout' /></Link></li>
          <li><Link to="./Logout"><img src={LogOut} alt="log out" className='Logout' /></Link></li>
        </ul>
      </div>
      <AboutBar />
    </div>
  )
}

export default NavBar