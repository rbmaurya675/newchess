import React, { useEffect, useState } from 'react';
import Dashnavbar from './dashnavbar';
import Dashboardmenu from './dashboardmenu';
import Addkyc from './addkyc';
import styles from './dash.css';

const Userkyc = () => {
    const [kycData, setKycData] = useState([]);

    const fetchKycData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:7000/api/user-kyc', {
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
                                <h2>KYC Data</h2>
                                {kycData.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Email</th>
                                                <th>Account Holder Name</th>
                                                <th>Account Number</th>
                                                <th>IFSC Code</th>
                                                <th>Bank Name</th>
                                                <th>Branch</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {kycData.map((kyc) => (
                                                <tr key={kyc.id}>
                                                    <td>{kyc.email_id}</td>
                                                    <td>{kyc.account_holder_name}</td>
                                                    <td>{kyc.account_number}</td>
                                                    <td>{kyc.ifsc_code}</td>
                                                    <td>{kyc.bank_name}</td>
                                                    <td>{kyc.branch}</td>
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

export default Userkyc;
