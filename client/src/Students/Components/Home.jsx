import React from 'react'
import WorkShop from '../../Common/Components/WorkShop'


//styling
import '../Styling/Home.css'

function Home({ Student }) {

    return (
        <div className='AdminHome'>
            <div className='Welcome'>Welcome {Student.Name ? (Student.Name.indexOf(' ') > 0 ? Student.Name.substring(0, Student.Name.indexOf(' ')) : Student.Name) : <p>Loading....</p>} 👋</div>
            <div className='InstryctorWorkShopsHome'>Your WorkShops</div>
            {Student.WorkShops ? <div className='StudentWorkShops'>
                {Object.values(Student.WorkShops).map((value) => {
                    // return <h1>{value}</h1>
                    return <WorkShop WorkShopID={value} SeeFlag={true} key={value} />
                })}
            </div> : <h1>loading.....</h1>}
        </div>
    )
}

export default Home