import React from 'react'
import { Link } from 'react-router-dom';

//styling
import '../Styling/Footer.css'

//Logos
import Facebook from '../Images/Facebook.png'
import Instagram from '../Images/Instagram.png'
import Linkedin from '../Images/Linkedin.png'
import Gmail from '../Images/Gmail.png'



function Footer() {
  return (
    <div className='Footer'>
   
      <div className="Follow_Me">
      <p className='Phone'>☎ +0201120127810</p>
        <h2>Follow Us 😉</h2>
        <div className="social">
          <a href="https://www.facebook.com/BetaAcademy.B"><img src={Facebook} alt="Facebook" /></a>
          <a href="https://www.instagram.com/beta_academy18/?fbclid=IwAR0AdEff0oCRZ-Hny-arWtA0M63RGfK38Q2Jd95mli_JmNTs1meThDNQAbw"><img src={Instagram} alt="Instagram" /></a>
          <a href="https://www.linkedin.com/company/beta-training-academy/?fbclid=IwAR0HfoZgtLecAkKaTKe5tWWvB02QCyo6-MF3y38E1coh3uK1UdhTOmUjpow"><img src={Linkedin} alt="linkedin" /></a>
          <a href="mailto:betaacademy18@gmail.com"><img src={Gmail} alt="Gmail" /></a>
        </div>
      </div>
      <div className="Copyrights">
        <h4>Copyright © Beta Academy</h4>
      </div>
    </div>

  )
}

export default Footer