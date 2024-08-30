import React from 'react'
import Dashnavbar from './dashnavbar'
import Dashboardmenu from './dashboardmenu'
import './dash11.css'


const Profildash2 = () => {

    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-sm-2'> <Dashboardmenu /></div>
                <div className='col-sm-10'>

                    <Dashnavbar />

                    <div className='row'>
                        <div className='col-sm-12' >
                            <div class="trapezoid  mt-3 text-center text-white">Account</div>


                            <div class="card mt-3" >
                                <div class="card-body" style={{ background: '#00a69c' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Login With facebook Play With Friends</p></div>
                                        <div className='col-sm-2'> <button class="btn btn-primary">
                                            <i class="fab fa-facebook"></i> Login
                                        </button></div>
                                    </div>


                                </div>
                                <div class="card-body mt-3" style={{ background: '#796309' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Login With Google</p></div>
                                        <div className='col-sm-2'> <button class="btn " style={{ background: 'orange' }}>
                                            <i class="fas fa-gamepad text-white"></i> <span className='text-white'>Login</span>
                                        </button></div>
                                    </div>


                                </div>
                                <div class="card-body mt-3" style={{ background: '#ffa200' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Logout</p></div>
                                        <div className='col-sm-2'> <button class="btn btn-primary">
                                            <i class="fas fa-user text-lg mr-2"></i> Login
                                        </button></div>
                                    </div>


                                </div>
                                <div class="card-body mt-3" style={{ background: '#22c1c3' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Practice Mode</p></div>
                                        <div className='col-sm-2'> <button class="btn btn-primary" style={{ background: '#22c324' }}>
                                            Pass and  play
                                        </button></div>
                                    </div>


                                </div>
                                <div class="card-body mt-3" style={{ background: '#c322a7' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Chat Message.</p></div>
                                        <div className='col-sm-2'> <button class="btn btn-primary">
                                            check
                                        </button></div>
                                    </div>


                                </div>
                                <div class="card-body mt-3" style={{ background: '#22c34a' }}>
                                    <div className='row'>
                                        <div className='col-sm-10'> <p class="card-text text-white">Language</p></div>
                                        <div className='col-sm-2'> <button class="btn btn-primary" style={{ background: '#fdbb2d' }}>
                                            change
                                        </button></div>
                                    </div>


                                </div>
                            </div>





                        </div>
                    </div>



                </div>
            </div>
        </div >
    )
}

export default Profildash2