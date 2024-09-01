// import React from 'react'
// import { Layout, Menu, Select } from 'antd';
// import { Link } from 'react-router-dom';


// const Dashboardmenu = () => {
//     return (

//         <div className='row   bg-gray-800 h-screen' style={{ background: '#1f2937', }}>

//             <div className=' col-sm-2 ' >


//                 <div class="flex " style={{ width: '24px' }}>

//                     <div class="hidden md:flex flex-col w-64 h-full " >
//                         <div class="flex  items-center justify-center h-14" >
//                             <span class="text-white font-bold uppercase  ">......Dashboard.......</span>
//                         </div>
//                         <div class="flex h-screen flex-col flex-1 overflow-y-auto "  >
//                             <nav class="flex-1  h-screen ">
//                                 <p class=" flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
//                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
//                                         stroke="currentColor">
//                                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                             d="M4 6h16M4 12h16M4 18h16" />
//                                     </svg>

//                                     {/* AddminDashboard */}
//                                     <Link to='/admindashborad' style={{ textDecoration: 'none', color: 'white' }}>AddminDashboard</Link>

//                                 </p>
//                                 <p class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
//                                     {/* <i class="bi bi-graph-up-arrow text-4xl"></i> */}
//                                     <i class="bi bi-graph-up-arrow mx-2"></i>
//                                     <Link to='/Dashincome' style={{ textDecoration: 'none', color: 'white' }}>Income</Link>
//                                 </p>
//                                 <p class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">

//                                     <i class="bi bi-cash-stack text-xl text-white mx-2"></i>
//                                     <Link to='/Withdrowal' style={{ textDecoration: 'none', color: 'white' }}>Withdrawal</Link>
//                                 </p>
//                                 <p class="flex items-center px-4 py-2  text-gray-100 hover:bg-gray-700">



//                                     <i class="bi bi-person-check text-2xl text-white mx-2"></i>
//                                     <Link to='/Userkyc' style={{ textDecoration: 'none', color: 'white' }}>Userkyc</Link>

//                                     {/* <Link to='/kyc'> USER KYC</Link> */}
//                                 </p>
//                                 <p class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
//                                     <i class="bi bi-arrow-repeat text-2xl text-white mx-2"></i>
//                                     <Link to="/settingdash2" className='text-white' style={{ textDecoration: 'none' }}>Transition</Link>

//                                 </p>
//                                 <p class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
//                                     <i class="bi bi-gear text-white mx-2"></i>
//                                     <Link to="/profildash2" className='text-white' style={{ textDecoration: 'none' }}>Setting</Link>

//                                 </p>

//                                 <a href="#" class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
//                                     <i class="bi bi-box-arrow-right mx-2"></i>

//                                     Logout
//                                 </a>
//                             </nav>
//                         </div>
//                     </div>

//                     {/* 
//                         <div class="flex flex-col flex-1 overflow-y-auto">
//                             <div class="flex items-center justify-between h-16 bg-white border-b border-gray-200">
//                                 <div class="flex items-center px-4">
//                                     <button class="text-gray-500 focus:outline-none focus:text-gray-700">
//                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
//                                             stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                                 d="M4 6h16M4 12h16M4 18h16" />
//                                         </svg>
//                                     </button>
//                                     <input class="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
//                                 </div>
//                                 <div class="flex items-center pr-4">

//                                     <button
//                                         class="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
//                                         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
//                                             stroke="currentColor">
//                                             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                                                 d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             </div>

//                         </div> */}

//                 </div>


//             </div>

//         </div>


//     )
// }

// export default Dashboardmenu
import React, { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
const DashboardMenu = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const handleLogout = async (e) => {
        e.preventDefault();
        console.log("logout ....")
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }

        try {
            const apiRes = await fetch("http://localhost:7000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                }),
            });

            if (apiRes.status === 200) {
                localStorage.removeItem('token');
                navigate('/account/login');
            } else {
                console.error('Error during logout:', await apiRes.json());
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    return (
        <div className='row ' style={{ background: '#1f2937' }}>
            <div className='col-sm-2'>

                <div className="flex">

                    <div className="md:hidden flex items-center justify-between p-4 w-full ">
                        <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} />
                    </div>
                    <div className='col-sm-2 mt-4 p-2 '>  <i class="fas fa-credit-card text-white" style={{ height: '40px' }}></i> </div>
                    <div className='col-sm-3 text-white mt-4'><img src='pasa.png' style={{ height: '40px' }} /></div>

                    <div className="hidden md:flex flex-col w-64 h-full">
                        <div className="flex items-center justify-center h-14">
                            <span className="text-white font-bold uppercase">Dashboard</span>
                        </div>
                        <div className="flex h-screen flex-col flex-1 overflow-y-auto">
                            <nav className="flex-1 h-screen">
                                {/* <p className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <Link to='/admindashborad' style={{ textDecoration: 'none', color: 'white' }}>Admin Dashboard</Link>
                                </p> */}
                                <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-graph-up-arrow mx-2"></i>
                                    <Link to='/Dashincome' style={{ textDecoration: 'none', color: 'white' }}>Income</Link>
                                </p>
                                <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-cash-stack text-xl text-white mx-2"></i>
                                    <Link to='/Withdrowal' style={{ textDecoration: 'none', color: 'white' }}>Withdrawal</Link>
                                </p>
                                <p className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-person-check text-2xl text-white mx-2"></i>
                                    <Link to='/Userkyc' style={{ textDecoration: 'none', color: 'white' }}>User KYC</Link>
                                </p>
                                <p className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-person-check text-2xl text-white mx-2"></i>
                                    <Link to='/UserBet' style={{ textDecoration: 'none', color: 'white' }}>User Bets</Link>
                                </p>
                                <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-arrow-repeat text-2xl text-white mx-2"></i>
                                    <Link to="/settingdash2" className='text-white' style={{ textDecoration: 'none' }}>Deposit</Link>
                                </p>
                                {/* <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-gear text-white mx-2"></i>
                                    <Link to="/profildash2" className='text-white' style={{ textDecoration: 'none' }}>Setting</Link>
                                </p> */}

                                <a href="#" onClick={handleLogout} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                    <i className="bi bi-box-arrow-right mx-2"></i>
                                    Logout
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                title="Dashboard"
                placement="left"
                onClose={onClose}
                visible={visible}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ background: '#1f2937', color: 'white' }}
                drawerStyle={{ background: '#1f2937' }}
            >
                <nav className="flex-1 h-screen">
                    <p className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <Link to='/admindashborad' style={{ textDecoration: 'none', color: 'white' }}>Admin Dashboard</Link>
                    </p>
                    <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-graph-up-arrow mx-2"></i>
                        <Link to='/Dashincome' style={{ textDecoration: 'none', color: 'white' }}>Income</Link>
                    </p>
                    <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-cash-stack text-xl text-white mx-2"></i>
                        <Link to='/Withdrowal' style={{ textDecoration: 'none', color: 'white' }}>Bets</Link>
                    </p>
                    <p className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-person-check text-2xl text-white mx-2"></i>
                        <Link to='/Userkyc' style={{ textDecoration: 'none', color: 'white' }}>User KYC</Link>
                    </p>
                    <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-arrow-repeat text-2xl text-white mx-2"></i>
                        <Link to="/settingdash2" className='text-white' style={{ textDecoration: 'none' }}>Transition</Link>
                    </p>
                    <p className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-gear text-white mx-2"></i>
                        <Link to="/profildash2" className='text-white' style={{ textDecoration: 'none' }}>Setting</Link>
                    </p>
                    <a href="#" className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                        <i className="bi bi-box-arrow-right mx-2"></i>
                        Logout
                    </a>
                </nav>
            </Drawer>
        </div>
    );
};

export default DashboardMenu;
