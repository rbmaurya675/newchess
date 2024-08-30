// import React from 'react'
// import Dashboardmenu from './dashboardmenu'
// import Dashnavbar from './dashnavbar'

// const Withdrowal = () => {
//     return (
//         <div>
//             <div className='container-fluid'>
//                 <div className='row'>

//                     <div className='col-sm-2'> <Dashboardmenu /></div>
//                     <div className='col-sm-10'>

//                         <Dashnavbar />
   

//                         <div className='row ' style={{ background: '#f0f0ff', minHeight: '637px' }}>
//                             <div className='col-sm-3'></div>
//                             <div className='col-sm-8 ' >
//                             </div>
//                         </div>




//                     </div>
//                 </div>
//             </div>


//         </div >
//     )
// }

// export default Withdrowal

import React, { useState, useEffect } from 'react';
import Dashboardmenu from './dashboardmenu';
import Dashnavbar from './dashnavbar';

const Withdrowal = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWithdrawals();
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
            const response = await fetch('http://localhost:7000/api/user-withdrawn', requestOptions);
            const data = await response.json();

            if (response.ok) {
                setWithdrawals(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching withdrawals:', error);
            setError('An error occurred while fetching withdrawals.');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'><Dashboardmenu /></div>
                <div className='col-sm-10'>
                    <Dashnavbar />
                    <div className='row' style={{ background: '#f0f0ff', minHeight: '637px' }}>
                        {/* <div className='col-sm-3'></div> */}
                        <div className='col-sm-12'>
                            <h3>Withdrawal History</h3>
                            {withdrawals.length === 0 ? (
                                <p>No withdrawals to display</p>
                            ) : (
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdrawals.map(withdrawal => (
                                            <tr key={withdrawal.id}>
                                            
                                                <td>${withdrawal.amount}</td>
                                                <td>{withdrawal.status === 0 ? 'Pending' : 'Completed'}</td>
                                                <td>{new Date(withdrawal.date).toLocaleString()}</td>
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
