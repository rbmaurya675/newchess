import React, { useState, useEffect } from 'react';
import DashboardMenu from '../Dashboard-Component/dashboardmenu';
import Dashnavbar from '../Dashboard-Component/dashnavbar';
import axios from 'axios'; // Import Axios for HTTP requests
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named import

const Dasprofile = () => {
    const [userData, setUserData] = useState(null); // State to store user data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the authorization token from localStorage
                if (token) {
                    const decodedToken = jwtDecode(token); // Decode the token to get user data
                    const userId = decodedToken.id; // Assuming the token contains the user ID as 'id'
                    
                    // Make GET request to fetch user data
                    const response = await axios.get(`http://localhost:7000/api/getone/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}` // Include authorization token in headers
                        }
                    });
                    console.log("Response data:", response.data);
                    setUserData(response.data); // Set user data from API response
                } else {
                    // Handle case where token is not found in localStorage
                    console.log('Authorization token not found');
                }
            } catch (error) {
                // Handle error
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Invoke fetchData function on component mount
    }, []);

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm-2'>
                        <DashboardMenu />
                    </div>
                    <div className='col-sm-10'>
                        <Dashnavbar />
                        {userData ? (
                            <div>
                                <h3>User Profile</h3>
                                <table className="table">
                                    
                                    <tbody>
                                        <tr>
                                            <td>ID</td>
                                            <td>{userData.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>{userData.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{userData.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Role</td>
                                            <td>{userData.role}</td>
                                        </tr>
                                        <tr>
                                            <td>Ref ID</td>
                                            <td>{userData.ref_id}</td>
                                        </tr>
                                        <tr>
                                            <td>Remaining Funds</td>
                                            <td>{userData.fond}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dasprofile;