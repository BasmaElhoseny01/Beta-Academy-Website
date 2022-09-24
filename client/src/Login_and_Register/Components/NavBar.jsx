import React from 'react'
import { Link } from 'react-router-dom'

import AboutBar from '../../Common/Components/AboutBar'
import Logo from '../../Common/Images/Logo.png'
//styling
import '../Styling/NavBar.css'
function NavBar() {
    return (
        <div>
            <div className='NavBar_Instructor'>
                <ul className='NavBarIcons _1'>
                    <li><Link to="../Login">Log In</Link></li>
                </ul>
                <img src={Logo} alt="logo" className='Logo' style={{ margin: "auto" }}></img>
                <ul className='NavBarIcons _2'>
                    <li><Link to="../Signup">Sign Up</Link></li>
                </ul>
            </div>
            <AboutBar />
        </div>
    )
}

export default NavBar