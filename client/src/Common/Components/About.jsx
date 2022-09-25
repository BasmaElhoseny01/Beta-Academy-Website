import React from 'react'
import Carousel from 'better-react-carousel'

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
             <h2>{item.auother}</h2>
                <h4>{item.type}</h4>
                <h6>{item.Review}</h6>
          </div>)
        })}

      </div>

      <h2 className='WorkShopsContainerTitle'>Gallery</h2>
      <hr className='HorizontalLine' />
      <div style={{ "margin": "20px auto 20px auto", "width": "90%"}}>
        <Carousel cols={2} rows={1} gap={10} loop>
          <Carousel.Item>
            <img width="100%" src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/303599712_2329593007197261_3272569605255841529_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=NWN1DEvPPd0AX-S5_cf&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_h5Lpch4cMCgbXxVyoCidz-1L0LRHPFT_ZBoaEi8XQ5w&oe=63354AC9" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/304769520_2329593150530580_7116003846716979312_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=RNWa3fEFnRQAX-h2AuI&_nc_ht=scontent.fcai20-2.fna&oh=00_AT9UuyI96-79C3C51kguPEJ2q9Z06ZkZGhtTLJNIfEPJqg&oe=6336522C" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/304477229_2329592740530621_8188067329866721530_n.jpg?stp=dst-jpg_p600x600&_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=fef4HGq4G1kAX-ET1gE&_nc_ht=scontent-hbe1-1.xx&oh=00_AT8NqQetTombf9Sl33zFdlZ4CtlxfGnG4RNywgTjJdNRYg&oe=63364A40" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/305033683_2329592817197280_3064171698410183060_n.jpg?stp=dst-jpg_p600x600&_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=ZMQvAjU6C7kAX9Z41OE&_nc_ht=scontent.fcai20-2.fna&oh=00_AT-FBHxk0KrgqAqGbEjYe2O9iLpOIoDh-wzCnQ0_KMeY_Q&oe=63366EC3" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/304784318_2329592877197274_2119666564514251664_n.jpg?stp=dst-jpg_p600x600&_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=1m8t4MxGSwMAX_CNxFb&_nc_ht=scontent.fcai20-2.fna&oh=00_AT-wKw7qHrUk0OTgckSfhykZ0JrhpTxaqlKuhUsWTuHRWA&oe=63352C40" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent.fcai20-2.fna.fbcdn.net/v/t39.30808-6/304751870_2329593460530549_1858108282005912678_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=eEa8Dc6Pc_0AX9q89hT&_nc_ht=scontent.fcai20-2.fna&oh=00_AT_QuzVOkvTwMVLqEiz2eOdyovv1O68DVFwn6x4rA40IWQ&oe=63363DEF" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/305029910_2329593537197208_453802322885491040_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=COImMPKzMekAX-TgTQN&_nc_ht=scontent-hbe1-1.xx&oh=00_AT_sb1m7tgwQ6ssU64EAvraMkS1KbLJab1lrEQbCds3HAQ&oe=6335F380" />
          </Carousel.Item>
          <Carousel.Item>
            <img width="100%" src="https://scontent-hbe1-1.xx.fbcdn.net/v/t39.30808-6/304924908_2329594077197154_95149453378515905_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qCexVYDSS1cAX-KsemR&_nc_ht=scontent-hbe1-1.xx&oh=00_AT8kjbqeihfJwufPiJQ-XYZHdyJtOsrliL75mgIyW1Ly8A&oe=633673CC" />
          </Carousel.Item>
        </Carousel>
      </div>
      <p className='FacebookGroup'><mark>You can see our Students's Tasks and project on Facebook group <a href='https://www.facebook.com/groups/311556907411232'>Beta Academy Tasks</a></mark></p>
    </div>
  )
}

export default About