import React from 'react'

const Deposit = () => {
    return (
        <div className='container-fluid ' style={{ height: '695px', background: '#530000' }}>

            <div className='row '>
                <div className='col-sm-3'></div>
                <div className='col-sm-8 ' >
                    <div class="w-full max-w-lg mt-40">
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h4 className='text-center'> Withdrawal</h4>

                            <div class="mb-6">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                                    Amount
                                </label>

                                <input type="" class="form-control" id="inputEmail4" placeholder="****************" />

                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    Pay
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>




        </div>

    )
}

export default Deposit
