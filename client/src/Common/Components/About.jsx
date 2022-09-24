import React from 'react'

//Data
import Reviews from '../Scripts/Reviews'

import BackGround from '../Images/BackGround.jpg'
//styling
import '../Styling/About.css'
function About() {

  let x = 0;
  return (
    <div className='WorkShopsContainer'>
      <img className='BackGround' src={BackGround} alt="Image"></img>
      <h2 className='WorkShopsContainerTitle'>About Beta</h2>
      <hr className='HorizontalLine' />
      <div className='AboutBeta'>
        Beta is a Training Center that aims to develop students' skills in Technical & Non-technical in all Engineering Fields.
        Helping them by 4 Main Projects :
        <ul>
        <li> Beta Academy</li>
        <li> Beta Plus</li>
        <li> Explore Engineering Event</li>
        <li> Souq Mohandseen</li>
        </ul>
      </div>
      <h2 className='WorkShopsContainerTitle'>Reviews</h2>
      <hr className='HorizontalLine' />
      <div className='Reviews'>
        {Reviews.map((item) => {

          return (<div className="flip-card" key={++x}>
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h1>{item.auother}</h1>
                <h3>{item.type}</h3>
              </div>
              <div className="flip-card-back">
                {item.Review}
              </div>
            </div>
          </div>)
        })}

      </div>

      <p className='FacebookGroup'><mark>You can see our Students's Tasks and project on Facebook group <a href='https://www.facebook.com/groups/311556907411232'>Beta Academy Tasks</a></mark></p>
    </div>
  )
}

export default About