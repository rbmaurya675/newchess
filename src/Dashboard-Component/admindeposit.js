import React, { useState, useEffect } from 'react';
import Adminmenu from './adminmenu';
import Adminnavigate from './adminnavigate';
import { Button } from 'react-bootstrap';
import Search from 'antd/es/transfer/search';

const Admindeposit = () => {
    const [deposits, setDeposits] = useState([]);

    useEffect(() => {
        const fetchDeposits = async () => {
            const token = localStorage.getItem('token'); // Get the token from localStorage

            try {
                const response = await fetch('http://localhost:7000/api/deposits', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Include the token in the headers
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setDeposits(data.data);
                } else {
                    console.error('Error fetching deposits:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching deposits:', error);
            }
        };

        fetchDeposits();
    }, []);

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        try {
            const response = await fetch('http://localhost:7000/api/approve-deposit-request', {
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
                    setDeposits(deposits.map(deposit => 
                        deposit.id === id ? { ...deposit, status: 1 } : deposit
                    ));
                } else {
                    console.error('Error approving deposit:', data.message);
                }
            } else {
                console.error('Error approving deposit:', response.statusText);
            }
        } catch (error) {
            console.error('Error approving deposit:', error);
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
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='row'>
                                    <div className='col-sm-11'><h5>List Of Members</h5></div>
                                </div>
                                <h5 className='text-center mt-1'> <Search placeholder="input search text" style={{ width: 200 }} /></h5>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" title='g'>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Transaction ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        User ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {deposits.map((deposit) => (
                                    <tr key={deposit.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {deposit.transation_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {deposit.amount}
                                        </td>
                                        <td className="px-6 py-4">
                                            {deposit.user_id}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(deposit.date).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {deposit.status === 1 ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {deposit.status === 1 ? (
                                                <span className="text-green-600 font-bold">Approved</span>
                                            ) : deposit.status === 0 ? (
                                                <Button variant="success" onClick={() => handleApprove(deposit.id)}>
                                                    Approve
                                                </Button>
                                            ) : (
                                                // Handle other statuses as needed
                                                null
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

export default Admindeposit;
