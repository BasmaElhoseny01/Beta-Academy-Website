import React from 'react'
import { Link } from 'react-router-dom';

import AboutBar from '../../Common/Components/AboutBar';


import '../Styling/NavBar.css'

import Logo from '../../Common/Images/Logo.png'
import LogOut from '../Images/Logout.png'


function NavBar({ Fletter }) {
  return (
    <div>
      <div className='NavBar_Student'>
        <ul className='NavBarIcons _1'>
          <li><Link to="./">Home</Link></li>
          <li><Link to="./AllCourses">WorkShops</Link></li>
        </ul>
        <img src={Logo} alt="logo" className='Logo'></img>

        <ul className='NavBarIcons _2'>
          <li><Link to="./Enroll">Enroll/UnEnroll</Link></li>
          <li><Link to="./MyProfile">Profile</Link></li>
          <li><Link to="./Logout"><img src={LogOut} alt="log out" className='Logout' /></Link></li>
        </ul>
      </div>
      <AboutBar />
    </div>
  )
}

export default NavBar