import React, { useState, useEffect } from 'react';
import Adminmenu from './adminmenu';
import Adminnavigate from './adminnavigate';
import { Button } from 'react-bootstrap';
import { Flex } from 'antd';

const Adminwithdrow = () => {
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        const fetchWithdrawals = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            try {
                const response = await fetch('http://localhost:7000/api/withdrawn', {
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

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            const response = await fetch('http://localhost:7000/api/approve-fond-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the headers
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.statusCode === "201") {
                    setWithdrawals(withdrawals.map(withdrawal =>
                        withdrawal.id === id ? { ...withdrawal, status: 1 } : withdrawal
                    ));
                } else {
                    console.error('Error approving withdrawal:', data.message);
                }
            } else {
                console.error('Error approving withdrawal:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving withdrawal:', error);
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Adminmenu />
                </div>
                <div className='col-sm-10'>
                    <Adminnavigate />
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                        <div className='container-fluid mt-4'>
                            <div className='row'>
                                <div className='col-sm-11'><h5>Withdrawal Approve</h5></div>
                                <div className='col-sm-1'><img src='cros.png ' style={{ height: '12px' }} alt="Close" /></div>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" title='g'>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">User Name</th>
                                    <th scope="col" className="px-6 py-3">User Email</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Time</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map((withdrawal) => (
                                    <tr key={withdrawal.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{withdrawal.name}</td>
                                        <td className="px-6 py-4">{withdrawal.email}</td>
                                        <td className="px-6 py-4">{withdrawal.amount}</td>
                                        <td className="px-6 py-4">{new Date(withdrawal.date).toLocaleString()}</td>
                                        <td className="px-6 py-4">{withdrawal.status === 1 ? 'Approved' : 'Inactive'}</td>
                                        <td className="px-6 py-4">
                                            {withdrawal.status === 0 ? (
                                                <Button variant="success" onClick={() => handleApprove(withdrawal.id)}>
                                                    Approve
                                                </Button>
                                            ) : (
                                                'Approved'
                                            )}
                                        </td>
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

export default Adminwithdrow;
