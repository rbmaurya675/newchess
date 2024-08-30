import React from 'react'
import { Link } from 'react-router-dom'

const Dashnavbar = () => {
    return (
        <div>
            <div className='row  p-3' style={{ background: '#790000' }}>


                <div className='col-sm-2 flex text-white'>
                    <div className='col-sm-10 text-white'>Dashboard</div>
                    <img src='notif.png' style={{ height: '25px', marginLeft: '180PX' }} />
                    <Link to="/Dasprofile"><img src='profil.png' className="mx-2" style={{ height: '25px' }} /></Link>
                </div>

            </div>
        </div>
    )
}

export default Dashnavbar