import React, { useState, useEffect } from 'react';
import Dashboardmenu from './dashboardmenu';
import Dashnavbar from './dashnavbar';

const Withdrowal = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        fond: '',
        accountNumber: '',
        ifscCode: '',
        withdrawalAmount: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchWithdrawals();
        fetchWithdrawalForm();
    }, []);

    const fetchWithdrawals = async () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await fetch('https://moneychess.in/api/display-user-withdrawal', requestOptions);
            const data = await response.json();

            if (response.ok) {
                setWithdrawals(data.data);  // Update the state with the latest withdrawal data
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
            setError('An error occurred while fetching withdrawals.');
        }
    };

    const fetchWithdrawalForm = async () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        try {
            const response = await fetch('https://moneychess.in/api/withdrawal-form', requestOptions);
            const data = await response.json();

            if (response.ok) {
                const { fond, account_number, ifsc_code } = data.data[0];
                setFormData({
                    ...formData,
                    fond,
                    accountNumber: account_number,
                    ifscCode: ifsc_code
                });
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching withdrawal form:', error);
            setError('An error occurred while fetching the withdrawal form.');
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { withdrawalAmount, password } = formData;

        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: withdrawalAmount,
                password
            })
        };

        try {
            const response = await fetch('https://moneychess.in/api/withdrawal-form-submit', requestOptions);
            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Show a success message
                toggleModal(); // Close the form modal
                fetchWithdrawals(); // Refresh the withdrawal history
            } else {
                setError(data.message); // Handle any errors
            }
        } catch (error) {
            console.error('Error submitting withdrawal:', error);
            setError('An error occurred while submitting the withdrawal.');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'><Dashboardmenu /></div>
                <div className='col-sm-10'>
                    <Dashnavbar />
                    <div className='bg-info p-2 text-white'>
                        <button
                            onClick={toggleModal}
                            className="block ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            Withdrawal
                        </button>

                        {isModalOpen && (
                            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                                <div className="relative w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            <div className='text-dark'>Withdrawal</div>
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={toggleModal}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <div className='col-sm-12 shadow-md p-3 mt-1 mb-5' style={{ background: 'white' }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <h5 className='text-black'>Total Amount: <span>$ {formData.fond}</span></h5>
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="text"
                                                    className={`form-control mt-2 ${errors.withdrawalAmount ? 'is-invalid' : ''}`}
                                                    name="withdrawalAmount"
                                                    placeholder='Withdrawal Amount'
                                                    value={formData.withdrawalAmount}
                                                    onChange={handleChange}
                                                />
                                                {errors.withdrawalAmount && <div className="invalid-feedback">{errors.withdrawalAmount}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <p className='text-black'>Account Number: <span>{formData.accountNumber}</span></p>
                                            </div>
                                            <div className="mb-3">
                                                <p className='text-black'>IFSC code: <span>{formData.ifscCode}</span></p>
                                            </div>
                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className={`form-control mt-2 ${errors.password ? 'is-invalid' : ''}`}
                                                    name="password"
                                                    placeholder='Enter Password'
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <button type="submit" className="btn btn-info">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='row' style={{ background: '#f0f0ff', minHeight: '637px' }}>
                        <div className='col-sm-12'>
                            <h3>Withdrawal History</h3>
                            {withdrawals.length === 0 ? (
                                <p>No withdrawals to display</p>
                            ) : (
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>Amount</th>
                                            <th>account_number</th>
                                            <th>ifsc_code</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawals.map((withdrawal) => (
                                            <tr key={withdrawal.id}>
                                                <td>${withdrawal.amount}</td>
                                                <td>${withdrawal.account_number}</td>
                                                <td>{withdrawal.ifsc_code}</td>
                                                <td>{new Date(withdrawal.withdrawal_date).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            {error && <div className='text-red-600'>{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdrowal;
