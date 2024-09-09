import React, { useState, useEffect } from 'react';
import Adminmenu from './adminmenu';
import Adminnavigate from './adminnavigate';
import { Button } from 'react-bootstrap';
import { Flex } from 'antd';

const Adminallwithdrow = () => {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            try {
                const response = await fetch('https://moneychess.in/api/display-admin-withdrawal', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the headers
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setWithdrawals(data.data);
                } else {
                    console.error('Error fetching withdrawals:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching withdrawals:', error);
            }
        };

        fetchWithdrawals();
    }, []);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Adminmenu />
                </div>
                <div className='col-sm-10'>
                    <Adminnavigate />
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 ml-0">
                        <div className='container-fluid mt-2'>
                            <div className='row'>
                                <div className='col-sm-11 ml-2'><h5> All Withdrawal</h5></div>
                                {/* <div className='col-sm-1'><img src='cros.png ' style={{ height: '12px' }} alt="Close" /></div> */}
                            </div>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" title='g'>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">User id</th>
                                    <th scope="col" className="px-6 py-3">Account number</th>
                                    <th scope="col" className="px-6 py-3">Ifsc code</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{withdrawal.user_id}</td>
                                        <td className="px-6 py-4">{withdrawal.account_number}</td>
                                        <td className="px-6 py-4">{withdrawal.ifsc_code}</td>
                                        <td className="px-6 py-4">{withdrawal.amount}</td>
                                        <td className="px-6 py-4">{new Date(withdrawal.withdrawal_date).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminallwithdrow;
