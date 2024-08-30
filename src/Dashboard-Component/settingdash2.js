// import React, { useState } from 'react';
// import Dashboardmenu from './dashboardmenu';
// import Dashnavbar from './dashnavbar';

// const Settingdash2 = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({
//         transation_id: '',
//         amount: '',
//     });

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const validate = () => {
//         let formErrors = {};
//         if (!formData.transation_id) formErrors.transation_id = 'Transaction ID is required';
//         if (!formData.amount) formErrors.amount = 'Amount is required';

//         setErrors(formErrors);
//         return Object.keys(formErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (validate()) {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await fetch('http://localhost:7000/api/add-deposit', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         transation_id: formData.transation_id,
//                         amount: formData.amount,
//                     }),
//                 });

//                 const result = await response.json();
//                 if (response.status === 201) {
//                     console.log('Deposit added successfully:', result);
//                     toggleModal(); // Close the modal
//                     // onDepositAdded(); // Fetch updated deposit data if necessary
//                 } else {
//                     console.error('Error adding deposit:', result);
//                 }
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//             }
//         } else {
//             console.log('Form has errors', errors);
//         }
//     };
//     const fetchDeposits = async () => {
//         const token = localStorage.getItem('token');
//         const requestOptions = {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         };
//         try {
//             const response = await fetch('http://localhost:7000/api/user-deposits', requestOptions);
//             const data = await response.json();
//             if (response.ok) {
//                 setDeposits(data.data);
//             } else {
//                 setError(data.message);
//             }
//         } catch (error) {
//             console.error('Error fetching deposits:', error);
//             setError('An error occurred while fetching deposits.');
//         }
//     };

//     return (
//         <div className='container-fluid'>
//             <div className='row'>
//                 <div className='col-sm-2'><Dashboardmenu /></div>
//                 <div className='col-sm-10'>
//                     <Dashnavbar />
//                     <div className='row'>
//                         <div className='col-sm-1'></div>
//                         <div className='col-sm-10 py-2 px-15' style={{ background: 'green', marginTop: '20px', padding: '15px', color: 'white' }}>
//                             <div className="">
//                                 <div className="flex">
//                                     <button
//                                         onClick={toggleModal}
//                                         className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                                     >
//                                         Add Deposit
//                                     </button>
//                                 </div>
//                                 {isModalOpen && (
//                                     <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//                                         <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
//                                             <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
//                                                 <h3><span className='text-dark'>Deposit Form</span></h3>
//                                                 <button
//                                                     type="button"
//                                                     onClick={toggleModal}
//                                                     className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                                                 >
//                                                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                                                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                                                     </svg>
//                                                     <span className="sr-only">Close modal</span>
//                                                 </button>
//                                             </div>
//                                             <div className="p-4 md:p-5">
//                                                 <form className="space-y-4" onSubmit={handleSubmit}>
//                                                     <img src='qr.jpg' alt="QR code" />
//                                                     <div>
//                                                         <input
//                                                             type="text"
//                                                             name="transation_id"
//                                                             id="transation_id"
//                                                             onChange={handleChange}
//                                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                                                             placeholder="Transaction ID"
//                                                             required
//                                                         />
//                                                         {errors.transation_id && <p className="text-red-500 text-sm">{errors.transation_id}</p>}
//                                                     </div>
//                                                     <div>
//                                                         <input
//                                                             type="number"
//                                                             name="amount"
//                                                             id="amount"
//                                                             onChange={handleChange}
//                                                             placeholder="Amount"
//                                                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                                                             required
//                                                         />
//                                                         {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
//                                                     </div>
//                                                     <button
//                                                         type="submit"
//                                                         className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                                                     >
//                                                         Submit
//                                                     </button>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     {/* Render your data table here */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Settingdash2;

import React, { useState, useEffect } from 'react';
import Dashboardmenu from './dashboardmenu';
import Dashnavbar from './dashnavbar';
const Settingdash2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [amount, setAmount] = useState('');
    const [deposits, setDeposits] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Load user deposits on component mount
        fetchDeposits();
    }, []);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleTransactionIdChange = (e) => {
        setTransactionId(e.target.value);
    };
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleDepositSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                transation_id: transactionId,
                amount: parseFloat(amount)
            })
        };
        try {
            const response = await fetch('http://localhost:7000/api/add-deposit', requestOptions);
            const data = await response.json();
            if (response.ok) {
                if (data.statusCode === '201') {
                    // Add the new deposit to the list without refreshing
                    setDeposits([...deposits, {
                        transation_id: transactionId,
                        amount: parseFloat(amount),
                        status: 0 // Assuming status 0 means pending
                    }]);
                    toggleModal(); // Close the modal after successful submission
                } else {
                    setError(data.message);
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error adding deposit:', error);
            setError('An error occurred while adding the deposit.');
        }
    };
    const fetchDeposits = async () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await fetch('http://localhost:7000/api/user-deposits', requestOptions);
            const data = await response.json();
            if (response.ok) {
                setDeposits(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching deposits:', error);
            setError('An error occurred while fetching deposits.');
        }
    };
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Dashboardmenu />
                </div>
                <div className='col-sm-10'>
                    <Dashnavbar />
                    <div className='row'>
                        <div className='col-sm-1'></div>
                        <div className='col-sm-10 py-2 px-15 ' style={{ background: 'green', marginTop: '20px ', padding: '15px', color: 'white' }}>
                            <div className=" ">
                                <div className="flex">
                                    <button
                                        onClick={toggleModal}
                                        className="ml-auto text-white bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add Deposit
                                    </button>
                                </div>
                                {isModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                                        <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                                            <div className="flex items-center justify-between  md:p-5 border-b rounded-t dark:border-gray-600">
                                                <h3>
                                                    <span className='text-dark'> Deposit Form</span>
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={toggleModal}
                                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span className="sr-only">Close modal</span>
                                                </button>
                                            </div>
                                            <div className="p-4 md:p-5">
                                                <form className="space-y-4" onSubmit={handleDepositSubmit}>
                                                    <img src='qr.jpg' alt="QR code" />
                                                    <div>
                                                        <input type="text" name="transaction_id" id="transaction_id" value={transactionId} onChange={handleTransactionIdChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Transaction ID" required />
                                                    </div>
                                                    <div>
                                                        <input type="number" name="amount" id="amount" value={amount} onChange={handleAmountChange} placeholder="Amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                                    </div>
                                                    {error && <div className="text-red-600">{error}</div>}
                                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='table-responsive'>
                                <table className='table table-bordered mt-4'>
                                    <thead>
                                        <tr>
                                            <th>Transaction ID</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposits.map((deposit, index) => (
                                            <tr key={index}>
                                                <td>{deposit.transation_id}</td>
                                                <td>${deposit.amount}</td>
                                                <td>{deposit.status === 0 ? 'Pending' : 'Completed'}</td>
                                                <td>{new Date(deposit.date).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Settingdash2;