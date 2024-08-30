

import React, { useState, useEffect } from 'react';
import Dashboardmenu from './dashboardmenu';
import { Card } from 'react-bootstrap';
import Dashnavbar from './dashnavbar';

const Dashboardheader = () => {
    const [userData, setUserData] = useState({
        remaining_fund: 0,
        total_withdrawal_today: 0,
        total_request_fund: 0
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        try {
            const response = await fetch('https:moneychess.in/api/user-transation-details', requestOptions);
            const data = await response.json();

            if (response.ok) {
                setUserData({
                    remaining_fund: data.data.remaning_fond,
                    total_withdrawal_today: data.data.total_Withdrawal_today,
                    total_request_fund: data.data.total_request_fond
                });
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('An error occurred while fetching user data.');
        }
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'><Dashboardmenu /></div>
                <div className='col-sm-10'>
                    <Dashnavbar />
                    <br /><br />

                    <div className='row mt-5'>
                        <h2 style={{ color: 'black' }}>{userData.user_name}</h2>
                        <h2>{userData.email}</h2>
                        <div className='col-sm-4'>
                            <Card className='shadow' style={{ background: '#12bcb8', color: 'white' }}>
                                <div className='p-3'>
                                    <div className='text-center'>
                                        <h4>Wallet Balance</h4>
                                        <h2>{userData.remaining_fund} Rs.</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='col-sm-4'>
                            <Card className='shadow' style={{ background: '#790000', color: 'white' }}>
                                <div className='p-3'>
                                    <div className='text-center'>
                                        <h4>total_request_fond</h4>
                                        <h2>{userData.total_request_fund} Rs.</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className='col-sm-4'>
                            <Card className='shadow' style={{ background: '#6C0CAC', color: 'white' }}>
                                <div className='p-3'>
                                    <div className='text-center'>
                                        <h4>total_Withdrawal_today</h4>
                                        <h2>{userData.total_withdrawal_today} Rs.</h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboardheader;
