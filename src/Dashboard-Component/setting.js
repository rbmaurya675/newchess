import React from 'react'
import Adminmenu from './adminmenu'
import Dashnavbar from './dashnavbar'
import Adminnavigate from './adminnavigate'

const Setting = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Adminmenu />
                </div>
                <div className='col-sm-10'>
                    <Adminnavigate />
                    {/* <AllUser /> */}
                    translate
                </div>

            </div>
        </div>
    )
}

export default Setting