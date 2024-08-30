import React from 'react'
import styles from './page.css';

const Kyc = () => {
    return (


        <div className='container-fluid  ' style={{ background: '	#530000' }}>
            <div class="container">
                <div class="form">
                    <div className='text-center text-white mt-4'> <h4>KYC DETAILS</h4></div>

                    <form class="" action="" method="get">
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Email Id" required autocomplete="off" />
                        </div>

                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Passward" required autocomplete="off" />
                        </div>
                        <div class="formGroup">
                            <input type="text" id="userName" placeholder=" Account Holder Name*" autocomplete="off" />
                        </div>
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Account Number*" required autocomplete="off"
                            />
                        </div>
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Confirm Account No.*" required autocomplete="off" />
                        </div>
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="IFSC Code*" required autocomplete="off" />
                        </div>
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Bank Name" required autocomplete="off" />
                        </div>

                        <div class="formGroup">
                            <input type="password" id="confirmPassword" placeholder="Branch" required
                                autocomplete="off" />
                        </div>

                        <div class="text-center ">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <span class="text">I agree with term & conditions</span>
                        </div>
                        <div class="formGroup mt-1">
                            <button type="button" class="btn2">REGISTER</button>
                        </div>

                    </form>


                    <form class="login" action="" method="get">

                        <div class="formGroup">
                            <input type="email" placeholder="Email ID" name="email" required autocomplete="off" />
                        </div>
                        <div class="formGroup">
                            <input type="password" id="password" placeholder="Password" required autocomplete="off" />

                        </div>
                        <div class="checkBox">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <span class="text">Keep me signed in on this device</span>
                        </div>
                        <div class="formGroup">
                            <button type="button" class="btn2">REGISTER</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>


    )
}

export default Kyc