import React, { useEffect, useState } from 'react';
import Dashnavbar from './dashnavbar';
import Dashboardmenu from './dashboardmenu';
import Addkyc from './addkyc';
import styles from './dash.css';

const UserBet = () => {
    const [kycData, setKycData] = useState([]);

    const fetchKycData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://moneychess.in/api/withdrawn', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            if (response.ok) {
                setKycData(result.data);
            } else {
                console.error('Error fetching KYC data:', result);
            }
        } catch (error) {
            console.error('Error fetching KYC data:', error);
        }
    };

    useEffect(() => {
        fetchKycData();
    }, []);

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-2'> <Dashboardmenu /></div>
                    <div className='col-sm-10'>
                        <Dashnavbar />
                        <div className="row" style={{ background: '#f0f0ff' }}>
                            <div className='col-sm-3'></div>
                            <Addkyc onKycSubmitted={fetchKycData} />
                            <div>
                                <h2>Bet Data</h2>
                                {kycData.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Date</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kycData.map((kyc) => (
                                                <tr key={kyc.id}>
                                                    <td>{kyc.name}</td>
                                                    <td>{kyc.email}</td>
                                                    <td>{kyc.amount}</td>
                                                    <td>{kyc.status}</td>
                                                    <td>{kyc.date}</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No KYC data available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBet;
