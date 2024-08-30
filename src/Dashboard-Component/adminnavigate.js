import React from 'react'
import { Link } from 'react-router-dom'

const Adminnavigate = () => {
    return (
        <div>
            <div className='row  p-3' style={{ background: '#790000' }}>

                <div className='col-sm-10 text-white'>AddminDashboard</div>
                <div className='col-sm-2 flex text-white'>

                    <img src='notif.png' className='h-7' />
                    <Link to='/profile'> <span class="flex-1  whitespace-nowrap text-black" ><img src='profil.png' className='h-7 mx-3' /></span></Link>
                </div>

            </div>
        </div>
    )
}

export default Adminnavigate