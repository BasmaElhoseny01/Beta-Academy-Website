import React from 'react'

import WorkShop from '../../Common/Components/WorkShop'

//styling
import '../Styling/Home.css'

function Home({Instructor}) {

    return (
        <div className='InstructorHome'>
            <div className='Welcome'>Welcome {Instructor.Name ?( Instructor.Name.indexOf(' ')>0?Instructor.Name.substring(0, Instructor.Name.indexOf(' ')):Instructor.Name ): <p>Loading....</p>} 👋</div>
            <div className='InstryctorWorkShopsHome'>Your WorkShops</div>
            {Instructor.WorkShops ? <div className='InstructorWorkShops'>
                {Object.values(Instructor.WorkShops).map((value) => {
                    return <WorkShop WorkShopID={value} SeeFlag={true} key={value} />
                })}
            </div> : <h1>loading.....</h1>}
        </div>
    )
}

export default Home