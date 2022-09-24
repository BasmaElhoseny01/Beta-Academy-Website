import React from 'react'
import { Link } from 'react-router-dom'
//styling
import '../Styling/About.css'
function AboutBar() {
  return (
    <div className='AboutBar'><Link to="./About">About Beta</Link></div>
  )
}

export default AboutBar