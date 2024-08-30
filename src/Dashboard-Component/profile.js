import React, { useState, useEffect } from 'react';
import Adminmenu from './adminmenu';
import Dashnavbar from './dashnavbar';
import Adminnavigate from './adminnavigate';
import axios from 'axios'; // Import Axios for HTTP requests
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode

const Profile = () => {
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
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                    <Adminmenu />
                </div>
                <div className='col-sm-10'>
                    <Adminnavigate />
                    <div className="container mt-5">
                        <div className="card bg-dark text-white">
                            
                                        
                                        {userData ? (
                                            <div>
                                                <p><strong>Name:</strong> {userData.name}</p>
                                                <p><strong>Email:</strong> {userData.email}</p>
                                                <p><strong>Role:</strong> {userData.role}</p>
                                                <p><strong>Ref ID:</strong> {userData.ref_id}</p>
                                                <p><strong>Remaining Funds:</strong> {userData.fond}</p>
                                            </div>
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    
                                    
                                
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
